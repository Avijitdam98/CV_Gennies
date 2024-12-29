const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { redis } = require('./cache');

// Enhanced rate limiter with Redis
const createRateLimiter = (options) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100,
    message = 'Too many requests from this IP, please try again later',
    keyPrefix = 'rl'
  } = options;

  return async (req, res, next) => {
    const key = `${keyPrefix}:${req.ip}`;
    
    try {
      const [requests, ttl] = await Promise.all([
        redis.incr(key),
        redis.ttl(key)
      ]);

      if (requests === 1) {
        await redis.expire(key, windowMs / 1000);
      }

      // Add headers
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, max - requests));
      res.setHeader('X-RateLimit-Reset', Date.now() + (ttl * 1000));

      if (requests > max) {
        return res.status(429).json({
          error: message,
          retryAfter: ttl
        });
      }

      next();
    } catch (err) {
      console.error('Rate Limit Error:', err);
      next();
    }
  };
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
  // HSTS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self' wss: https:;"
  );
  
  // Other security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  next();
};

// Request sanitizer
const sanitizeRequest = (req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove potential XSS
        obj[key] = obj[key]
          .replace(/[<>]/g, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+=/gi, '');
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};

// API key validation
const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  try {
    const isValid = await redis.sismember('valid_api_keys', apiKey);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    next();
  } catch (err) {
    console.error('API Key Validation Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Request encryption/decryption
const encryption = {
  encrypt: (text, key = process.env.ENCRYPTION_KEY) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      iv: iv.toString('hex'),
      content: encrypted,
      tag: authTag.toString('hex')
    };
  },

  decrypt: (encrypted, key = process.env.ENCRYPTION_KEY) => {
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(key),
      Buffer.from(encrypted.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'));
    
    let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
};

// Token management
const tokenManager = {
  generateToken: async (userId, type = 'access') => {
    const token = crypto.randomBytes(32).toString('hex');
    const key = `token:${type}:${userId}`;
    
    await redis.setex(key, 
      type === 'access' ? 3600 : 7 * 24 * 3600,
      token
    );
    
    return token;
  },

  validateToken: async (token, userId, type = 'access') => {
    const key = `token:${type}:${userId}`;
    const storedToken = await redis.get(key);
    return token === storedToken;
  },

  revokeToken: async (userId, type = 'access') => {
    const key = `token:${type}:${userId}`;
    await redis.del(key);
  }
};

// Session management
const sessionManager = {
  create: async (userId, data) => {
    const sessionId = crypto.randomBytes(32).toString('hex');
    await redis.setex(
      `session:${sessionId}`,
      24 * 3600,
      JSON.stringify({ userId, ...data })
    );
    return sessionId;
  },

  get: async (sessionId) => {
    const session = await redis.get(`session:${sessionId}`);
    return session ? JSON.parse(session) : null;
  },

  update: async (sessionId, data) => {
    const session = await sessionManager.get(sessionId);
    if (session) {
      await redis.setex(
        `session:${sessionId}`,
        24 * 3600,
        JSON.stringify({ ...session, ...data })
      );
    }
  },

  destroy: async (sessionId) => {
    await redis.del(`session:${sessionId}`);
  }
};

module.exports = {
  createRateLimiter,
  securityHeaders,
  sanitizeRequest,
  validateApiKey,
  encryption,
  tokenManager,
  sessionManager
};
