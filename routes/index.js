var express = require('express');
var router = express.Router();
var model = require('../models/Exercise');
var workoutModel = require('../models/WorkoutComponent');
//need to modify this variable based on who is logged in.
var liftsChosen = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user){
    res.render('index', {title: 'Fitness', currentUser: req.user.username})
  } else {
  res.render('index', { title: 'FITNESS'})
  };
});

router.get('/exercises', function(req,res,next){
  model.find(function(error, exercises){
    if (error) {
      console.log(error);
    };
    if (req.user){
      console.log(req.user);
      res.render('allexercises', {title: 'fitness',
        username: req.user.username,
        id: req.user["_id"],
        currentUser: req.user
      })
    } else {
      res.render('allexercises', {title: 'fitness'});
    }
  });
});

router.get('/workout', function(req, res, next) {
  workoutModel.find(function(error,exercises){
    if (req.user && exercises.length ==0) {
      console.log(exercises.length);
      res.render('workout', {data: liftsChosen, currentUser: req.user, message: "You don't have any lifts yet! Check out our database and add them here."});
    } else if (req.user && exercises.length > 0) {
      console.log(exercises.length);
      res.render('workout', {data: liftsChosen, currentUser: req.user.username, currentUserId: req.user._id});
    } else {
      res.redirect('/');
    }
  });
  console.log('-------user-------')
  console.log(req.user);
  //if (req.user && liftsChosen.length > 0){
    //    res.render('workout', {data: liftsChosen, currentUser: req.user.username, currentUserId: req.user._id});
  //} else if (req.user) {
   // res.render('workout', {data: liftsChosen, currentUser: req.user, message: "You don't have any lifts yet! Check out our database and add them here."});
  //} else {
    //res.redirect('/');
  //}

});


module.exports = router;
