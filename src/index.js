import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import TodoActions from './data/TodoActions';
import './index.css';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);

TodoActions.fetchTodos();
