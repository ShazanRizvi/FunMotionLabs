#!/bin/sh
set -e

cd /app/packages/server

echo "Running Prisma migrations..."
npx prisma migrate deploy --schema=prisma/schema.prisma

echo "Generating Prisma client..."
npx prisma generate --schema=prisma/schema.prisma

echo "Starting API server..."
exec npm start
