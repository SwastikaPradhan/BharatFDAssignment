const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const faqRoutes = require("./routes/faqRoutes");
const redisClient=require("./config/redis");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/api',faqRoutes);
(async () => {

    try{

        await connectDB();

        redisClient.set("mykey","Hello,Redis!", (err,reply)=>{
            if(err) console.log(err);
            console.log("Set response",reply);

        });
        redisClient.get("mykey",(err,reply)=>{
            if(err) console.log(err);
            console.log("Get response:",reply);
        })

        app.listen(PORT, () => {
           console.log(`🚀 Server listening at PORT ${PORT}`);
      });

    }catch(error){
        console.error("Error connecting to the database:",error);
        process.exit(1);
    }
    
})();
