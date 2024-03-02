import { useEffect, useState } from "react";

import WorkoutDetails from '../components/WorkoutDetails.js'
import WorkoutForm from '../components/WorkoutForm.js'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();

    useEffect(() => {
        const fetchWorkouts = async() => {
            const response = await fetch("/api/workouts");

            const json = await response.json();

            if (response.ok) {
                dispatch({type: "SET_WORKOUTS", payload: json});            //console.log(json);
            }            

        }
    console.log(useWorkoutsContext.workouts);


        fetchWorkouts()
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
            <h2>Home</h2>
            {workouts && console.log(workouts)}
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>

            <WorkoutForm />
        </div>
    );
    
}
export default Home;