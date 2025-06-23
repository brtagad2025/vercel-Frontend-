import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import your routes
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// ✅ Allowed Frontend Origins
const allowedOrigins = [
  'https://tagad-platforms-website.vercel.app',
  'https://tagad-platforms-website-w9tx.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

// ✅ CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // Allow server-to-server or tools like Postman
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// ✅ Apply CORS and JSON middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// ✅ Routes
app.use('/api/contact', contactRoutes);

// ✅ Health & Utility Endpoints
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

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS policy violation',
      allowedOrigins,
      yourOrigin: req.headers.origin || 'none'
    });
  }
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ✅ 404 Catch-All
app.all('/*', (req, res) => {
  res.status(404).json({ 
    message: 'API endpoint not found',
    requestedPath: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /api',
      'GET /api/health',
      'POST /api/contact/submit',
      'GET /api/contact'
    ]
  });
});

// ✅ Local Dev Listener
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Allowed CORS origins:\n${allowedOrigins.join('\n')}`);
  });
}

// ✅ Export for Vercel (Serverless)
export default app;
