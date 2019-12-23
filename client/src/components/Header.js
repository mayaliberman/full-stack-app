import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    // const firstName = this.props.context.authenticatedUser.firstName;
    // const lastName = this.props.context.authenticatedUser.lastName;
    // console.log(firstName, lastName);

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
              <Link className='signin' to='/signin'>
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
// }

// return (
// <div className='header'>
//     <div className='bounds'>
//     <h1 className='header--logo'>Courses</h1>

//     {firstName === null && lastName === null ? (
//         <nav>
//         <Link className='signup' to='/signup'>
//             Sign Up
//         </Link>
//         <Link className='signin' href='/signin'>
//             Sign In
//         </Link>
//         </nav>
//     ) : (
//         <nav>
//         <span>
//             Welcome {firstName} {lastName}
//         </span>
//         <Link className='signout' to='/'>
//             Sign Out
//         </Link>
//         </nav>
//     )}
//     </div>
// </div>
// );
// }
