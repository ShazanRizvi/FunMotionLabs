import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { initDatabase, disconnectDatabase } from './lib/db-init.js';
import prisma from './lib/prisma.js';
import blogRoutes from './routes/blogRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';

// Load environment variables from root .env file
dotenv.config({ path: '../../.env' });

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || process.env.VITE_API_CLIENT_URL || 'http://localhost:5173';

const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl/postman) and configured frontend origins.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

app.use((err, req, res, next) => {
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({
      message: 'Request body too large. Use multipart/form-data for media uploads.'
    });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        message: 'File too large. Max allowed size is 100MB per file.'
      });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }

  return next(err);
});

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
