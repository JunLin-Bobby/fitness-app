# Fitness Tracker Backend

This is the backend API server for the Fitness Tracker app, built with Node.js, Express.js, and MongoDB.

## Features

- User registration and login with JWT
- Secure password hashing (bcrypt)
- CRUD API for daily workout logs
- Protected routes (JWT auth middleware)
- Modular structure (models, controllers, routes, middleware)
- Easy connection to both local and MongoDB Atlas databases

## Prerequisites

- Node.js >= 18
- MongoDB (local or MongoDB Atlas account)
- [Postman](https://www.postman.com/) for API testing (optional)

## Environment Variables

Create a `.env` file in the backend directory with the following:

## env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Install dependencies
npm install

# Start the server (development mode, requires nodemon)
npm run dev

# Or start normally
node app.js

