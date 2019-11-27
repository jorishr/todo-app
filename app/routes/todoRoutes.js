const   express     = require('express'),
        router      = express.Router(),
        db          = require('../models'),
        helpers      = require('../helpers/routeHelpers');

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodos);

router.route('/:todoId')
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.delTodo);

module.exports = router;

/* //GET ALL ROUTE    
router.get('/', (req, res) => {
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){res.send(err);});
});

//CREATE ROUTE
router.post('/', (req, res) => {
    db.Todo.create(req.body)
    .then(function(newTodo){
      res.status(201).json(newTodo);  
    })
    .catch(function(err){res.send(err)}); 
});

//SHOW ROUTE
router.get('/:todoId', (req, res) => {
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
      res.json(foundTodo);  
    })
    .catch(function(err){res.send(err)}); 
});

//UPDATE ROUTE
//without the option {new: true} the method findOneAndUpdate return the old value
router.put('/:todoId', (req, res) => {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(updatedTodo){
        res.json(updatedTodo);
    })
    .catch(function(err){res.send(err)});
});

//DELETE ROUTE
router.delete('/:todoId', (req, res) => {
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'Task deleted from the database!'});
    })
    .catch(function(err){res.send(err)});
}); */