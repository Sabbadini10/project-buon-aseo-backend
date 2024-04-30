require('dotenv').config();
require('./src/mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');


//iniciando rutas
var apiAuthRouter = require('./src/routes/apiAuth');
var apiProductRouter = require('./src/routes/apiProduct');
var apiCartRouter = require('./src/routes/apiCarts');

var app = express();
const cors = require('cors');


const corsOptions = {
  origin: ['http://localhost:3030', 'http://localhost:3030'], // Allowed origins (adjust as needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  headers: ['Content-Type', 'Authorization'], // Allowed request headers
  exposedHeaders: ['Content-Range', 'X-Content-Range'], // Exposed response headers
  credentials: true // Enable cookies for cross-origin requests
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);


//rutas para apis
app.use('/api/auth', apiAuthRouter);
app.use('/api/product', apiProductRouter);
app.use('/api/cart', apiCartRouter);

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
