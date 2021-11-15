var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

require("./configs/mongo");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use((req, res, next) => {
//   req.session.currentUser = {
//     name : "Joe",
//     nickname: "SuperJoe",
//     email : "joe@joe.com",
//     phone : "12",
//     password :"multipass",
//     rates : 2,
//     _id: '6179280d72c4354791750fbf',
//     skills : ["617929c9aa824a93bf7072ed",
//   "61792a6f47ab974272eaebe1",
// "61792c79ce26ab179839a215",
// "61792e0887bf08eaf2fbe38c"]
//   }
//   next()
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
