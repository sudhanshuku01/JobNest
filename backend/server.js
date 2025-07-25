import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["https://jobsnest.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("server is running fine");
});
// Routes
app.use("/api/jobs", jobRoutes);

// DB and Server Init
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
