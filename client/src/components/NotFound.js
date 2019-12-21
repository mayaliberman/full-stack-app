import React from 'react';

const NotFound = () => {
    return (
      <div className='bounds'>
        <h1>Error</h1>
        <p>Sorry! We just encountered an unexpected error.</p>
        <a className='button button-secondary' href='/'>
          Return to List
        </a>
      </div>
    );
}

export default NotFound;