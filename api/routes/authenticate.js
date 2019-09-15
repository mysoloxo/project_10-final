'use strict';
//requiring needed modules
const express = require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const { sequelize, models } = require('../db');
const { User, Course } = models;


// Construct a router instance.
// const router = express.Router();

const authenticate = (req, res, next) => {
  let message = null;

  // sgetting the user's credentials from the Authorization header and storing it in a constant.
  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {
    //Retrieving the users database by matchding it to the key from the   Authorization header
    User.findOne({
      attributes:{ exclude: ['createdAt', 'updatedAt'] },
      where: {emailAddress: credentials.name}
    })
      .then(user => {
        if (user) {
          //using bcrptsjs from the npm package to compare user's possword in the database and Authorizatio header
            const authenticated = bcryptjs
            .compareSync(credentials.pass, user.password);

          // If the Authentication matches
          if (authenticated) {
            
            console.log(`Authentication successful for username: ${user.emailAddress}`);
            //retrieving user information from Authentication so that depending middleware can utilize the infomation
            req.currentUser = user;
            next();
          } else {
            message = `Authentication failure for username: ${user.emailAddress}`;
            res.status(401).json({message: message});
          }
        } else {
          message = `User name is not found`;
          res.status(404).json({message: message});
        }
      });
  } else {
    const err = new Error('Please enter a valid email address and password');
    err.status = 401;
    next(err);
  }
};

module.exports = authenticate;