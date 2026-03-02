#!/usr/bin/env bash
set -euo pipefail

# Load local .env if present (allows reusing existing DB credentials).
ENV_FILE="${ENV_FILE:-.env}"
if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
fi

# ---------- REQUIRED ----------
PROJECT_ID="funmotionlabs"
REGION="us-central1"
REPO_OWNER="ShazanRizvi"
REPO_NAME="FunMotionLabs"
RUN_SA_NAME="funmotionlabs-run"
AR_REPO="funmotionlabs"
SQL_INSTANCE="funmotionlabs-pg"
DB_URL_SECRET="funmotionlabs-database-url"

# Pull DB settings from .env first, then fallback defaults.
DB_NAME="${DB_NAME:-${POSTGRES_DB:-funmotionlabs}}"
DB_USER="${DB_USER:-${POSTGRES_USER:-postgres}}"
DB_PASS="${DB_PASS:-${POSTGRES_PASSWORD:-}}"
if [ -z "$DB_PASS" ]; then
  echo "DB_PASS is empty. Set POSTGRES_PASSWORD (or DB_PASS) in $ENV_FILE." >&2
  exit 1
fi

gcloud config set project "$PROJECT_ID"
PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
if [ -z "$PROJECT_NUMBER" ]; then
  echo "Failed to resolve PROJECT_NUMBER for project: $PROJECT_ID" >&2
  exit 1
fi

# APIs
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com

# Artifact Registry
gcloud artifacts repositories create "$AR_REPO" \
  --repository-format=docker \
  --location="$REGION" \
  --description="FunMotionLabs images" || true

# Runtime service account
gcloud iam service-accounts create "$RUN_SA_NAME" \
  --display-name="FunMotionLabs Cloud Run runtime" || true
RUN_SA="${RUN_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

# Cloud SQL (free-tier friendly shared core)
gcloud sql instances create "$SQL_INSTANCE" \
  --database-version=POSTGRES_16 \
  --tier=db-f1-micro \
  --region="$REGION" \
  --storage-type=HDD \
  --storage-size=10 \
  --availability-type=ZONAL \
  --backup-start-time=03:00 || true

gcloud sql databases create "$DB_NAME" --instance="$SQL_INSTANCE" || true
gcloud sql users create "$DB_USER" --instance="$SQL_INSTANCE" --password="$DB_PASS" || true

# IAM for runtime SA (Cloud SQL access + requested editor role)
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${RUN_SA}" \
  --role="roles/cloudsql.client"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${RUN_SA}" \
  --role="roles/cloudsql.editor"

# IAM for Cloud Build deploy permissions
CLOUDBUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/run.admin"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/iam.serviceAccountUser"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/artifactregistry.writer"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/secretmanager.secretAccessor"

# Secret Manager: Unix socket DATABASE_URL for Cloud Run
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@/${DB_NAME}?host=/cloudsql/${PROJECT_ID}:${REGION}:${SQL_INSTANCE}"
if ! gcloud secrets describe "$DB_URL_SECRET" >/dev/null 2>&1; then
  printf '%s' "$DATABASE_URL" | gcloud secrets create "$DB_URL_SECRET" --data-file=-
fi
printf '%s' "$DATABASE_URL" | gcloud secrets versions add "$DB_URL_SECRET" --data-file=-

# GitHub trigger (all branches) -> cloudbuild.yaml
TRIGGER_NAME="funmotionlabs-all-branches"
if gcloud beta builds triggers list --format='value(name)' | grep -qx "$TRIGGER_NAME"; then
  echo "Cloud Build trigger '$TRIGGER_NAME' already exists. Skipping trigger create."
else
  gcloud beta builds triggers create github \
    --name="$TRIGGER_NAME" \
    --repo-owner="$REPO_OWNER" \
    --repo-name="$REPO_NAME" \
    --branch-pattern=".*" \
    --build-config="cloudbuild.yaml" \
    --substitutions="_REGION=${REGION},_AR_REPO=${AR_REPO},_IMAGE_NAME=funmotionlabs,_PROD_SERVICE=funmotionlabs,_SERVICE_PREFIX=funmotion,_CLOUDSQL_INSTANCE=${PROJECT_ID}:${REGION}:${SQL_INSTANCE},_RUN_SA=${RUN_SA},_DATABASE_URL_SECRET=${DB_URL_SECRET}"
fi

echo "Setup complete."
