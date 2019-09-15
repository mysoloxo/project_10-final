import React from 'react';
import { Link } from 'react-router-dom';
//creating the Forbidden component to be rendered when a user end up on an unauthorized route 
export default () => (
  <div className="bounds">
    <h1>Access Denied</h1>
    <p>Sorry, you are not authorized to visit this page.</p>
    <Link to="/" className="button button-secondary">Return to Courses</Link>
  </div>
);