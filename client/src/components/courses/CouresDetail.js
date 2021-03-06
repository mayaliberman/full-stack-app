import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown');
class CourseDetail extends Component {
  //When the component mount the getSingleCourse method will be activated with the course id.
  componentDidMount() {
    const { context, courseId } = this.props;
    context.data
      .getSingleCourse(courseId)
      .then(singleCourse => {
        //If the title contains an emtpy string it means there is no courses content which will direct to the not found page.
        if (singleCourse.course.title === '') {
          this.props.history.push('/notfound');
        }

        //If a user is logged in, the state will be updated with the authenticated user id.
        if (context.authenticatedUser !== null) {
          this.setState({
            singleCourse,
            authenticatedUserId: context.authenticatedUser.id
          });
         
         
        } else if (context.authenticatedUser === null) {
          this.setState({
            singleCourse
          });
         
        } else {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  //This method will check if the course owner is identical with the loged authenticated user.
  // If confirmed, it will enable the user to delete the course.
  handleDelete = () => {
    const { context, courseId } = this.props;
    const { authenticatedUser } = context;
    const courseOwnerUser = this.state.singleCourse.course.User.emailAddress;
    const signedInUserEmailAdress = authenticatedUser.emailAddress;
    const signedInUserPassword = authenticatedUser.password;
    if (courseOwnerUser === signedInUserEmailAdress) {
      context.data
        .deleteCourse(courseId, signedInUserEmailAdress, signedInUserPassword)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
            
          } else {
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/notfound');
        });
    }
  };

  render() {
    if (this.state) {
      const {
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId
      } = this.state.singleCourse.course;

      const { authenticatedUserId } = this.state;
      const { firstName, lastName } = this.state.singleCourse.course.User;
      return (
        <div>
          <div>
            <div className='actions--bar'>
              <div className='bounds'>
                <div className='grid-100'>
                  {/* If user is authenticated the delete and updated button will be rendered */}
                  {userId === authenticatedUserId ? (
                    <span>
                      <Link className='button' to={`/courses/${id}/update`}>
                        Update Course
                      </Link>
                      <a
                        className='button'
                        onClick={() => {
                          this.handleDelete();
                        }}
                        href='/'
                      >
                        {' '}
                        Delete Course
                      </a>
                    </span>
                  ) : (
                    <span></span>
                  )}

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
                <ReactMarkdown source={description} />
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
                    <ReactMarkdown source={materialsNeeded} />
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
