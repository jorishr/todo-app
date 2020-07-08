const Todo = require('../models/index');

exports.getTodos = (req, res) => {
    Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){res.send(err);});
};

exports.createTodos = (req, res) => {
    Todo.create(req.body)
    .then(function(newTodo){
      res.status(201).json(newTodo);  
    })
    .catch(function(err){res.send(err)}); 
};

exports.showTodo = (req, res) => {
    Todo.findById(req.params.todoId)
    .then(function(foundTodo){
      res.json(foundTodo);  
    })
    .catch(function(err){res.send(err)}); 
};

//without the option {new: true} the method findOneAndUpdate return the old value
exports.updateTodo = (req, res) => {
    Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(updatedTodo){
        res.json(updatedTodo);
    })
    .catch(function(err){res.send(err)});
};

exports.delTodo = (req, res) => {
    Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'Task deleted from the database!'});
    })
    .catch(function(err){res.send(err)});
};

module.exports = exports;