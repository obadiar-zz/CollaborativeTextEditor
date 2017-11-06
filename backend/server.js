const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

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

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.static('public'))

app.use(session({
  secret: 'text-editor'
}));

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
app.use('/', routes);

// SOCKETs

var latestContent = {};
var totalClientCount = 0;
io.on('connection', (socket) => {
  totalClientCount++;
  socket.on('disconnect', () => {
    totalClientCount--;
  });

  socket.on('DOCUMENT_OPEN', (documentID) => {
    socket.join(documentID);
    socket.room = documentID;
    if (latestContent[socket.room]) {
      socket.emit('CONTENT_UPDATE', latestContent[socket.room])
    };
  });

  socket.on('DOCUMENT_CLOSE', (documentID) => {
    socket.leave(documentID);
    socket.room = undefined;
  });

  socket.on('CONTENT_UPDATE', (content) => {
    latestContent[socket.room] = content;
    socket.broadcast.to(socket.room).emit('CONTENT_UPDATE', content)
  });
});

var port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server started. Listening on ${port}`);
});