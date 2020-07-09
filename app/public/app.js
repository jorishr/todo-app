$(document).ready(function(){

    $.getJSON('/api/todos')
    .then(addTodos)
    .then(handleSelect)
    .catch(function(err){console.log(err)});

    $('#todoInput').keypress((e) => {
        if(e.which == 13){
            createTodo();
        };
    });

    //<li> elems are not loaded at start, thus listener on ul
    $('.list').on('click', 'p', function(e){
        let currentLi = $(this).parent();
        updateTodo(currentLi)
    });

    //<span> elems are not loaded at start, thus listener on ul
    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        let currentLi = $(this).parent().parent();
        removeTodo(currentLi)
    });
   
    $("#checkAll").click(function () {
        if ($("#checkAll").is(':checked')) {
            $("input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
                $('button').addClass('show');
            });

        } else {
            $("input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
                $('button').removeClass('show');
            });
        }
    });

    $('button.del').on('click', function() {
        const checkedBoxes = $('input:checked:not(#checkAll)');
        checkedBoxes.each(function() {
            removeTodo($(this).parent().parent());
        })
        $('button').removeClass('show');
        $('#checkAll').prop('checked', false);
    })

    $('button.update').on('click', function() {
        const checkedBoxes = $('input:checked:not(#checkAll)');
        checkedBoxes.each(function() {
            updateTodo($(this).parent().parent());
            $(this).prop('checked', false);
        })
        $('#checkAll').prop('checked', false);
    })

    
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
    let newLi = $(`<li class="task"><p>${todo.name}</p><div><input type="checkbox"><span>X</span></div></li>`);
    newLi.data('id', todo._id);
    newLi.data('completed', todo.completed);
    if(todo.completed){
        newLi.children().first().addClass('done');
    }
    $('ul').append(newLi);   
}

function createTodo(){
    $.post('/api/todos', {name: $('#todoInput').val()})
    .then(function(newTodo){
        addTodo(newTodo);
        $('#todoInput').val('');
    })
    .then(handleSelect)
    .catch(function(err){console.log(err)});
}

function updateTodo(currentElem){
    let currentLiId = currentElem.data('id');
    let isDone      = currentElem.data('completed');
    let updateData  = {completed: !isDone}
    $.ajax({
        method: 'PUT',
        url: `/api/todos/${currentLiId}`,
        data: updateData
    })
    .then(function(updatedTodo){
        //update styles
        const p = currentElem.children().first();
        p.toggleClass('done');
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

function handleSelect(){
    let lastChecked = null;
    let chkboxes = $('input:checkbox:not(#checkAll)');
    
    chkboxes.click(function(e) {
        $('button').addClass('show');
        //console.log("checkbox clicked");
        if(!lastChecked) {
            //console.log("This was the first checkbox clicked");
            lastChecked = this;
            return;
        }
        if(e.shiftKey) {
            //console.log("Shift held");
            let start = chkboxes.index(this);
            let end   = chkboxes.index(lastChecked);
            chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1)
                .prop('checked', lastChecked.checked);
            lastChecked = null;    
        }
        lastChecked = this;
        //show/hide removeBtn
        if($('input:checked').length === 0){
            $('button').removeClass('show');
        } 
    });
}