import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import Courses from './components/courses/Courses';
import UserSignIn from './components/users/UserSignIn';
import UserSignOut from './components/users/UserSignOut';
import UserSignUp from './components/users/UserSignUp';
import CreateCourse from './components/courses/CreateCourse';
import withContext from './Context';
import CourseDetail from './components/courses/CouresDetail';
import './App.css';

const UserSignUpWithContext = withContext(UserSignUp);
const CoursesWithContext = withContext(Courses);
const SingleCourseWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignInWithContext = withContext(UserSignIn)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={CoursesWithContext} />
            <Route path='/courses/create' component={CreateCourseWithContext}/>
            <Route path='/signin' component={UserSignInWithContext} />
            <Route path='/signup' component={UserSignUpWithContext} />
            <Route
              path='/courses/:id'
              render={props => (
                <SingleCourseWithContext courseId={props.match.params.id} />
              )}
            />
            <Route path='/signout' component={UserSignOut} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );

  }
}

export default App;
