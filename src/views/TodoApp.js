import React from 'react';

import TodoHeader from './TodoHeader';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

function TodoApp(props) {
  return (
      <div className="App">
        <TodoHeader />
        <AddTodoForm onAddTodo={props.onAddTodo} />
        <TodoList todos={props.todos} onToggleTodo={props.onToggleTodo} />
        <TodoFilter filters={props.filters} selected={props.selectedFilter} onFilterTodos={props.onFilterTodos} />
      </div>
    );
}

export default TodoApp;