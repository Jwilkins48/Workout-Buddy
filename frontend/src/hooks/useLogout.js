import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext.js";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutContext();

  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem("user");

    // Dispatch logout
    dispatch({ type: "LOGOUT" });

    // Clear global workout state
    workoutDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
