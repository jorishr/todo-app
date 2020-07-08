const   express     = require('express'),
        router      = express.Router(),
        helpers     = require('./helpers');

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodos);

router.route('/:todoId')
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.delTodo);

module.exports = router;