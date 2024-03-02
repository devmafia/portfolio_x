import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from 'date-fns/parseISO';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();

    //console.log("workout.createdAt:", workout.createdAt);

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, { method: "DELETE" });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json });
        }
    }

    // Parse the createdAt date and format it
    const createdAtDate = workout.createdAt ? parseISO(workout.createdAt) : null;
    const formattedDate = createdAtDate ? formatDistanceToNow(createdAtDate, { addSuffix: true }) : null;

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps: {workout.reps}</strong></p>
            <p>{formattedDate}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails;
