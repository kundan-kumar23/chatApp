import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser"
const app = express()
dotenv.config()

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


app.listen(port,()=>
{
    console.log("server is running on port: " + port)
    connectDB()
})