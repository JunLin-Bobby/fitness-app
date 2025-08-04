// Controller for WorkoutLog CRUD operations

const WorkoutLog = require('../models/WorkoutLog');

// Create a new workout log
exports.createWorkout = async (req, res) => {
  try {
    const { date, muscleGroup, exercises, tags } = req.body;
    const workout = new WorkoutLog({
      userId: req.user.id,
      date,
      muscleGroup,
      exercises,
      tags,
    });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create workout log' });
  }
};

// Get all workout logs for current user
exports.getWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;
    const workouts = await WorkoutLog.find({ userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single workout log by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await WorkoutLog.findOne({ _id: req.params.id, userId: req.user.id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a workout log
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await WorkoutLog.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a workout log
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await WorkoutLog.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
