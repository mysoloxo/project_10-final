import React from 'react';
import { Link } from 'react-router-dom';
//creating the Authenticated component from context
export default ({ context }) => {
  const authUser = context.authenticatedUser.user;

  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>Congrants {authUser.firstName}, your account has been created!</h1>
      <p>Your Awesome Username is {authUser.emailAddress}</p>
      <Link to="/" className="button button-secondary">Return to Courses</Link>
    </div>
  </div>
  );
}