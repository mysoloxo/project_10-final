//requiring the needed module and files 
const express = require('express');
const router = express.Router();
const { sequelize, models } = require('../db');
const { User, Course } = models;
const authenticate = require('./authenticate');


//Retrieving a list of courses thand the users that owm them 
router.get('/', async(req, res, next) => {
  try{
  const user = req.currentUser;
  console.log(user);
  
  const courses = await Course.findAll({
    //getting back data but excluding creatAT and updateAt data
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        //retrieving the user info
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'emailAddress']
      }
    ],
    order:[['title', 'ASC']]

  })
    res.status(200).json({courses: courses, user: user});

}
  catch(err) {
    //catching error if any
    err.status = 400;
    next(err);
  };
});

//retrieving one course and the user that owns it 

router.get('/:id',  async(req, res, next) => {
  try{
  const courseId = req.params.id;

  const courses = await Course.findOne({
    attributes:{ exclude: ['createdAt', 'updatedAt'] },
      include: [{
        model:User,
        attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
    }],
    where: [{id: courseId }]
  })
    
      res.status(200).json({courses: courses, user: req.currentUser})
    
  } 
    catch(err){
        err.status = 500;
        next(err);
    };
})
// Creating POST for  /api/courses route
//Creates a course, sets the Location header to the URI for the course, and returns no content

router.post('/', authenticate, async(req, res, next) => {
  try{
    //if post request doesn't contain the title and the discription then render error and move to next 
    if (!req.body.title && !req.body.description) {
      const err = new Error('You need to enter a title and a description to create a course.');
      err.status = 400;
      next(err);
      //if post request doesn't contain title render error

    } else if (!req.body.title) {
      const err = new Error('You need to enter a title to create this course.');
      err.status = 400;
      next(err);

      //if post request doesn't contain a discription render error
    } else if (!req.body.description) {
      const err = new Error('You need to enter a description to create this course.');
      err.status = 400;
      next(err);
    } else {
      const title = await Course.findOne({
        where: {
          title: req.body.title
        }
      })
        //Rendering error if title already exit in database
        if (title) {
          const err = new Error('This course already exists.');
          err.status = 400;
          next(err);
          //if all validations are meet creating the course then setting header location
        } else {
          const course = await Course.create(req.body)
            res.location(`/api/courses/${course.id}`);
            res.status(201).end();
          
        }
    }
  }
    //Catching errors if any
    catch(err){
          err.status = 400;
          next(err);
        };
      
  
  
});


// Creating a PUT request for the /api/courses/:id route
// Updating a course and returns no content
router.put('/:id', authenticate, async(req, res, next) => {
  try{
  const user = req.currentUser;
  //if put request doesn't contain the title and the discription then render error and move to next 
  if (!req.body.title && !req.body.description) {
    const err = new Error('You need a title and description to update this course');
    err.status = 400;
    next(err);

     //if put request doesn't contain title render error
  } else if (!req.body.title) {
    const err = new Error('You need to enter a title to update this course.');
    err.status = 400;
    next(err);
     //if put request doesn't contain title render error
  } else if (!req.body.description) {
    const err = new Error('You need to enter a description to update this course.');
    err.status = 400;
    next(err);

  } else {
      const course = await Course.findOne({
        where: {id: req.params.id}
      })
        //if course to update can't be found render error 
        if(!course) {
          res.status(404).json({ message: 'Sorry Cause Not Found.' });

        } else if (course.userId !== user.id) {
          //if user is not Authorized to update course
          res.status(403).json({ message: 'Sorry You are not authorized to update this course.' });
          
          //else if user meets all validation checks and course to update is present then course will be updated 
        } else {
          await course.update(req.body);
          res.status(204).end();
        }
      
    }
  }
    catch(err){
        err.status = 400;
        next(err);
      };
    
});

//Creating a DELETE request for /api/courses/:id route
//Deletes a course and returns no content
router.delete('/:id', authenticate, async(req, res, next) => {
  try{
  const user = req.currentUser;
  //retrieving course with specific id
  const course = await Course.findOne({
    where: {id: req.params.id}
  })
    //if course doesn't exist in database 
    if(!course) {
      res.status(404).json({ message: 'Sorry Course Not Found.' });

      //if user is not Authorized to delete course 
    } else if (course.userId !== user.id) {
      res.status(403).json({ message: 'You are not authorized to delete this course.' });
      //destroying course
    } else {
      await course.destroy();
      res.status(204).end();
    }
    //Catching error
  
}
  catch(err) {
      err.status = 400;
      next(err);
  };

});


module.exports = router;