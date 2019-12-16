import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CourseProvider } from './CourseContext';


ReactDOM.render(
  <CourseProvider>
    <App />
  </CourseProvider>,
  document.getElementById('root')
);

