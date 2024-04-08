import { WorkoutContext } from "../context/WorkoutContext.jsx";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error("UseWorkoutContext must be used inside WorkoutContextProvider");
  }

  return context;
};
