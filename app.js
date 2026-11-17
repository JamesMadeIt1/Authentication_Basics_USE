const express = require('express');
const app = express();
require('dotenv').config();
const logger = require('./Middlewares/logger');
const globalErrorHandler = require('./Middlewares/global_error_handler');
const cors = require('cors');
const ConnectDB = require('./Database/db');
const PORT = process.env.PORT || 3002;
const UserRoutes = require('./Routes/User.routes');
const ArticleRoutes = require('./Routes/article.routes');

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
app.use('/', ArticleRoutes);

// Global error handling middleware
app.use(globalErrorHandler);

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