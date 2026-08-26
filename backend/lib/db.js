import mongoose from "mongoose"
import dotenv from "dotenv"
export const connectDB = async()=>
{
    console.log(process.env.MONGO_URI)
    try{
   const conn = await mongoose.connect(process.env.MONGO_URI)
   console.log("connected sucessfully")
    }catch(err)
    {
      console.error("error connection to mongodb",err)
      process.exit(1)
    }
}