const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB using the environment variable
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
        console.log("DB Connection Error: ", err);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patientProfile', require('./routes/patientProfile'));


// Use the PORT environment variable, or default to 3002 if it's not set
const port = process.env.PORT || 3002;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
