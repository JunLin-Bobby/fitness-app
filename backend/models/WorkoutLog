// WorkoutLog schema and model definition

const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Exercise name, e.g., "Bench Press"
  sets: { type: Number, required: true },       // Number of sets
  reps: { type: Number, required: true },       // Number of repetitions per set
  weight: { type: Number },                     // Weight in kg or lbs
  notes: { type: String }                       // Optional notes
}, { _id: false });

const workoutLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  date: { type: Date, required: true },               // Date of workout
  muscleGroup: { type: String, required: true },      // Muscle group, e.g., "Chest", "Legs"
  exercises: [exerciseSchema],                        // List of exercises performed
  tags: [{ type: String }]                            // Optional tags, e.g., "intense", "morning"
}, { timestamps: true });

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
