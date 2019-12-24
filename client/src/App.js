import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';

import Courses from './components/courses/Courses';
import CreateCourse from './components/courses/CreateCourse';
import CourseDetail from './components/courses/CouresDetail';
import UpdateCourse from './components/courses/UpdateCourse';

import UserSignIn from './components/users/UserSignIn';
import UserSignOut from './components/users/UserSignOut';
import UserSignUp from './components/users/UserSignUp';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

const HeaderwithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdatedCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends Component {
  render() {
    return (
      <Router>
        <HeaderwithContext />
        <div>
          <Switch>
            <Route exact path='/' component={CoursesWithContext} />
            <PrivateRoute path='/courses/create' component={CreateCourseWithContext} />
            <PrivateRoute
              path='/courses/:id/update'
              component={                
               UpdatedCourseWithContext
              }
             />
            <Route
              exact
              path='/courses/:id'
              render={props => (
                <CourseDetailWithContext {...props} courseId={props.match.params.id} />
              )}
            />
            <Route path='/signin' component={UserSignInWithContext} />
            <Route path='/signup' component={UserSignUpWithContext} />
            <Route path='/signout' component={UserSignOutWithContext} />
            <Route path='/notfound' component={NotFound} />
            <Route path='/forbidden' component={Forbidden} />
            <Route path='/error' component={UnhandledError} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
