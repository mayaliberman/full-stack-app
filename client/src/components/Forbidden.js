import React from 'react';
import { Link } from 'react-router-dom';

//This component will be render when status 403 will be active.
const Forbidden = () => {
  return (
    <div className='bounds'>
      <h1>Unauthorized Page Request</h1>
      <p>Sorry! You can not access the requested page.</p>
      <Link className='button button-secondary' to='/'>
        Return to List
      </Link>
    </div>
  );
};

export default Forbidden;
