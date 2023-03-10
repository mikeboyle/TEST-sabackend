// Define our route handlers here
// Separation of concerns

// Import external stuff (libraries)
// Import express library
const express = require('express');
const cors = require('cors');

// Import OUR stuff (our files, our components)
const studentsController = require('./controllers/studentsController');
const studentsControllerV2 = require('./controllers/v2/studentsControllerV2');
const db = require('./db');

// Init express application
const app = express();

// Set up middleware
// Functions that will work with req, res before
// the final route handler function
app.use(cors());

// Controllers - V1
app.use('/students', studentsController);

// Controllers - V2
app.use('/v2/students', studentsControllerV2);

// Healthcheck route
app.get('/', (request, response) => {
  response.status(200).json({ data: 'Service is running' });
});

app.get('/tests', async (request, response) => {
  try {
    const tests = await db.any('SELECT * FROM tests');

    response.status(200).json({ data: tests });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});


module.exports = app;
