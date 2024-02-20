import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
//configure env
dotenv.config();

//database connect

dotenv.config();

connectDB();
//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

// middleware routes
app.use("/api/v1/auth", authRoutes);

//rest api

app.get("/", (req, res) => {
  res.send({
    message: "welcome",
  });
});

//port

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port${PORT}`);
});
