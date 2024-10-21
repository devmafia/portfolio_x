const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String, 
        required: true,
    },
    reps: {
        type: Number,
        required: true,  
    },
    load: {
        type: Number,
        required: true
    }
// when the doc was created
}, { timestamp: true } )

// create a model
module.exports = mongoose.model("Workout", workoutSchema)

