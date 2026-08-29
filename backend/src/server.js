import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser"
import { app, server } from "../lib/socket.js";
import { fileURLToPath } from "url";
import cors from "cors"
dotenv.config()

const port = process.env.PORT || 3000;
// for deployment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "5mb" }))
app.use(cookieParser())
app.use(cors(
    {
      origin : process.env.CLIENT_URL || "http://localhost:5173" ,
      credentials : true  
    }
))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

// for deployment
const frontendPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));


app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});

server.listen(port,()=>
{
    console.log("server is running on port: " + port)
    connectDB()
})