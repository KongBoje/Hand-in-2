var logger = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//routes
var routes = require('./routes/index');

var app = express();
var names = [];

//To simplify the use of Jade, we need to set the view folder and “tell” express which (Jade) view engine to use.
app.set('views', path.join(__dirname, 'views'));//Actually the default view folder
app.set('view engine', 'jade');//allow us to leave out the extension

//serve the favicon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//Log incoming requests
app.use(logger('dev'));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cookies
app.use(cookieParser());

//static
app.use(express.static(path.join(__dirname, 'public')));

//Root endpoint
app.use('/', routes);
/*app.get('/', function(req, res){
  //res.send('hello world');
  res.render('index', { title: 'Express' });
});*/

app.get('/form', function (req, res) {
  res.render('getform', {names: names.join(", ")});
});

app.post('/form', function (req, res) {
  names.push(req.body.name);
  res.redirect('/form');
});

app.post('/names', function (req, res) {
  names.push(req.body); //We receive it as a JavaScript object
  console.log(JSON.stringify(req.body)); 
  res.redirect('/form');
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);  //Calls to next() and next(err) indicate that the current handler is complete and in what state. next(err) will skip all remaining handlers in the chain except for those that are set up to handle errors
});

// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
//Will not print stacktrace
app.use(function (err, req, res, next) { // set Node_ENV=production & npm start
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: err
    });
});

console.log("server has started on 3000")
module.exports = app;