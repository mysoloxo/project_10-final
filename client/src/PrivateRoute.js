import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './components/Context';
//creating privateroute component to make setting routes only accessable to authenticated users 
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          { ...rest }
          render={ props => context.authenticatedUser ? (
                <Component { ...props } />
            ) : (
                <Redirect to={ {
                    pathname: '/signin', 
                    state: { from: props.location }
                } } />
            )
          }
        />
      )}
    </Consumer>
  );
};