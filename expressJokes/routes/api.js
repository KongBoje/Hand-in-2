var express = require('express');
var router = express.Router();
var jokeGenerator = require('../model/jokes');

router.get('/api/joke', function(req, res, next) {
    res.header('ContentType', 'application/json');
    console.log('test');
    res.end(jokeGenerator.getRandomJoke());
});

module.exports = router;