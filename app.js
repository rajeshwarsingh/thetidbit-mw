require('dotenv').config({ path: __dirname + '/.env' })
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newsRouter = require('./routes/news');
const blogsRouter = require('./routes/blogs');
const stockRouter = require('./routes/stock');
const videosRouter = require('./routes/videos');
const notificationCron = require('./controller/notificatinCron')
// console.log('notificatinCron:', notificationCron)
const app = express();

const {
  notificationWebCron,
  notificationAndroidCron,
  clearWebCron,
  clearAndroidCron
} = notificationCron

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: ['www.thetidbit.in',
    'www.thetidbit.in/',
    'https://thetidbit.in',
    'https://thetidbit.in/',
    'https://www.thetidbit.in/',
    'https://www.thetidbit.in',
    'http://www.thetidbit.in/',
    'http://thetidbit.in/',
    'http://localhost:3000',
    'http://localhost:3000/']
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
app.use('/blogs', blogsRouter);
app.use('/videos', videosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// START THE NOTIFICATION CRON
console.log("@@@@@", notificationAndroidCron())
// console.log("@@@@@", notificationWebCron())
console.log("check date: ", new Date())
console.log("check local date:", new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }));
module.exports = app;
