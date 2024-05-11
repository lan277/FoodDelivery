import mongoose from "mongoose";
import "dotenv/config"
export const connectDB  = async()=>{
    await mongoose.connect(process.env.CONNECT_STRING_DB)
    .then(()=>{
        console.log('connected!');
    })
}