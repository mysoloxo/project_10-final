'use strict';

// requiring express anad morgan modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
// requiring the database
const { sequelize, models } = require('./db');

// get references to our models
const { User, Course } = models;

//creating variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// creating database test
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync();
  })
  .catch(err => console.log('Error: ' + err))

// creating the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// getting data in json so that it can be read
app.use(express.json());
//Adding cors capabilities for browser communication
app.use(cors());

// setting up API addresses

app.use('/api', require('./routes/index'));
app.use('/api/users', require ('./routes/users'));
app.use('/api/courses', require ('./routes/courses'));

//setting a freindly message to be rendered on the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my REST API project!',
  });
});

// sending a 404 error if no route is matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Sorry Route Not Found',
  });
});

// setting up a gobal error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// setting up the port 
app.set('port', process.env.PORT || 5000);

// setting app to start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`express server is listening on port ${server.address().port}`);
});