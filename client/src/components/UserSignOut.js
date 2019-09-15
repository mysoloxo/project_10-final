import React from 'react';
import { Redirect } from 'react-router-dom';
//creating signout component 
export default ({ context }) => {
  context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}
