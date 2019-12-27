import React from 'react';
import { Redirect } from 'react-router-dom';

//This stateless component logs the user out from the application.

const UserSignOut = ({ context }) => {
  context.actions.signOut();
  return <Redirect to='/' />;
};

export default UserSignOut;
