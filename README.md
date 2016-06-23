Computer Showcase Forms
===================

Description
-------------
> - a web application used for form submissions and displaying real-time statistics based on those submissions
> - a significant improvement to an old project that used Google Forms and Google App Script
very rushed and therefore contains a lot of inextensible spaghetti code

----------

Technologies and Respective Roles
-------------
> - React
>> - a JavaScript library for building user interfaces
>> - basic frontend view management and rendering
>> - uses ‘Metronic’ site templates for rapid prototyping (keenthemes.com)
>> - bundled with Webpack and served with Express.js

> - Auth0
>> - a universal identity platform
>> - used in the React application to allow users to securely sign in to the web application with Google account credentials

> - Pusher
>> - an events dispatching service
>> - a variety of client/server libraries for various languages
>> - integrated analytics
>> - React application uses the client library to listen to events about form submissions
>> - Go application uses the server library to emit events about form submissions

> - Go
>> - a compiled, statically typed language in the tradition of Algol and C
>> - garbage collection, limited structural typing, memory safety features, and CSP-style concurrent programming features
>> - Open-source, and created at Google
>> - uses the official HTTP library to serve a simple REST API

> - MySQL
>> - stores the form submissions

----------

Installation
-------------------

 1. List item
 2. Install and run MySQL Server.
 3. Run “create-schemas.sql” and “create-tables.sql” on MySQL server.
 4. Install Go.
 5. Set the GOPATH environment variable to point to “computer-showcase-forms/go-apps”.
 6. Change directory to “computer-showcase-forms/go-apps/src/pusher-server” and execute ‘go get && go run *.go’ to download all dependencies, compile source files, and run the resulting executable.
 7. Install Node.js.
 8. Change directory to “computer-showcase-forms/react-app” and execute ‘npm install && npm start’ to download all dependencies, bundle source files, and serve that bundle through an Express server.
 9. Navigate to “http://localhost:3000” on your browser.


----------
