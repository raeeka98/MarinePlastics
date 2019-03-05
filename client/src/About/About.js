import React from 'react';
import background from './bottle.jpg';
import coi from './COI.png';

export function AboutPage() {

  const background_image = {
    backgroundImage: `url(${background})`,
    height: `80vh`,
  };

  const COI_image = {
    backgroundImage: `url(${coi})`,
  };


  return (
    <div className="uk-width-1-1 uk-flex uk-flex-row">

    <div className="uk-width-1-3 uk-background uk-background-cover" style={ background_image}>
    </div>

    <div className="uk-width-2-3 uk-padding-large info">

      <div className="uk-flex uk-flex-middle uk-flex-column">
        
      <div className="uk-flex uk-flex-middle uk-flex-column" style={COI_image}>
      </div>

        <div id="header-text">
          <h2>About the Marine Plastic Monitor.</h2>
        </div>
        
        <div className="uk-flex uk-flex-column intro-text">
          <p>Marine debris is one of the top three concerns for ocean health today and is only getting worse because of the rapid rate at which plastic products are made. The impacts of debris in the environment are devastating, but anyone can help reduce the damage by participating in or leading beach cleanups.</p>
          <p>Beyond beach cleanups, marine debris monitoring programs are necessary to compare debris sources, amounts, locations, and movement internationally. This data can be used to influence policy and provide insight into where problem areas are.</p>
          <p>To combine the power of beach cleanups and marine debris monitoring, we have developed a standardized protocols to gather data from beach cleanups and ways to analyze the differences in debris between regions and over time.</p>
        </div>

        <div className="uk-flex uk-flex-column">

        </div>

      </div>
      
    </div>
    </div>
  );
}

export default AboutPage;
