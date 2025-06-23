import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import your routes
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// ✅ Dynamic CORS for Vercel preview deployments
const allowedOrigins = [
  'https://tagad-platforms-website.vercel.app', // Production
  /^https:\/\/tagad-platforms-website-w9tx-[a-z0-9]+(-br-tagads-projects)?\.vercel\.app$/, // Preview pattern
  'http://localhost:5173' // Local
];

// ✅ CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow server-to-server
    if (allowedOrigins.some(allowed => 
      typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
    )) {
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

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(error => console.error('❌ MongoDB error:', error));

// ✅ Routes
app.use('/api/contact', contactRoutes);

// ✅ Health Endpoints
app.get('/', (req, res) => res.json({ 
  message: 'API running!',
  status: 'healthy',
  timestamp: new Date().toISOString()
}));

app.get('/api/health', (req, res) => res.json({ 
  status: 'healthy',
  database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
}));

// ✅ Error Handler
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS violation',
      allowedOrigins: allowedOrigins.map(o => o.toString()),
      yourOrigin: req.headers.origin || 'none'
    });
  }
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// ✅ 404 Handler (Express 5 compatible)
app.all(/.*/, (req, res) => res.status(404).json({ 
  message: 'Endpoint not found',
  availableEndpoints: [
    'POST /api/contact/submit',
    'GET /api/health'
  ]
}));

// ✅ Local Dev
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
  });
}

export default app;
