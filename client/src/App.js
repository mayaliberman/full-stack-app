import React, { Component } from 'react';
import Courses from './components/Courses';
import withContext from './CourseContext';
import './App.css';

const CoursesWithContext = withContext(Courses);

class App extends Component {
  render() {
    return (
      <div>
        <CoursesWithContext />
      </div>
    );

    /* render something based on the value of MyContext */
  }
}

export default App;
