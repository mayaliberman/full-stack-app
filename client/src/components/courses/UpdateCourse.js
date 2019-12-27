import React, { Component } from 'react';
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
    const { context } = this.props;
    console.log(this.props.match.url);
    context.data
      .getSingleCourse(this.props.match.params.id)
      .then(singleCourse => {
        if (context.authenticatedUser.id !== singleCourse.course.userId) {
          console.log('userId of course', singleCourse.course.userId);
          this.props.history.push('/forbidden');
        } 
        
       else if(singleCourse.course.userId === null) {
 this.props.history.push('/notfound');
        }
        else {
          this.setState({
            id: this.props.match.params.id,
            title: singleCourse.course.title,
            description: singleCourse.course.description,
            estimatedTime: singleCourse.course.estimatedTime,
            materialsNeeded: singleCourse.course.materialsNeeded,
            userId: singleCourse.course.userId,
            firstName: singleCourse.course.User.firstName,
            lastName: singleCourse.course.User.lastName,
            emailAddress: singleCourse.course.User.emailAddress,
           
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/notfound');
      });

    //  if (this.state.description === '') {
    //           this.props.history.push('/notfound');
    //         }
  }
  change = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const signedId = context.authenticatedUser.id;
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

    const password = context.authenticatedUser.password;

    if (title === null && description === null) {
      this.setState({
        errors: ['Please add missing title and / or description']
      });
    } else if (userId !== signedId) {
      this.props.history.push(`/forbidden`);
    } else {
      context.data
        .updateCourse(id, emailAddress, password, course)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            this.props.history.push(`/courses/${id}`);
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }
  };
  cancel = () => {
    console.log(this.state)
    this.props.history.push(`/courses/${this.state.id}`);
  };
  render() {
    if (this.state) {
      const {
        errors,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        firstName,
        lastName
      } = this.state;
console.log(this.state)
      return (
        <div className='bounds course--detail'>
          <h1>Update course</h1>
          <ValidationForm
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Update Course'
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
