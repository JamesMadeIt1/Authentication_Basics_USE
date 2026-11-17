const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./Middlewares/logger');
const glocalErrorhandler = require('./Middlewares/global_error_handler');
const validator = require('./Middlewares/validator');
const validatePatchTodo = require('./Middlewares/validator_for_PATCH_request');
const cors = require('cors');
const Todo = require('./Models/todo.Models');
const ConnectDB = require('./Database/db');
const PORT = process.env.PORT || 3002;
const UserRoutes = require('./Routes/User.routes');

// Parse incoming JSON request
app.use(express.json());

// Middleware
const corsOptions = {
  origin: 'http://localhost:3002'
};

app.use(cors(corsOptions));
app.use(logger);

// SignUp & LogIn routes
app.use('/', UserRoutes);

// Global error handling middleware
app.use(glocalErrorhandler);

const startServer = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB. Server was not started.');
    console.error(error);
    process.exit(1);
  }
};

startServer();