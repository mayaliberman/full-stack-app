import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import withContext from './CourseContext';
import CourseDetail from './components/CouresDetail';
import './App.css';

const UserSignUpWithContext = withContext(UserSignUp);
const CoursesWithContext = withContext(Courses);
const SingleCourse = withContext(CourseDetail);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact patch='/' component={CoursesWithContext} />
            <Route path='/signin' component={UserSignIn} />
            <Route path='/signup' component={UserSignUpWithContext} />
            <Route path='/signout' component={UserSignOut} />
            <Route component={NotFound} />
          </Switch>
          {/* <SingleCourse /> */}
        </div>
      </Router>
    );

    /* render something based on the value of MyContext */
  }
}

export default App;
