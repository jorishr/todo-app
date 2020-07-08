$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos)
    .catch(function(err){console.log(err)});

    $('#todoInput').keypress((e) => {
        if(e.which == 13){
            createTodo();
        };
    });

    //<li> elems are not loaded at start, thus listener on ul
    $('.list').on('click', 'li', function(e){
        let currentLi = $(this);
        updateTodo(currentLi)
    });

    //<span> elems are not loaded at start, thus listener on ul
    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        let currentLi = $(this).parent();
        removeTodo(currentLi)
    });
});

function addTodos(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
};

/*  
Two ways to add the ID to the <li> that are generated on the page for reference
on put/delete requests:
- add a data attribute to <li data-id="todo._id">
- or jquery: elem.data('<name>', <value>), which is stored in memory
*/
function addTodo(todo){
    let newLi = $(`<li class="task">${todo.name}<span>X</span></li>`);
    newLi.data('id', todo._id);
    newLi.data('completed', todo.completed);
    if(todo.completed){
        newLi.addClass('done');
    }
    $('ul').append(newLi);   
}

function createTodo(){
    $.post('/api/todos', {name: $('#todoInput').val()})
    .then(function(newTodo){
        addTodo(newTodo);
        $('#todoInput').val('');
    })
    .catch(function(err){console.log(err)});
}

function updateTodo(currentElem){
    let currentLiId = currentElem.data('id');
    let isDone = currentElem.data('completed');
    let updateData = {completed: !isDone}
    $.ajax({
        method: 'PUT',
        url: `/api/todos/${currentLiId}`,
        data: updateData
    })
    .then(function(updatedTodo){
        //update styles
        currentElem.toggleClass('done');
        //update the hidden data attribute
        currentElem.data('completed', !isDone);
    })
    .catch(function(err){console.log(err)});
};

function removeTodo(currentElem){
    let currentLiId = currentElem.data('id');
    $.ajax({
        method: 'DELETE',
        url: `/api/todos/${currentLiId}`
    })
    .then(function(){
        currentElem.remove();
    })
    .catch(function(err){console.log(err)});
}