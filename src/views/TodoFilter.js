import React from 'react';
import TodoFilterButton from './TodoFilterButton'

function TodoFilter(props)  {
  return <div className="TodoFilter">
    {props.filters.map(f => <TodoFilterButton key={f} value={f} selected={f === props.selected} onFilterTodos={(e) => props.onFilterTodos(f)} />)}
  </div>;
}

export default TodoFilter;