import {Container} from 'flux/utils';

import TodoApp from '../views/TodoApp';
import TodoStore from '../data/TodoStore';
import TodoFilterStore from '../data/TodoFilterStore';
import TodoActions from '../data/TodoActions';


function getStores() {
    return [
        TodoStore,
        TodoFilterStore
    ];
}

function getState() {
    let filter = TodoFilterStore.getState();
    let shouldShow = t => (filter === 'Todos') || (filter === 'Ativos' && !t.completed) || (filter === 'Completados' && t.completed);

    return {
        todos: TodoStore.getState().filter(shouldShow),
        filters: TodoFilterStore.getFilters(),
        selectedFilter: filter,

        onAddTodo: TodoActions.addTodo,
        onToggleTodo: TodoActions.toggleTodo,
        onFilterTodos: TodoActions.filterTodos
    };
}

export default Container.createFunctional(TodoApp, getStores, getState);