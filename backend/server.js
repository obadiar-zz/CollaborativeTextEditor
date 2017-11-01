const express = require('express');
const app = express()
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes')
const auth = require('./auth');
const User = require('./models').User;

mongoose.connect(process.env.MONGODB_URI, error => {
  if (error) {
    console.log('Could not connect to MongoDB:', error)
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static('public'))

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function (username, password, done) {
  // Find the user with the given username
  User.findOne({
    username: username
  }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      console.log(user);
      return done(null, false);
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false);
    }
    // auth has has succeeded
    return done(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', routes)

app.listen(process.env.PORT, () => {
  console.log(`Backend server for Electron App running on port ${process.env.PORT}!`)
})
