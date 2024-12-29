const Redis = require('ioredis');
const config = require('../config');

class CacheManager {
  constructor() {
    this.redisClient = null;
    this.isRedisAvailable = false;
    this.init();
  }

  async init() {
    if (process.env.SKIP_REDIS === 'true') {
      console.log('Redis is disabled. Running in memory-only mode.');
      return;
    }

    try {
      this.redisClient = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD,
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        }
      });

      this.redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
        this.isRedisAvailable = false;
      });

      this.redisClient.on('connect', () => {
        console.log('Connected to Redis');
        this.isRedisAvailable = true;
      });
    } catch (err) {
      console.error('Failed to initialize Redis:', err);
      this.isRedisAvailable = false;
    }
  }

  // In-memory cache fallback
  memoryCache = new Map();
  memoryCacheTTL = new Map();

  async get(key) {
    if (this.isRedisAvailable) {
      return await this.redisClient.get(key);
    }
    
    // Memory cache fallback
    if (this.memoryCacheTTL.has(key)) {
      if (Date.now() > this.memoryCacheTTL.get(key)) {
        this.memoryCache.delete(key);
        this.memoryCacheTTL.delete(key);
        return null;
      }
      return this.memoryCache.get(key);
    }
    return null;
  }

  async set(key, value, ttl) {
    if (this.isRedisAvailable) {
      await this.redisClient.setex(key, ttl, value);
    } else {
      // Memory cache fallback
      this.memoryCache.set(key, value);
      this.memoryCacheTTL.set(key, Date.now() + (ttl * 1000));
    }
  }

  async del(key) {
    if (this.isRedisAvailable) {
      await this.redisClient.del(key);
    } else {
      this.memoryCache.delete(key);
      this.memoryCacheTTL.delete(key);
    }
  }
}

const cacheManager = new CacheManager();

// Cache middleware
const cache = (duration) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl || req.url}`;

    try {
      const cachedResponse = await cacheManager.get(key);

      if (cachedResponse) {
        return res.json(JSON.parse(cachedResponse));
      }

      // Modify res.json to cache the response
      const originalJson = res.json;
      res.json = function(data) {
        cacheManager.set(key, JSON.stringify(data), duration);
        return originalJson.call(this, data);
      };

      next();
    } catch (err) {
      console.error('Cache Error:', err);
      next();
    }
  };
};

// Rate limiting with fallback
const createRateLimiter = (options) => {
  const { windowMs, max, keyPrefix } = options;
  const limits = new Map();

  return async (req, res, next) => {
    const key = `${keyPrefix}:${req.ip}`;
    
    try {
      let requests;
      
      if (cacheManager.isRedisAvailable) {
        requests = await cacheManager.redisClient.incr(key);
        if (requests === 1) {
          await cacheManager.redisClient.expire(key, windowMs / 1000);
        }
      } else {
        const now = Date.now();
        const windowStart = now - windowMs;
        
        // Clean up old entries
        for (const [ip, data] of limits) {
          if (data.timestamp < windowStart) {
            limits.delete(ip);
          }
        }
        
        const current = limits.get(key) || { count: 0, timestamp: now };
        if (current.timestamp < windowStart) {
          current.count = 0;
          current.timestamp = now;
        }
        current.count++;
        limits.set(key, current);
        requests = current.count;
      }

      if (requests > max) {
        return res.status(429).json({
          error: 'Too many requests, please try again later.'
        });
      }

      next();
    } catch (err) {
      console.error('Rate Limit Error:', err);
      next();
    }
  };
};

// Clear cache by pattern
const clearCache = async (pattern) => {
  const keys = await cacheManager.redisClient.keys(pattern);
  if (keys.length > 0) {
    await cacheManager.redisClient.del(keys);
  }
};

// Cache with tags for better cache management
const cacheWithTags = (duration, tags = []) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl || req.url}`;

    try {
      const cachedResponse = await cacheManager.get(key);

      if (cachedResponse) {
        return res.json(JSON.parse(cachedResponse));
      }

      res.json = async function(data) {
        const multi = cacheManager.redisClient.multi();
        multi.setex(key, duration, JSON.stringify(data));
        
        // Store cache key with tags
        for (const tag of tags) {
          multi.sadd(`tag:${tag}`, key);
        }
        
        await multi.exec();
        return res.send(data);
      };

      next();
    } catch (err) {
      console.error('Cache Error:', err);
      next();
    }
  };
};

// Clear cache by tags
const clearCacheByTags = async (tags) => {
  try {
    const multi = cacheManager.redisClient.multi();
    
    for (const tag of tags) {
      const cacheKeys = await cacheManager.redisClient.smembers(`tag:${tag}`);
      if (cacheKeys.length > 0) {
        multi.del(...cacheKeys);
        multi.del(`tag:${tag}`);
      }
    }
    
    await multi.exec();
  } catch (err) {
    console.error('Error clearing cache by tags:', err);
  }
};

// Session store
const sessionStore = {
  async get(sessionId) {
    const data = await cacheManager.get(`sess:${sessionId}`);
    return JSON.parse(data);
  },

  async set(sessionId, session, ttl) {
    await cacheManager.set(`sess:${sessionId}`, JSON.stringify(session), ttl);
  },

  async destroy(sessionId) {
    await cacheManager.del(`sess:${sessionId}`);
  }
};

module.exports = {
  cacheManager,
  cache,
  clearCache,
  cacheWithTags,
  clearCacheByTags,
  createRateLimiter,
  sessionStore
};
