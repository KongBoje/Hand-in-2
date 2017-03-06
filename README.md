# Hand-in 2, JavaScript-express.

# Explain and Reflect
## Why would you consider a Scripting Language as JavaScript as your Backend Platform.
- It's easy and fast to build and setup a working network application with node.js and the right editor.
- It's very handy that you can use the same language both in front-end and in the back-end.
- Not a lot of code is required for an application to run.

## Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using for example Java/JAX-RS/Tomcat

### Pros
- You can make a good and responsive network application, if done right.
- Allows the use of data streaming, web sockets and fast file uploads.
- It's easy to set up a REST-API with generators like a custom boilerplate project, yeomon or express and mongoDB
- It is efficient at handling thousands of concurrent requests (For example - a chat application).
- It is very simple to implement server middleware, that will be executed between all requests.

### Cons
- Java is good at handling CPU heavy tasks, Node.JS + Express is not. Because Node is, despite its asynchronous event model, by nature single threaded. When you launch a Node process, you are running a single process with a single thread on a single core. So your code will not be executed in parallel, only I/O operations are parallel because they are executed asynchronous. As such, long running CPU tasks will block the whole server and are usually a bad idea.
- Java integrates well with relational databases like MySQL. Node.JS + Express does not, they have mongoDB but that isn't relational.
- Java as oppposed to Node.JS + Express is a strictly typed language which provides a certain security.
- 500 errors in Node.JS and Express will crash the entire application, Java will not.

## Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.

#### Solution 1 (built it)
- Node.js does not come with mutlithreading out of the box, since it's single threaded, but it is possible to build and program it yourself. We just haven't done that in class.

#### Solution 2 (Multiple servers)
- For scaling throughout on a webservice, you should run multiple Node.js servers on one or more machine/es, one per core and split request traffic between them. This provides excellent CPU-affinity and will scale throughout nearly linearly with core count. You could also put a load balancer in front of it. The load balancer will balance the load of incoming requests, thus achieving a multicore solution

## Explain, using relevant examples, concepts related to the testing a REST-API using Node/JavaScript + relevant packages
For the tests I have used chai and mocha, you first describe the test and then what "it" should do, aswell as a before and after the test.
- [Test](https://github.com/KongBoje/Hand-in-2/blob/master/expressJokes/test/restAPITest.js)

## Explain, using relevant examples, the Express concept; middleware.
Middleware functions are functions that you bind to the express instance and works as a way to configure/add functionality between requests:

- **Application level middleware**: Mount to all requests or specific endpoints to define routes.
- **Router-level middleware**: Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().
- **Error-handling middleware**: Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next)):
- **Third-party middleware**: Add functionality.

Middleware is executed sequentially. Therefore the order of the middleware is important. If we for example wanted to use the bodyParser to retrieve the body of our request as JSON, we would need to put it before we use it.


```javascript
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.json());

router.post('/', function (req, res) {
    res.send(req.body);
});
```

## Explain, using relevant examples, how to implement sessions, and the legal implications of doing this.
To enable the use of the session we have to require the module `express-session`. This module was earlier integrated into Express.js but was removed to make the framework more lightweight:
```javascript
var session = require('express-session');
```

We enable the session with the following middleware:
```javascript
app.use(session({
    secret: '50ac41d0f8eff5655213',
    saveUninitialized: false,
    resave: true
}));
```

To retrieve the session, we can do the following on the `req` object, and also add properties to it:
```javascript
    var session = req.session;
    session.username = "michael";
```

A cookie consent has to be implemented on the site, if the cookie is used to track user behaviour.

## Compare the express strategy toward (server side) templating with the one you used with Java on second semester.
Node.JS and Express uses templating engines like Handlebars, Jade and EJS. Java uses templating engines like JSP. Java was never made to be suitable for web applications, and JSP is often seen as a makeshift solution.

**MVC**:
- Java: Model --> Controller --> Servlet --> JSP

- Express.js: Model --> Controller/Router --> Handlebars/Jade/EJS

#### Example 1 (Passing variables to a view in Express)
Node.js + Express.js:
```javascript
router.get('/dashboard', isLoggedIn, function (req, res) {
    res.render('dashboard', {
        title: 'Dashboard',
        subtitle: 'Hello dashboard'
    });
});
```
Java + JSP
```java
protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        RequestDispatcher rd = null;
        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(30 * 60);

        session.setAttribute("title", "Dashboard");
        session.setAttribute("subtitle", "Hello dashboard");
        rd = request.getRequestDispatcher("dashboard.jsp");
        rd.forward(request, response);

}
```

#### Example 2 (Retrieving a session variable on the front end with Handlebars)
Node.js + Express.js:
```html
<h1>{{title}}</h1>
<h2>{{subtitle}}</h2>
```
Java + JSP
```jsp
<h1><%= session.getAttribute("title"); %></h1>
<h2><%= session.getAttribute("subtitle"); %></h2>
```
- Conclusion: use node.js Express for server side templating.

## Explain, using a relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using for example the Request package.
I first implemented a router.get api for a joke here:
- [api.js](https://github.com/KongBoje/Hand-in-2/blob/master/expressJokes/routes/api.js)<br />
Aswell as two GET requests and a POST request in the index.js:
- [Index.js](https://github.com/KongBoje/Hand-in-2/blob/master/expressJokes/routes/index.js)<br />
And handled it in App.js:
- [App.js](https://github.com/KongBoje/Hand-in-2/blob/master/expressJokes/app.js)

angular part: TBD

## Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
Testing the indexOf method on an array with 3 values:
```javascript
var assert = require('chai').assert;
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
```

Working with hooks:
```javascript
describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases
});
```

## Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.
I have used this mock test to test a GET method using chai but also using Nock
- [Mock Test](https://github.com/KongBoje/Hand-in-2/blob/master/expressJokes/test/mocktest.js)
