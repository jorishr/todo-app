const mongoose = require('mongoose');

//SCHEMA
const todoSchema = new mongoose.Schema({
    'name': {type: String, required: 'Name cannot be blank!'},
    'completed': {type: Boolean, default: false},
    'dateCreated': {
        type: Date,
        default: Date.now
    }
});

//MODEL
const Todo = mongoose.model('Todo', todoSchema);

//EXPORT MODEL

module.exports = Todo;