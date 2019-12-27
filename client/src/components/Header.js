import React from 'react';
import { Link } from 'react-router-dom';

const  Header = (props)=> {
const {authenticatedUser} = props.context;
    return (
      <div className='header'>
        <div className='bounds'>
          <Link to='/'>
            <h1 className='header--logo'>Courses</h1>
          </Link>

          {authenticatedUser === null ? (
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
                Welcome {authenticatedUser.firstName}{' '}
                {authenticatedUser.lastName}
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

export default Header;

