var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
require("dotenv").config();
require("./configs/cloudinary");
require("./configs/mongo");
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pinsRouter = require("./routes/pins");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true, // usefull when dealing with authentication
    optionsSuccessStatus: 200,
  })
);

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000* 60*60 * 4
  },
  resave: true,
  saveUninitialized: true
}))


// Initialisation d'un user permanent son id doit être modifié quand on seed à nouveau
app.use((req, res, next) => {
  req.session.currentUser = {
    _id : "6192412705adb740285e3331",
    profilePic: "http://images6.fanpop.com/image/photos/39000000/Cool-Dog-animals-39056074-1600-900.jpg",
    isFollowing : ["6192412705adb740285e3333", "6192412705adb740285e3334", "6192412705adb740285e3332"],
    username: "Croustie",
    email :"croustie@croustie.com",
    password: "azerty",
  }
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/pins", pinsRouter);

// app.use("/api/users", profileRouter);


module.exports = app;

