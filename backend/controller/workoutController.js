import express from "express";
import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

// all workouts - /api/workouts
const displayWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// create workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // Input Validation
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// single workout - /api/workouts/:id
const displayWorkout = async (req, res) => {
  const { id } = req.params;

  // Make sure param id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Workout Found" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No Workouts Found" });
  }

  res.status(200).json(workout);
};

// delete workout
const deleteWorkouts = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndDelete({ _id: id });

  // Make sure param id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Workout Found" });
  }

  // No matching workout
  if (!workout) {
    return res.status(400).json({ error: "No Workout Found" });
  }

  res.status(200).json(workout);
};

// update workout
const updateWorkouts = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  // Make sure param id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Workout Found" });
  }

  // No matching workout
  if (!workout) {
    return res.status(400).json({ error: "No Workout Found" });
  }

  res.status(200).json(workout);
};

export {
  displayWorkouts,
  createWorkout,
  displayWorkout,
  deleteWorkouts,
  updateWorkouts,
};
