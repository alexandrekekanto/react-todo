import {ReduceStore} from 'flux/utils';
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';

class TodoFilterStore extends ReduceStore {
    constructor() {
        super(TodoDispatcher);
    }

    getInitialState() {
        return 'Todos';
    }

    getFilters() {
        return ['Todos', 'Ativos', 'Completados'];
    }

    reduce(state, action) {
        switch (action.type) {
            case TodoActionTypes.FILTER_TODOS:
                return action.value;
            default:
                return state;
        }
    }
}

export default new TodoFilterStore();