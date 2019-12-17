import React, { Component } from 'react';
import NewCourseButton from './NewCourseButton';

class Courses extends Component {
  render() {
    let context = this.props.context;
    return (
      
      <div className='bounds'>
        {!context.courseList || !context.courseList.course ? (
          <h1>Loading...</h1>
        ) : (
          context.courseList.course.map(course => {
            return (
              <div className='grid-33' key={course.id}>
                <a
                  className='course--module course--link'
                  href={'/api/courses/:' + course.id}
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
