import express from "express";
import dotenv from "dotenv";
import router from "./routes/auth.router.js";
import manager_router from "./routes/manager.router.js"
import { connectDB } from "./utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//  Load env FIRST
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//  Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//  Routes
app.use("/api", router);
app.use("/manager",manager_router);


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Server failed:", error.message);
  }
};

startServer();
