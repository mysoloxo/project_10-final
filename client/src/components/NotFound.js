import React from 'react';
import { Link } from 'react-router-dom';
//returning the notfound component 
export default () => (
  <div className="bounds">
    <h1>Ooops</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>
    <p><iframe src="https://giphy.com/embed/14uQ3cOFteDaU" alt = "gif" width="480" height="360" frameBorder="0" className="giphy-embed" title="404" allowFullScreen>404</iframe></p>
    {/* <p><a href="https://giphy.com/gifs/404-14uQ3cOFteDaU"></a></p> */}

    <Link to="/" className="button button-secondary">Return to Courses</Link>
    
  </div>
);
