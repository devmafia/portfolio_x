import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const workout = { title, load, reps };
        
        const response = await fetch('/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.status !== 200) {
            //you are assuming that json.emptyFields exists in the response object 
            //from the server. If it does exist, this code will set the emptyFields state variable with its value.
           
            // React allows you to set state variables to any value, including undefined, so it won't cause an error.

                // Check if json has error property before using it
                if (json.hasOwnProperty('error')) {
                    setError(json.error);
                } else {
                    setError([]); // Set an appropriate default error message
                }

                // Check if json has emptyFields property before using it
                if (json.hasOwnProperty('emptyFields')) {
                    setEmptyFields(json.emptyFields);
                } else {
                    setEmptyFields([]); // Set it to an empty array or an appropriate default
                }
        } else if (response.status === 200) {
            setTitle("");
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            //console.log('new workout added', json);
            dispatch({type: "CREATE_WORKOUT", payload: json});
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input
                type="text"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes("load") ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="text"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps") ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error ? <div className="error">{error}</div> : null}
        </form>
    );
};

export default WorkoutForm;
