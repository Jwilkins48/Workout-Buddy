import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useWorkoutContext } from "../hooks/useWorkoutContext.js";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  // Create New On Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // On error
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    // If error
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("New workout added");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label>Exercise Title:</label>
      <input
        className={emptyFields.includes("title") ? "error" : ""}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <label>Load (lbs):</label>
      <input
        className={emptyFields.includes("load") ? "error" : ""}
        type="number"
        value={load}
        onChange={(e) => setLoad(e.currentTarget.value)}
      />

      <label>Reps:</label>
      <input
        className={emptyFields.includes("reps") ? "error" : ""}
        type="number"
        value={reps}
        onChange={(e) => setReps(e.currentTarget.value)}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
