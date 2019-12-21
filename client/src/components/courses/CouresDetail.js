import React, { Component } from 'react';

class CourseDetail extends Component {
  componentDidMount() {
    const { context, courseId } = this.props;
    context.data.getSingleCourse(courseId).then(singleCourse => {
      this.setState({
        singleCourse
      });
    });

    
  }
  

handleDelete = () => {
  
  const {context, courseId} = this.props;
  const {authenticatedUser} = context
  const courseOwnerUser = this.state.singleCourse.course.User.emailAddress;
  const signedInUserEmailAdress = authenticatedUser.emailAddress;
  const signedInUserPassword = authenticatedUser.password;
  if(courseOwnerUser === signedInUserEmailAdress) {
    context.data.deleteCourse(courseId, signedInUserEmailAdress, signedInUserPassword)
  } else {
    throw new Error('user is not allowed to delete course CourseDetail Component')
  }
  
};

render() {
  
  if (this.state) {
    const {
      
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state.singleCourse.course;
    const { firstName, lastName } = this.state.singleCourse.course.User;
    const splitMaterials =
      materialsNeeded !== null
        ? materialsNeeded
            .slice(1)
            .split('*')
            .map((material, index) => <li key={index}>{material}</li>)
        : '';
    return (
      <div>
        <div>
          <div className='actions--bar'>
            <div className='bounds'>
              <div className='grid-100'>
                <span>
                  <a className='button' href='update-course.html'>
                    Update Course
                  </a>
                  <a
                    className='button'
                    onClick={() => {
                      this.handleDelete();
                    }}
                    href='/'
                  >
                    Delete Course
                  </a>
                </span>
                <a className='button button-secondary' href='/'>
                  Return to List
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='bounds course--detail'>
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course--label'>Course</h4>
              <h3 className='course--title'>{title}</h3>
              <p>
                By {firstName} {lastName}
              </p>
            </div>

            <div className='course--description'>
              <p>{description}</p>
            </div>
          </div>

          <div className='grid-25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <li className='course--stats--list--item'>
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>

                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>

                  <ul>{splitMaterials}</ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
}


export default CourseDetail;
