import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './Context';

//This is the basie component who renders the whole application into the DOM
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
