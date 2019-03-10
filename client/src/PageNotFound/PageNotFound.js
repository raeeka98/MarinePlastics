import React from 'react';

import { Link } from 'react-router-dom';

import './notFound.css';

function PageNotFound () {
    return(
      <div className="center-parent">
        <div className="text-container uk-position-center">
          <h1><span className="error-text">404</span>: Page Not Found!</h1>
          <h3>Thinking outside the box is great, but not when it involves website urls...</h3>
          <h3>...click <Link to="/home">here</Link> to go back home.</h3>
        </div>

      </div>
    )
}

export default PageNotFound;
