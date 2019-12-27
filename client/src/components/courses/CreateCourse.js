import React, { Component } from 'react';
import ValidationForm from '../ValidationForm';

//This component creates a new course if the user is authenticated.
class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  };

  //This method tracks the change of the input and update the state.
  change = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };
  //On submitting the course it will update the state
  submit = () => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const userId = context.authenticatedUser.id;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    //If there is no title and description an error will be rendered.
    if (title === null && description === null) {
      this.setState({
        errors: ['Please add missing title and/or description']
      });
    } else {
      //In case all the course details are correct, it will ensure the user is authenticated and create the course.
      context.data
        .createCourse(course, emailAddress, password)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }
  };

  //In case of canceling the action user will be directed to the home route.
  cancel = () => {
    this.props.history.push('/');
  };
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
    const user = this.props.context.authenticatedUser;

    return (
      <div className='bounds course--detail'>
        <h1>Create Course</h1>

        {/* Updating a form inputs and buttons props using the ValidationForm component */}
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
                    By {user.firstName} {user.lastName}
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
  }
}

export default CreateCourse;
