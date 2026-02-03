import prisma from './prisma.js';

/**
 * Initialize database connection and run migrations
 * This can be called on server startup
 */
export async function initDatabase() {
  try {
    // Test connection with a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected successfully');
    
    // You can add additional initialization logic here
    // For example, seeding data, creating default records, etc.
    
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    // Don't throw in development - allow server to start even if DB is not ready
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
    return false;
  }
}

/**
 * Gracefully disconnect from database
 */
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
  }
}
