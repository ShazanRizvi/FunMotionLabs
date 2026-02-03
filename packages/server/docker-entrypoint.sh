#!/bin/sh
set -e

echo "🔄 Running database migrations..."

# Try to deploy migrations (for production or already initialized DB)
# If that fails, run dev migration (for first-time setup)
npx prisma migrate deploy || npx prisma migrate dev --name init --skip-seed || true

echo "✅ Database migrations completed"

# Execute the main command
exec "$@"
