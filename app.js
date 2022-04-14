require('dotenv').config({path: __dirname + '/.env'})
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
var stockRouter = require('./routes/stock');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: ['https://thetidbit-pushnotification--fb.firebaseapp.com/','https://thetidbit-pushnotification--fb.firebaseapp.com','https://thetidbit.in', 'https://thetidbit.in/','https://www.thetidbit.in/','http://www.thetidbit.in/','http://thetidbit.in/','http://localhost:3000','http://localhost:3000/']
}));


// DB Setup
// mongoose.connect('mongodb://localhost:democompany/democompany');
mongoose.connect("mongodb+srv://Akbar23024:Akbar23024@cluster0.hb7na.mongodb.net/thetidbit?retryWrites=true&w=majority");
// App Setup


// app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/stocks', stockRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
