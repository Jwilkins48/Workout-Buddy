import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  displayWorkouts,
  createWorkout,
  displayWorkout,
  deleteWorkouts,
  updateWorkouts,
} from "../controller/workoutController.js";

const router = express.Router();
router.use(requireAuth);

// all workouts - /api/workouts
router.get("/", displayWorkouts);

// create workout
router.post("/", createWorkout);

// single workout - /api/workouts/:id
router.get("/:id", displayWorkout);

// delete workout
router.delete("/:id", deleteWorkouts);

// update workout
router.patch("/:id", updateWorkouts);

export default router;
