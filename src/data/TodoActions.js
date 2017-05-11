import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';

const Actions = {

    addTodo(text) {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.ADD_TODO,
            text
        });
    },

    toggleTodo(id) {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.TOGGLE_TODO,
            id
        });
    },

    filterTodos(value) {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.FILTER_TODOS,
            value
        });
    },

    fetchTodos() {
        fetch('/api/todos.json')
            .then(response => response.json())
            .then(todos => {
                TodoDispatcher.dispatch({
                    type: TodoActionTypes.LOAD_TODOS,
                    todos
                });
             });
    }
}

export default Actions;