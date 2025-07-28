// Main entry point for Express backend

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for all routes (you may restrict origins in production)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/workouts', require('./routes/workouts'));

// Basic health check route
app.get('/', (req, res) => res.send('Fitness Tracker API running.'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
