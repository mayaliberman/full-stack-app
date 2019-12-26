import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    
    return (
      <div className='header'>
        <div className='bounds'>
          <Link to='/'>
            <h1 className='header--logo'>Courses</h1>
          </Link>

          {this.props.context.authenticatedUser === null ? (
            <nav>
              <Link className='signup' to='/signup'>
                Sign Up
              </Link>
              <Link
                className='signin'
                to='/signin' 
              >
                Sign In
              </Link>
            </nav>
          ) : (
            <nav>
              <span>
                Welcome {this.props.context.authenticatedUser.firstName}{' '}
                {this.props.context.authenticatedUser.lastName}
              </span>
              <Link className='signout' to='/signout'>
                Sign Out
              </Link>
            </nav>
          )}
        </div>
      </div>
    );
  }
}

export default Header;

