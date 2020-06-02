/**
 * PageNotFound.js
 * React component for displaying page not found page, which shows up when the
 * user tries to navigate to a page that does not exist in the website.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

/**
 * Creates page not found page, which explains to user that they typed in a url
 * that doesn't lead to any page. Also contains a link to go back to the home
 * page.
 * @return JSX code to display page
 */
function PageNotFound () {
    return(
      <div className="center-parent">
        <div className="text-container uk-position-center">
          <h1><span className="error-text">404</span>: Page Not Found!</h1>
          <h3>
            Thinking outside the box is great, but not when it involves website
            urls...
          </h3>
          <h3>...click <Link to="/home">here</Link> to go back home.</h3>
        </div>

      </div>
    )
}

export default PageNotFound;
