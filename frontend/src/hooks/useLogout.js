import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutContext.js";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem("user");

    // Dispatch logout
    dispatch({ type: "LOGOUT" });

    // Clear global workout state
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
