var expect = require( "chai" ).expect;
var request = require( "request" );
var http = require( "http" );
var app = require( '../app' );
var server;
var TEST_PORT = 4232;
var nock = require("nock");
var jokes = require("../jokeTest/jokerTest.js")

var url = "http://jokes-plaul.rhcloud.com";

var n = nock(url);
var testJoke = {"id": 1234, "joke": "ha ha ha", "reference": "unknown"};


describe('Person API Get', function () {
  before(function (done) {
    n.get('/api/joke')
      .reply(200,testJoke );
    done();
  });

  it('Should get the test joke', function (done) {
    jokes.getJoke(function (err, joke) {
      if (err) {
        throw err;
      }
      expect(joke.reference).to.be.equal("unknown");
      expect(joke).to.be.eql(testJoke);
      done();
    })

  })
});