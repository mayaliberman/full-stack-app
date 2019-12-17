import React, { Component } from 'react';
import Courses from './components/Courses';
import withContext from './CourseContext';
import CourseDetail from './components/CouresDetail'
import './App.css';

const CoursesWithContext = withContext(Courses);
const SingleCourse = withContext(CourseDetail)

class App extends Component {
  render() {
    return (
      <div>
        <CoursesWithContext />
        <SingleCourse />
      </div>
    );

    /* render something based on the value of MyContext */
  }
}

export default App;
