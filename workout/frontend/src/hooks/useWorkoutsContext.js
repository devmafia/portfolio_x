import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from 'react';

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);
   // console.log(context.state);

    if (!context) {
        throw Error("must be used inside a Provider")
    }

    return context;
} 