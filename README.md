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

#### Solution 1 


#### Solution 2


## Explain, using relevant examples, concepts related to the testing a REST-API using Node/JavaScript + relevant packages


## Explain, using relevant examples, the Express concept; middleware.


## Explain, using relevant examples, how to implement sessions, and the legal implications of doing this.


## Compare the express strategy toward (server side) templating with the one you used with Java on second semester.


## Explain, using a relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using for example the Request package.


## Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.


## Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.
