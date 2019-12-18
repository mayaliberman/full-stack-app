import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import withContext from './Context';
import CourseDetail from './components/CouresDetail';
import './App.css';

const UserSignUpWithContext = withContext(UserSignUp);
const CoursesWithContext = withContext(Courses);
const SingleCourseWithContext = withContext(CourseDetail);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/courses/' component={CoursesWithContext} />
            <Route path='/signin' component={UserSignIn} />
            <Route path='/signup' component={UserSignUpWithContext} />
            <Route
              path='/courses/:id'
              render={props => (
                <SingleCourseWithContext
                  courseId={props.match.params.id}
                  key={props.location.key}
                />
              )}
            />
            <Route path='/signout' component={UserSignOut} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );

    /* render something based on the value of MyContext */
  }
}

export default App;
