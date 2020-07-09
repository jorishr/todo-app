# Task Manager
Single page todo-app with custom JSON API and shift-select multiple functionality.

## UI code with jQuery
- Main UI feature: using checkboxes and the SHIFT key the user can make a custom selection of tasks and delete them or set their status to done. 
- Clicking on an existing task set the task to status: done.
- Hovering over an existing task gives to option to delete the task.
- See app/public/app.js

## API endpoints
- '/api/todos' GET: get all tasks from database
- '/api/todos' POST: add new task to database
- '/api/todos/:id' GET: retrieve a single task 
- '/api/todos/:id' PUT: update an existing task
- '/api/todos/:id' DELETE: delete an existing task