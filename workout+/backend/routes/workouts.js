const express = require("express");
const Workout = require('../models/workoutModel')
const { getWorkouts,getWorkout,createWorkout,deleteWorkout,updateWorkout } = require("../controllers/workoutController");

const router = express.Router();

router.get('/', getWorkouts)

router.get('/:id', getWorkout)

router.post('/', createWorkout
    //res.json({msg: 'POST a single'})
)

router.delete("/:id", deleteWorkout)

router.patch('/:id', updateWorkout )  

module.exports = router;
