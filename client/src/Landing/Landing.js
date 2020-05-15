import React from 'react';
import { Link } from 'react-router-dom';

import background from './beach-edit.jpg';
import './landing.css'

// the authentication object is passed through props from App.js
// which is used to check if the user is currently logged in
// and to sign in (links in header depend on status)

export function LandingPage(props) {
  // force the page to have these styles
  const background_image = {
    backgroundImage: `url(${background})`,
    height: `100vh`
  };

  return (
    <div className="uk-width-1-1 uk-flex uk-flex-row">

      <div className="uk-width-1-3 uk-background uk-background-cover" style={ background_image}>
        {/* picture */}
      </div>

      <div className="uk-width-2-3 uk-padding-large info">
        {/*sign up*/}

        <div className="uk-flex uk-flex-middle uk-flex-column">

          <div id="header-text">
            Welcome to the Marine Plastics Monitor!
          </div>

          <div className="uk-flex uk-flex-column intro-text">
            <p>Marine debris is one of the top three concerns for ocean health today and is only getting worse because of the rapid rate at which plastic products are made. The impacts of debris in the environment are devastating, but anyone can help reduce the damage by participating in or leading beach cleanups.</p>
            <p>Beyond beach cleanups, marine debris monitoring programs are necessary to compare debris sources, amounts, locations, and movement internationally. This data can be used to influence policy and provide insight into where problem areas are.</p>
            <p>To combine the power of beach cleanups and marine debris monitoring, we have developed a standardized protocols to gather data from beach cleanups and ways to analyze the differences in debris between regions and over time.</p>
          </div>

          <div className="uk-flex uk-flex-column uk-padding">
            { props.auth.isAuthenticated()
              ? null
              : (<button
                  className="uk-button uk-button-primary uk-button-large sign-up-button"
                  onClick={ props.auth.login }
                >
                  Sign Up
                </button>)
            }
              <Link className="uk-button uk-button-default uk-button-large guest-button" to="/home">
                { props.auth.isAuthenticated() ? 'Continue' : 'Continue as Guest' }
              </Link>
          </div>

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
