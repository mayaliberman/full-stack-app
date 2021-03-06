import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ValidationForm from '../ValidationForm';

//This statefull component signs in the user keeping the form input inside the component state.
class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: []
  };
  //Every change of the input will update the state value;
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  //On submitting the sign in form user will be directed to the home route.
  submit = () => {
    const { context } = this.props;
   

    //If user added correct password and emailaddress he will be logged in.
    //If password and/or emailAddres are not correct an error message will be rendered.
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState(() => {
            return { errors: ['Sign-in was unsuccessful'] };
          });
        } else {
          this.props.history.push(
            new URL(new URL(window.location.href).searchParams.get('return'))
              .pathname
          );
        }
      })
      .catch(error => {
        this.props.history.push('/error');
      });
  };
  //Cancel method will direct to the home directory.
  cancel = () => {
    this.props.history.push('/');
  };
  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign In</h1>

          {/* Using a validation form component will pass the props of methods and inputs */}
          <ValidationForm
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Sign In'
            elements={() => (
              <React.Fragment>
                <input
                  id='emailAddress'
                  name='emailAddress'
                  type='text'
                  value={emailAddress}
                  onChange={this.change}
                  placeholder='Email Address'
                />
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={this.change}
                />
              </React.Fragment>
            )}
          />
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to='/signup'>Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}

export default UserSignIn;
