# FunMotionLabs

A monorepo project using Lerna for package management with React frontend and Express backend, fully dockerized for development.

## Project Structure

```
FunMotionLabs/
├── packages/
│   ├── Frontend/     # React + Vite frontend
│   └── server/       # Express backend
│       ├── prisma/   # Prisma schema and migrations
│       └── src/
├── docker-compose.yml
├── .env.example      # Environment variables template
├── lerna.json
└── package.json
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker and Docker Compose

## Setup

### Option 1: Docker (Development)

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Build and start all services**
   ```bash
   npm run docker:dev
   ```

3. **Access the applications**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - PostgreSQL: localhost:5432

4. **Stop services**
   ```bash
   npm run docker:down
   ```

Notes:
- In dev, the backend entrypoint installs dependencies into the mounted `node_modules` if needed and runs Prisma migrations automatically.
- If you change the Prisma schema, re-run the dev stack to apply migrations.

### Option 2: Local Development (Without Docker)

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Update `.env` file with your local database configuration:
   - For local PostgreSQL: `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/funmotionlabs`

2. **Install Lerna globally (optional):**
   ```bash
   npm install -g lerna
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # optional: npm run install:all   # installs inside each package
   ```

4. **Set up database:**
   ```bash
   # IMPORTANT: Update .env file - change DATABASE_URL host from 'postgres' to 'localhost'
   # DATABASE_URL=postgresql://postgres:postgres@localhost:5432/funmotionlabs
   
   # Make sure PostgreSQL is running locally
   cd packages/server
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Run all services in development mode:**
   ```bash
   npm run dev
   ```

   Or run individually:
   ```bash
   # Frontend
   cd packages/Frontend
   npm run dev

   # Backend
   cd packages/server
   npm run dev
   ```

## Available Scripts

### Root Level (Lerna Commands)

- `npm install` - Install dependencies and link workspaces
- `npm run install:all` - Install deps inside each package (optional)
- `npm run dev` - Run all packages in development mode (parallel)
- `npm run build` - Build all packages
- `npm run clean` - Clean all node_modules
- `npm run docker:build` - Build Docker images
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers
- `npm run docker:dev` - Build and start Docker containers

## Docker Configuration

The project uses Docker Compose to orchestrate all services:

- **Frontend**: React app running on port 5173 with hot-reload
- **Backend**: Express server running on port 3001
- **PostgreSQL**: Database running on port 5432
- **Networking**: All services are on the same Docker network for communication

### Volume Mounts

Both services use volume mounts for:
- Source code (for hot-reload)
- Excluded node_modules (using anonymous volumes for performance)
- PostgreSQL data is persisted in a Docker volume

### Environment Variables

The project uses a shared `.env` file at the root level that both frontend and backend can access:
- Create `.env` from `.env.example`
- All environment variables are loaded from the root `.env` file
- Frontend can access variables prefixed with `VITE_`
- Backend has access to all variables including `DATABASE_URL`

## Database Management (Prisma)

### Prisma Commands

```bash
# Generate Prisma Client
cd packages/server
npm run prisma:generate

# Create and run migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Deploy migrations (production)
npm run prisma:deploy
```

### Database Schema

The Prisma schema is located at `packages/server/prisma/schema.prisma`. After modifying the schema:

1. Create a migration: `npm run prisma:migrate` (or `npx prisma migrate dev --name your_migration_name`)
2. The migration will be applied automatically in development
3. In production, migrations run automatically on container startup

### Accessing Database

**IMPORTANT: DATABASE_URL Configuration**

The `DATABASE_URL` in your `.env` file must match your environment:

- **For Docker**: `DATABASE_URL=postgresql://postgres:postgres@postgres:5432/funmotionlabs`
  - Uses `postgres` as hostname (Docker service name)
  - Works when running `docker-compose up`
  
- **For Local Development**: `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/funmotionlabs`
  - Uses `localhost` as hostname
  - Works when running Prisma commands outside Docker
  - **Change `postgres` to `localhost` in your `.env` file when running migrations locally**

**Connection string format**: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot-reload when running in Docker
2. **Environment Variables**: Use the root `.env` file - both services read from it
3. **API Communication**: Frontend can communicate with backend via `http://localhost:3001` or `http://backend:3001` (from within Docker network)
4. **Database Access**: Use Prisma Studio for a visual database interface: `npm run prisma:studio` in the server package

## Package Management with Lerna

Lerna is configured to:
- Use npm workspaces
- Run commands in parallel across packages
- Manage independent versioning

## Production Build (Docker)

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Build and run**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

3. **Access the applications**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3001

4. **Stop services**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

Notes:
- Production runs Prisma migrations on container startup via `prisma migrate deploy`.
- The frontend image is built with `VITE_API_URL` from `.env` (or defaults to `http://localhost:3001`).

## Troubleshooting

- **Port conflicts**: Make sure ports 5173, 3001, and 5432 are not in use
- **Docker issues**: Try `docker-compose down -v` to remove volumes and restart
- **Node modules**: If dependencies are out of sync, run `npm run clean && npm run bootstrap`
- **Hot reload not working**: Ensure volume mounts are correct and file watching is enabled
- **Database connection errors**: 
  - Check that PostgreSQL container is running: `docker-compose ps`
  - Verify DATABASE_URL in `.env` file matches your environment:
    - Docker: use `postgres` as hostname
    - Local: use `localhost` as hostname
  - Ensure database is healthy: `docker-compose exec postgres pg_isready -U postgres`
  - **"Can't reach database server at postgres:5432"**: This means you're running Prisma locally but `.env` has Docker hostname. Change `postgres` to `localhost` in `DATABASE_URL`
- **Prisma migration issues**: 
  - Reset database: `docker-compose exec backend npx prisma migrate reset`
  - Regenerate client: `docker-compose exec backend npx prisma generate`
