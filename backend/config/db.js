import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        console.log(uri);
        
        const conn = await mongoose.connect(uri,{
           //useUnifiedTopology:true,
           //useNewUrlParser: true,
           // useCreateIndex: true,
        });

        console.log(`Db connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
        
    }
}












