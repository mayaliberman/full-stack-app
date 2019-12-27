import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

//Private stateless component who restricts the user to see only routes that he is authenticated to see.
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: '/signin', state: { from: props.location } }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
