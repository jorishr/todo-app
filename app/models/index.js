const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    'name': {type: String, required: 'Name cannot be blank!'},
    'completed': {type: Boolean, default: false},
    'dateCreated': {
        type: Date,
        default: Date.now
    }
});

//Instantiate the model class
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;