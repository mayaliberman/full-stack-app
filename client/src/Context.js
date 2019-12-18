import React, { Component } from 'react';
import Data from './Data';
// import { thisExpression } from '@babel/types';
// import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  state = {};

  render() {
    const value = {
      data: this.data,
      // actions: {
      //   getCourses: this.getCourses
      // }
      //   actions: {
      //     signIn: this.signIn,
      //     signOut: this.signOut
      //   }
    };
    console.log('value.course: ', value.data);
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
  // handleCourses = async () => {
  //   const course = await this.data.getCourses();
  //   if (course !== null) {
  //     this.setState(() => {
  //       return { course };
  //     });
  //   }
  //   return course;
  // };
}

export const CourseConsumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
