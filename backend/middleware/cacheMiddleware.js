const redisClient = require("../config/redis");

const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl;

    if (!redisClient.isOpen) {
        console.error("⚠️ Redis client is not connected.");
        return next(); 
    }

    try {
        const data = await redisClient.get(key);
        if (data) {
            return res.json(JSON.parse(data)); 
        }
        next();
    } catch (err) {
        console.error("❌ Redis error:", err);
        next();
    }
};

const cacheResponse = async (key, data, expiry = 3600) => {
    if (!redisClient.isOpen) return; 
    await redisClient.setEx(key, expiry, JSON.stringify(data));
};

module.exports = { cacheMiddleware, cacheResponse };
