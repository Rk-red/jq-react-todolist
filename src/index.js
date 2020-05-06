import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todolist from './Todolist'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Todolist/>
  </React.StrictMode>,
  document.getElementById('root')
);


