//requesting all required modules
const express = require('express');
const router = express.Router();
const { sequelize, models } = require('../db');
const { User, Course } = models;
const authenticate = require('./authenticate');
const bcryptjs = require('bcryptjs');

// Got awsome mail regex from slag 
const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//Creating a GET request for the /api/users route
//Returns the current uthenticated user
router.get('/', authenticate, (req, res) => {
  res.status(200);
  //Retrieving JSON data
  res.json({
      id: req.currentUser.id,
      firstName: req.currentUser.firstName,
      lastName: req.currentUser.lastName,
      emailAddress: req.currentUser.emailAddress,
  });
  res.end();

});
// Creating a POST request for the  /api/users route
//Creating a user, setting the Location header then returning no content
router.post('/', async(req, res, next) => {
  try{
    //if post request doesn't contain email and password  
    if (!req.body.emailAddress && !req.body.password) {
      const err = new Error('Please enter a valid email and password');
      err.status = 400;
      next(err);
      //if post request doesn't contain email 
    } else if (!req.body.emailAddress) {
      const err = new Error('Please enter a valid email address');
      err.status = 400;
      next(err);
      //if post request doesn't contain password 
    } else if (!req.body.password) {
      const err = new Error('Please enter a valid password');
      err.status = 400;
      next(err);
      //if post request doesn't contain a well formatted email
    } else if (mailRegex.test(req.body.emailAddress) === false){
      const err = new Error('Please enter a properly formatted email address ex:joe@smith.com');
      err.status = 400;
      next(err);
    } else {
        const emailAddress = await User.findOne({
        where: {
          emailAddress: req.body.emailAddress
        }
      })
        if(emailAddress) {
          //if post request contains email address that is already in use 
          const err = new Error('This email address is already in use.');
          err.status = 400;
          next(err);
        } else {
          //if all validations passes new user data is pushed
          const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
          };

          newUser.password = bcryptjs.hashSync(newUser.password);
          //creating new user data
          await User.create(newUser)
             res.location('/');
             res.status(201).end();
          
        }

      
    }
  }
  catch(err){
    //checking if sequelize validation is activated in post request 
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeConstraintError" ) {
    res.status(400).json({
    err: err.errors
      })
    } else {
      err.status = 500;
      next(err);
         }
      };
      
    

});

module.exports = router;