var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var routes = require('./routes/index');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'secret_3162735',saveUninitialized:true, resave: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.url.substring(0,5) == '/api/')
    return next();
  if (req.session.username != undefined)
    return next();
  if (req.body.username != undefined) {
    req.session.username = req.body.username;
    return res.redirect('/');
  } else {
    req.url = '/login';
    return next();
  }
});


app.use('/', routes);
app.use('/joke', routes);
app.use('/jokes', routes);
app.use('/addjoke', routes);
app.use('/api/joke/random', routes);
app.use('/api/jokes', routes);
app.use('/api/joke', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


console.log("server has started on 3000")
module.exports= app;