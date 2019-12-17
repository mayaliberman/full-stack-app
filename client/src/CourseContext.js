import React, { Component } from 'react';
import Data from './Data';
// import { thisExpression } from '@babel/types';
// import Cookies from 'js-cookie';

const CourseContext = React.createContext();

export class CourseProvider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  updateCourses = () => {
    this.getCourses()
      .then(courses => {
        this.setState({ courses });
      })
      .catch(error => {
        //this catch method outputs a message to the console, should axios fail to retrieve data
        console.log('Something went wrong, could not access data', error);
      });
  };

  componentDidMount() {
    this.updateCourses();
   
  }

  state = {};

  render() {
   

    const value = {
     
      data: this.data,
      courseList: this.state.courses,
      singleCourse: this.state.singleCourse,
      actions: {
        getCourses: this.getCourses,
        getOneCourse: this.getSingleCourse
      }
      //   actions: {
      //     signIn: this.signIn,
      //     signOut: this.signOut
      //   }
    };
    console.log('value.courseList: ', value.courseList);
    return (
      <CourseContext.Provider value={value}>
        {this.props.children}
      </CourseContext.Provider>
    );
  }
getSingelCourse = async () => {
  const singleCourse = await this.data.getSingleCourse(this.props.params);
  if(singleCourse !== null) {
    this.setState(() => {
      return { singleCourse}
    })
  }
}
  getCourses = async () => {
    const course = await this.data.getCourses();
    if (course !== null) {
      this.setState(() => {
        return { course };
      });
    }
    return course;
  };
}

export const CourseConsumer = CourseContext.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <CourseContext.Consumer>
        {context => <Component {...props} context={context} />}
      </CourseContext.Consumer>
    );
  };
}
