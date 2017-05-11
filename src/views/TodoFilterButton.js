import React from 'react';

function TodoFilterButton(props) {
  return <button
        className={props.selected ? 'selected' : ''}
        onClick={() => props.onFilterTodos(props.value)}>
    {props.value}
  </button>;
}

export default TodoFilterButton;