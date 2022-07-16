# Task Manager
Single page todo-app with custom JSON API.

Main UI feature: select multiple (shift key), delete and update a custom selection of tasks.

Built with NodeJs, Express & MongoDb.

API endpoints for GET/POST/PUT/DELETE requests.

AJAX requests with jQuery.

Development tools: Gulp taskrunner with Nodemon.

## API endpoints
- '/api/todos' GET: get all tasks from database
- '/api/todos' POST: add new task to database
- '/api/todos/:id' GET: retrieve a single task 
- '/api/todos/:id' PUT: update an existing task
- '/api/todos/:id' DELETE: delete an existing task

## UI code with jQuery
See app/public/app.js
