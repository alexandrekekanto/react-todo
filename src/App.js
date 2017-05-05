import React, { Component } from 'react';
import './App.css';

const TodoHeader = () => {
  return <h3>To Do</h3>;
}

const TodoList = (props) => {
  return <ul>
    {props.todos.map(t => <TodoListItem todo={t} />)}
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

let TODOS = [
  {text: "Denis 1", completed: false},
  {text: "Denis 2", completed: false},
  {text: "Denis 3", completed: false}
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: TODOS
    }

    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(todo) {
    TODOS.push(todo);
    this.setState({
      todos: TODOS
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
