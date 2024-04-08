import dotenv from "dotenv";
import express from "express";
import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT;
const db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoDB"));

app.listen(port, () => console.log(`Server started on port ${port}`));
