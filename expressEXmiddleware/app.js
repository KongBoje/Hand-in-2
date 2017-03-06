var express = require("express");
//var bodyParser = require("body-parser");

var app = express();

//app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/calculator/:operation/:n1/:n2", function(req,res,next){
    var calculatorRequest = {
    operation: req.params.operation,
    n1: Number(req.params.n1),
    n2: Number(req.params.n2)
  };

  var result = 0;

    switch(calculatorRequest.operation){
        case 'add':
            result = calculatorRequest.n1 + calculatorRequest.n2;
            break;
        case 'multiply':
            result = calculatorRequest.n1 * calculatorRequest.n2;
            break;
        case 'substract':
            result = calculatorRequest.n1 - calculatorRequest.n2;
            break;
        case 'divide':
            result = calculatorRequest.n1 / calculatorRequest.n2;
            break;
        default:
            res.end('not a valid operation.')
            break;
    }
    res.end("Result is " + result);
});

app.get("/api/calculator/*",function(req,res){
    
});

app.listen(3000,function(){
  console.log("Server started, listening on: "+3000);
});