var express = require('express');
var router = express.Router();
var jokeGenerator = require('../model/jokes');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Joke center', username: req.session.username, counters: req.session.counters});
});

/* GET random joke page. */
router.get('/joke', function (req, res, next) {
    if (req.session.counters.joke === undefined)
        req.session.counters.joke = 0;

    req.session.counters.joke += 1;
    res.render('joke', {title: 'Random Joke', joke: jokeGenerator.getRandomJoke()});
});


/* GET all jokes.js page. */
router.get('/jokes', function (req, res, next) {
    if (req.session.counters.jokes === undefined)
        req.session.counters.jokes = 0;

    req.session.counters.jokes += 1;
    res.render('jokes', {title: 'All jokes', jokes: jokeGenerator.allJokes});
});

/* GET add jokes page. */
router.get('/addjoke', function (req, res, next) {
    res.render('addjoke', {title: 'Add a joke'});
});

/* POST save joke. */
router.post('/savejoke', function (req, res, next) {
    if (req.session.counters.savejoke === undefined)
        req.session.counters.savejoke = 0;

    req.session.counters.savejoke += 1;
    jokeGenerator.addJoke(req.body.joke);
    res.redirect('/addjoke');
});

/* GET login page */
router.get('/login', function (req, res, next) {
    if (req.session.counters === undefined)
    req.session.counters = {};

    res.render('login', {title: 'Log in'});
});

/* GET random joke API */
router.get('/api/joke/random', function(req, res, next) {
    res.header('ContentType', 'application/json');
    res.send({data: jokeGenerator.getRandomJoke()});
});

/* GET all jokes API */
router.get('/api/jokes', function(req, res, next) {
    res.header('ContentType', 'application/json');
    res.send({data: jokeGenerator.allJokes});
});

/* POST new joke API */
router.post('/api/joke', function(req, res, next) {
    jokeGenerator.addJoke(req.body.joke);
    res.header('ContentType', 'application/json');
    res.send({joke: req.body.joke});
});

module.exports = router;