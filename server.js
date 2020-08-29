let createError = require('http-errors');
let express = require('express');
let path = require('path');
let db = require('./persistence/db');
let cookieParser = require('cookie-parser');
let routerIndex = require('./routes/index.router');
let routerMovies = require('./routes/movies.router');
let routerUsers = require('./routes/user.router');
let server = express();

db.init();

//MIDDLEWARE
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

//ROUTE
server.use('/', routerIndex);
server.use('/movies', routerMovies);
server.use('/user', routerUsers);


//ERROR
//catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});
//error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
