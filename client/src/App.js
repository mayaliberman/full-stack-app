import React, { Component } from 'react';
import { Consumer } from './Context';
// import Data from './Data';
import './App.css';

class App extends Component {
  // state = {
  //   data: null,
  // }

  // componentDidMount() {
  //   fetch('http://localhost:5000')
  //   .then(response => response.json())
  //   .then(data => this.setState({data}))
  // }

  render() {
    console.log(this.state.data);
    return (
      <Consumer>
        {context => (
          <React.Fragment>
            {context.courses.map((course, index) => (
              <p {...courses} key={course.id.toString()} index={index}>{course.title}</p> 
            ))}
          </React.Fragment>
        )}
      </Consumer>
    );

    /* render something based on the value of MyContext */
  }
}

export default App;
