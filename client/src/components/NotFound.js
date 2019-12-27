import React from 'react';
import { Link } from 'react-router-dom';

//In case the route was not found (status 404) this component will be rendered.
const NotFound = () => {
  return (
    <div className='bounds'>
      <h1>Error</h1>
      <p>Sorry! The page you are looking for is not exists.</p>
      <Link className='button button-secondary' to='/'>
        Return to List
      </Link>
    </div>
  );
};

export default NotFound;
