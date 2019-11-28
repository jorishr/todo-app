"use strict";var db=require("../models");exports.getTodos=function(o,n){db.Todo.find().then(function(o){n.json(o)}).catch(function(o){n.send(o)})},exports.createTodos=function(o,n){db.Todo.create(o.body).then(function(o){n.status(201).json(o)}).catch(function(o){n.send(o)})},exports.showTodo=function(o,n){db.Todo.findById(o.params.todoId).then(function(o){n.json(o)}).catch(function(o){n.send(o)})},exports.updateTodo=function(o,n){db.Todo.findOneAndUpdate({_id:o.params.todoId},o.body,{new:!0}).then(function(o){n.json(o)}).catch(function(o){n.send(o)})},exports.delTodo=function(o,n){db.Todo.remove({_id:o.params.todoId}).then(function(){n.json({message:"Task deleted from the database!"})}).catch(function(o){n.send(o)})},module.exports=exports;