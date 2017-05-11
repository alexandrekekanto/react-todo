import React from 'react';

function TodoListItem(props) {
  return <li className="TodoItem">
    <input name="completed" type="checkbox" checked={props.todo.completed} onChange={(e) => props.onToggleTodo(props.todo.id)} />
    {props.todo.text}
  </li>;
}

export default TodoListItem;