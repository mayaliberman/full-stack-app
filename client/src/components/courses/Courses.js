import React, { Component } from 'react';
import NewCourseButton from './NewCourseButton';

//This component will render the list of all courses in the database.

class Courses extends Component {
  componentDidMount() {
    const { context } = this.props;
    context.data.getCourses().then(courses => {
      this.setState({
        courses
      });
    });
  }
  render() {
    return (
      <div className='bounds'>
        {this.state === null ? (
          <h1>Loading...</h1>
        ) : (
          this.state.courses.course.map(course => {
            return (
              <div className='grid-33' key={course.id}>
                <a
                  className='course--module course--link'
                  href={'/courses/' + course.id}
                >
                  <h4 className='course--label'>Course</h4>
                  <h3 className='course--title'>{course.title}</h3>
                </a>
              </div>
            );
          })
        )}

        <NewCourseButton />
      </div>
    );
  }
}

export default Courses;
