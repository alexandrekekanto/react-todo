import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import uuidV1 from 'uuid/v1';
import Immutable from 'immutable';
import './App.css';

const TodoHeader = () => {
  return <h3>To Do</h3>;
}

const TodoList = (props) => {
  console.log(props);
  return <ul>
    {props.todos.toList().map(t =>
      <TodoListItem key={t.id} todo={t} onToggleTodo={props.onToggleTodo} />
    )}
  </ul>;
}

class TodoListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {checked: false};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let checked = event.target.checked;
    this.setState({checked});
    this.props.onToggleTodo(this.props.todo.id);
  }

  render() {
    return <li><input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
      {this.props.todo.text}
    </li>;
  }
}

class AddTodoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onTodoAdded({
      id: uuidV1(),
      text: this.state.value,
      completed: false
    });
    this.setState({value: ''});
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({value: value});
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Adicione uma todo" value={this.state.value} onChange={this.handleChange} />
      <input type="submit" value="+" />
    </form>;
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: Immutable.OrderedMap()
    };
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  componentDidMount() {
    fetch("/api/todos.json")
      .then(response => response.json())
      .then(todos => {
        console.log(todos);
        this.setState({
          todos: Immutable.OrderedMap(todos.map(todo => [todo.id, todo]))
        });
      });
  }

  addTodo(todo) {
    let newTodos = this.state.todos.set(todo.id, todo);
    console.log(newTodos);
    this.setState({
      todos: newTodos
    });
  }

  toggleTodo(id) {
    let newTodos = this.state.todos.update(id,
      todo => {
        todo.completed = !todo.completed;
        return todo;
      });
    this.setState({todos: newTodos});
  }

  render() {
    return (
      <div className="App">
        <TodoHeader />
        <AddTodoForm onTodoAdded={this.addTodo} />
        <TodoList todos={this.state.todos} onToggleTodo={this.toggleTodo} />
      </div>
    );
  }
}

export default App;
