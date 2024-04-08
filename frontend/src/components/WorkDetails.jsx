import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useWorkoutContext } from "../hooks/useWorkoutContext.js";

const WorkDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    //  On error - No user
    if (!user) {
      return;
    }

    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      { method: "DELETE", headers: { Authorization: `Bearer ${user.token}` } }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (lbs): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>

      <span onClick={handleClick} className="material-symbols-outlined">
        Delete
      </span>
    </div>
  );
};

export default WorkDetails;
