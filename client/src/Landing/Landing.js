import React from 'react';
import { Link } from 'react-router-dom';

import background from './beach.jpg';

// the authentication object is passed through props from App.js
// which is used to check if the user is currently logged in
// and to sign in (links in header depend on status)

export function LandingPage(props) {
  // force the page to have these styles
  const background_image = {
    backgroundImage: `url(${background})`,
    height: `100vh`,
  };
  const textButtonStyles = {
    width: `fit-content`,
    margin: `auto`,
  }

  return (
    <div className="uk-width-1-1">
      
      <div className="uk-flex uk-flex-middle uk-flex-center uk-background-cover" style={ background_image }>
        <div className="uk-heading-hero" style={{color: '#ffffff'}}>
          Welcome to the Marine Plastic Monitor.
        </div>
        <div className="uk-background-default uk-flex uk-flex-column uk-padding">
          { props.auth.isAuthenticated()
            ? null
            : (<button
                className="uk-button uk-button-primary uk-button-large uk-margin-medium-bottom"
                onClick={ props.auth.login }
              >
                Sign Up
              </button>)
          }
          <button className="uk-button uk-button-text" style={ textButtonStyles }>
            <Link className="uk-link-reset" to="/home">
              { props.auth.isAuthenticated() ? 'Continue' : 'Continue as Guest' }
            </Link>
          </button>
        </div>
      </div>
      { props.isAuth ? <div className="uk-alert-primary" style={{borderRadius:"10px",padding:"5px",display:"inline-block", height:"content",width:"content",position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)"}}>
          {props.isAuth}
          <button style={{margin:"5px"}} onClick={e=>{props.disableError()}}>OK</button>
      </div> : null } 
    </div>
  );
}

export default LandingPage;
