#!/bin/sh
set -e

echo "🔄 Running database migrations..."

if [ "$NODE_ENV" = "production" ]; then
  npx prisma migrate deploy
else
  # In dev, node_modules is mounted as a volume and may be empty
  if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
    echo "📦 Installing dependencies into mounted node_modules..."
    npm install
  fi
  npx prisma migrate dev --name init --skip-seed
fi

echo "✅ Database migrations completed"

# Execute the main command
exec "$@"
