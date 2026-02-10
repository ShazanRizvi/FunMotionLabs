import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase, disconnectDatabase } from './lib/db-init.js';
import prisma from './lib/prisma.js';
import blogRoutes from './routes/blogRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';

// Load environment variables from root .env file
dotenv.config({ path: '../../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'ok', 
      message: 'Server is running',
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Server is running but database connection failed',
      error: error.message
    });
  }
});

app.use('/api', blogRoutes);
app.use('/api', gamesRoutes);

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Initialize database
  await initDatabase();
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await disconnectDatabase();
  process.exit(0);
});
