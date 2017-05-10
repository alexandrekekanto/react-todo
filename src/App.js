import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import uuidV1 from 'uuid/v1';
import Immutable from 'immutable';
import './App.css';

const TodoHeader = () => {
  return <h3>To Do</h3>;
}

const TodoList = (props) => {
  return <ul>
    {props.todos.toList().map(t => <TodoListItem todo={t} key={t.id} />)}
  </ul>;
}

const TodoListItem = ({todo}) => {
  return <li>{todo.text}</li>
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
    }

    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    fetch('/api/todos.json')
      .then(response => response.json())
      .then(json => {
        let todosMap = json.map(t => [t.id, t]);
        this.setState({
          todos: Immutable.OrderedMap(todosMap)
        });
      });
  }

  addTodo(todo) {
    let todosMap = this.state.todos.set(todo.id, todo);
    this.setState({
      todos: todosMap
    })
  }

  render() {
    return (
      <div className="App">
        <TodoHeader />
        <AddTodoForm onTodoAdded={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
