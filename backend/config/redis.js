const redis = require("redis");

const client = redis.createClient({
    socket:{
        host: "localhost",  
        port: 6379,     
    }
      
});

client.on("connect", function () {
  console.log("Connected to Redis...");
});

client.on("error", function (err) {
  console.log("Redis error: " + err);
});

(async () => {
    try {
      await client.connect(); // Ensure connection before using Redis
      console.log("🚀 Redis client connected successfully!");
    } catch (err) {
      console.error("❌ Error connecting to Redis:", err);
    }
})();
  
module.exports=client;