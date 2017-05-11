import React, {Component} from 'react';

class AddTodoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddTodo(this.state.value);
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

export default AddTodoForm;