import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ValidationForm from '../ValidationForm';
class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: null,
    errors: []
  };
  componentDidMount() {
    const { context, courseId } = this.props;
    context.data.getSingleCourse(courseId).then(singleCourse => {
      this.setState({
        id: courseId,
        title: singleCourse.course.title,
        description: singleCourse.course.description,
        estimatedTime: singleCourse.course.estimatedTime,
        materialsNeeded: singleCourse.course.materialsNeeded,
        userId: singleCourse.course.userId,
        firstName: singleCourse.course.User.firstName,
        lastName: singleCourse.course.User.lastName,
        emailAddress: singleCourse.course.User.emailAddress
      });
    });
  }
  change = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
    console.log(this.state);
  };
  submit = () => {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      emailAddress,
      id
    } = this.state;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    console.log(course);
    const password = context.authenticatedUser.password;
    const signedUserEmailAddress = context.authenticatedUser.emailAddress;
    if (title === null && description === null) {
      this.setState({
        errors: ['Please add missing title and / or description']
      });}
     else {
      context.data
        .updateCourse(id, emailAddress, password, course)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
        //   this.props.history.push('/error');
        });
    }
  };
  cancel = () => {
    this.props.history.push('/courses' + this.state.id);
  };
  render() {
    if (this.state) {
      const {
        errors,
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId,
        firstName,
        lastName
      } = this.state;

      return (
        <div className='bounds course--detail'>
          <h1>Update course</h1>
          <ValidationForm
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Create Course'
            elements={() => (
              <React.Fragment>
                <div className='grid-66'>
                  <div className='course--header'>
                    <h4 className='course--label'>Course</h4>
                    <div>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        className='input-title course--title--input'
                        placeholder='Course title...'
                        value={title}
                        onChange={this.change}
                      />
                    </div>
                    <p>
                      By {firstName} {lastName}
                    </p>
                  </div>
                  <div className='course--description'>
                    <div>
                      <textarea
                        id='description'
                        name='description'
                        className=''
                        placeholder='Course description...'
                        value={description}
                        onChange={this.change}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className='grid-25 grid-right'>
                  <div className='course--stats'>
                    <ul className='course--stats--list'>
                      <li className='course--stats--list--item'>
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id='estimatedTime'
                            name='estimatedTime'
                            type='text'
                            className='course--time--input'
                            placeholder='Hours'
                            value={estimatedTime}
                            onChange={this.change}
                          />
                        </div>
                      </li>
                      <li className='course--stats--list--item'>
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id='materialsNeeded'
                            name='materialsNeeded'
                            className=''
                            placeholder='List materials...'
                            value={materialsNeeded}
                            onChange={this.change}
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default UpdateCourse;
