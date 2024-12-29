const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression');
const { errorHandler } = require('./middleware/errorMiddleware');
const SocketManager = require('./utils/socket');
const { 
  cache, 
  createRateLimiter, 
  cacheManager 
} = require('./utils/cache');
const {
  securityHeaders,
  sanitizeRequest,
  validateApiKey,
  sessionManager
} = require('./utils/security');

// Route imports
const userRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const shareRoutes = require('./routes/shareRoutes');
const templateRoutes = require('./routes/templateRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const paymentRoutes = require('./routes/payments');
const authRoutes = require('./routes/auth');

// Load env vars
dotenv.config();

// Initialize express app and create HTTP server
const app = express();
const server = http.createServer(app);

// Socket.io setup with additional security
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling']
});

// Initialize Socket Manager
const socketManager = new SocketManager(io);
socketManager.initialize();

// Security Middleware
app.use(helmet());
app.use(securityHeaders);
app.use(sanitizeRequest);
app.use(compression());

// CORS setup with specific options
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost origins in development
    if (process.env.NODE_ENV === 'development' && (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:'))) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Body parser middleware with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiting setup
const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyPrefix: 'api'
});

const authLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyPrefix: 'auth'
});

// Apply rate limiting
app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);

// Cache middleware for specific routes
app.use('/api/templates', cache(300)); // Cache templates for 5 minutes
app.use('/api/analytics', cache(60)); // Cache analytics for 1 minute

// Session handling
app.use(async (req, res, next) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId) {
    req.session = await sessionManager.get(sessionId);
  }
  next();
});

// Database connection with retry logic
const connectWithRetry = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

// Start server with enhanced error handling
const startServer = () => {
  try {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

// Initialize database connection
connectWithRetry();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

// Apply security middleware
app.use(securityHeaders);
app.use(sanitizeRequest);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/share', shareRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  
  process.exit(1);
});

// Graceful shutdown with cleanup
process.on('SIGTERM', async () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  try {
    // Close all connections
    await Promise.all([
      mongoose.connection.close(),
      cacheManager.redisClient?.quit()
    ]);
    console.log('Database connections closed.');
    
    // Close server
    server.close(() => {
      console.log('Process terminated!');
      process.exit(0);
    });
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

module.exports = app;
