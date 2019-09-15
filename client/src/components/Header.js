import React from 'react';
import { Link } from 'react-router-dom';

export default ({ context }) => {

  let authUser = context.authenticatedUser;

  if (authUser) {
    authUser = context.authenticatedUser.user;
  }

  return (
    //returning the header container
      <div className="header">
        <div className="bounds">
          <Link to="/"><h1 className="header--logo">Courses</h1></Link>
          <nav>
              {authUser ?
                    <React.Fragment>
                        <span>Welcome, {authUser.firstName} {authUser.lastName}</span>
                        <Link to="/signout">Sign Out</Link>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <Link className="signup" to="/signup">Sign Up</Link>
                        <Link className="signin" to="/signin">Sign In</Link>
                    </React.Fragment>
              }
          </nav>
        </div>
      </div>
  );
}