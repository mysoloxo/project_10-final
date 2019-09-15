import React from 'react';
import { Link } from 'react-router-dom';
//creating the unhandlederror component when the server returns a 500 response
export default () => (
  <div className="bounds">
    <h1>Oops the server is messing up</h1>
     <p>Sorry, an unexpected error occurred.</p>
      <p><img src="https://media.giphy.com/media/l4FsIC6XXeS0wGIBG/giphy.gif" alt = "gif"/></p>
    <Link to="/" className="button button-secondary">Return to Courses</Link>
  </div>
);