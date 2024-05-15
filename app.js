require('dotenv').config();
require('./src/mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/apiUsers');
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser');


//iniciando rutas
var apiAuthRouter = require('./src/routes/apiAuth');
var apiUserRouter = require('./src/routes/apiUsers');
var apiCategoryRouter = require('./src/routes/apiCategory');
var apiProductRouter = require('./src/routes/apiProduct');
var apiCartRouter = require('./src/routes/apiCarts');
var apiTypeUserRouter = require('./src/routes/apiTypeUser');

var app = express();

 const corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}; 
 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cors(corsOptions));
/* app.use(cors(corsOptionsDelegate)); */

//rutas para apis
app.use('/api/auth', apiAuthRouter);
app.use('/api/users', apiUserRouter);
app.use('/api/category', apiCategoryRouter);
app.use('/api/product', apiProductRouter);
app.use('/api/cart', apiCartRouter);
app.use('/api/userTypes', apiTypeUserRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(res)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
