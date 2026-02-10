# Development Dockerfile for Express Backend
FROM node:20

WORKDIR /app

# Install Prisma CLI globally (optional, but helpful)
RUN npm install -g prisma

# Copy package files
COPY package*.json ./

# Install dependencies
# Use npm install instead of npm ci since we're in a workspace setup
# and the lock file might be at the root level
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy entrypoint script
COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy source code
COPY . .

# Expose server port
EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]

# Start development server
CMD ["npm", "run", "dev"]
