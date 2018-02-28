import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => (
    <nav className="uk-navbar uk-navbar-container uk-navbar-transparent uk-margin-bottom-small">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-logo">
            {/* <Link to="/" > */}
              <h1 className="uk-text-large uk-margin-remove-bottom">
                Marine Plastics Monitor
              </h1>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link to="/landing">Landing</Link> */}
          </li>
          <li>
            {/* <Link to="/test">Test Page</Link> */}
          </li>
          {/* <li><Link to="/protocol">Protocol</Link></li> */}
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
        </ul>
      </div>
    </nav>
)

export default Header

// { props.auth.isAuthenticated()
//     ? <a onClick={props.auth.logout} className="uk-button uk-button-primary">Log Out</a>
//     : <a onClick={props.auth.login} className="uk-button uk-button-primary">Log In</a>
//   }