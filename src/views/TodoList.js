import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList(props) {
  return <ul>
    {props.todos.toList().map(t => <TodoListItem todo={t} key={t.id} onToggleTodo={props.onToggleTodo} />)}
  </ul>;
}

export default TodoList;