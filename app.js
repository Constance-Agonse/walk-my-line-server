var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

require("./configs/mongo");

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// app.use("/api/users", profileRouter);


module.exports = app;
