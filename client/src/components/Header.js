import React from 'react';
import { Link } from 'react-router-dom';

//header of the application with user sign in and sign up.
const Header = props => {
  const { authenticatedUser } = props.context;
  return (
    <div className='header'>
      <div className='bounds'>
        <Link to='/'>
          <h1 className='header--logo'>Courses</h1>
        </Link>
        {/* When logged to the application the header is updated with the user name. 
When logged out the option of log in and sign up is rendered */}
        {authenticatedUser === null ? (
          <nav>
            <Link className='signup' to='/signup'>
              Sign Up
            </Link>
            <Link className='signin' to={`/signin?return=${encodeURIComponent(window.location.href)}`}>
              Sign In
            </Link>
          </nav>
        ) : (
          <nav>
            <span>
              Welcome {authenticatedUser.firstName} {authenticatedUser.lastName}
            </span>
            <Link className='signout' to='/signout'>
              Sign Out
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
