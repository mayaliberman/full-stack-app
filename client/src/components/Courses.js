import React, { Component } from 'react';

class Courses extends Component {
  componentDidMount() {
    const { context } = this.props;
    context.data.getCourses().then(courses => {
      this.setState({ courses });
      console.log(courses);
    });
  }
  render() {
    const { context } = this.props;
    const courses = this.state.courses;

  
    const courseList = courses.map(course => {
      return (
        <div className='grid-33'>
          <a className='course--module course--link' href='course-detail.html'>
            <h4 className='course--label'>Course</h4>
            <h3 className='course--title'>{course.title}</h3>
          </a>
        </div>
      );
    });
    return <div className='bounds'>{courseList}</div>;
  }
}

export default Courses;
