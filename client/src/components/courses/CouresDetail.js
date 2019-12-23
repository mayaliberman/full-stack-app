import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class CourseDetail extends Component {
  componentDidMount() {
    const { context, courseId } = this.props;
    context.data.getSingleCourse(courseId).then(singleCourse => {
      this.setState({
        singleCourse,
        authenticatedUserId: context.authenticatedUser.id
       
      });
    });

    console.log('authenticatedUserId', context.authenticatedUser.id)
    
    

    
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
 
  console.log(this.state);
  if (this.state) {
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded, 
      userId
    } = this.state.singleCourse.course;

    const {authenticatedUserId} = this.state;
    
    // if (context.authenticatedUser.id) {
    //   const {id} = context.authenticatedUser;
    // } else {
    //   const id = 'none'
    // }
      //  console.log('courseUserId', courseUserId)
      //  console.log(signedId, 'signedId');

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
                {(userId === authenticatedUserId) ? (
                  <span>
                    <Link className='button' to={`/courses/${id}/update`}>
                      Update Course
                    </Link>
                    <Link
                      className='button'
                      onClick={() => {
                        this.handleDelete();
                      }}
                      to='/'
                    >
                      Delete Course
                    </Link>{' '}
                  </span>) : (<span></span>)
                }

                <Link className='button button-secondary' to='/'>
                  Return to List
                </Link>
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
