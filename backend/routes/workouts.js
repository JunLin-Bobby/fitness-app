// Routes for workout CRUD (protected routes)

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workoutController');

// All routes below require authentication
router.use(auth);

// Create a new workout log
router.post('/', createWorkout);

// Get all workout logs for current user
router.get('/', getWorkouts);

// Get a single workout log by ID
router.get('/:id', getWorkoutById);

// Update a workout log by ID
router.put('/:id', updateWorkout);

// Delete a workout log by ID
router.delete('/:id', deleteWorkout);

module.exports = router;
