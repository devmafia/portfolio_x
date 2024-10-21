import React, { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
        //    console.log("Setted");
            return {
                workouts: action.payload,
            };
        case "CREATE_WORKOUT":
            console.log(action.payload);
            return {
                // add one to the top of all, that's why (...state.workouts)
                workouts: [action.payload, ...state.workouts],
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id),
            }
        default:
            return state;
    }
};

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, { workouts: [] });
    console.log(state);
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    );
};
