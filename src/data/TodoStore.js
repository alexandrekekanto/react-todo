import Immutable from 'immutable';
import uuidV1 from 'uuid/v1';
import {ReduceStore} from 'flux/utils';

import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';
import Todo from './Todo';

class TodoStore extends ReduceStore {

    constructor() {
        super(TodoDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {
            case TodoActionTypes.ADD_TODO:
                if (!action.text) {
                    return state;
                }
                const id = uuidV1();
                return state.set(id, Todo({
                    id,
                    text: action.text
                }));
            case TodoActionTypes.TOGGLE_TODO:
                console.log(action);
                console.log(state.update(action.id, t => t.set('completed', !t.completed)));
                return state.update(action.id, t => t.set('completed', !t.completed));
            case TodoActionTypes.LOAD_TODOS:
                return Immutable.OrderedMap(action.todos.map(t => [t.id, Todo(t)]));
            default:
                return state;
        }
    }
}

export default new TodoStore();