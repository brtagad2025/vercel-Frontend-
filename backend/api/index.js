// api/index.js

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import serverless from 'serverless-http';

// Routes
import contactRoutes from '../routes/contactRoutes.js';

const app = express();

// --- CORS Configuration ---
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      process.env.FRONTEND_URL,
      'https://tagad-platforms-website-w9tx.vercel.app'
    ]
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ Blocked by CORS: ${origin}`);
      callback(new Error(`CORS policy: Origin ${origin} not allowed.`));
    }
  },
  credentials: true
}));

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- MongoDB Connection ---
let isConnected = false;

const connectMongo = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      isConnected = true;
      console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
    }
  }
};

app.use(async (req, res, next) => {
  await connectMongo();
  next();
});

// --- Routes ---
app.use('/api/contact', contactRoutes);

// --- Health & Info Endpoints ---
app.get('/', (req, res) => {
  res.json({
    message: 'Tagad Platforms Backend API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Tagad Platforms API v1.0',
    endpoints: ['/api/contact/submit', '/api/contact'],
    status: 'operational'
  });
});

app.get('/api/health', async (req, res) => {
  res.json({
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack || err.message);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// --- 404 Handler ---
app.all('*', (req, res) => {
  res.status(404).json({
    message: 'API endpoint not found',
    availableEndpoints: [
      '/api/contact/submit',
      '/api/contact',
      '/api/health'
    ]
  });
});

// --- Export for Vercel Serverless ---
export const handler = serverless(app);
