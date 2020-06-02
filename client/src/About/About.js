/**
 * About.js
 * Code for the about page of the website. Explains Marine Plastics Monitor and
 * Clean Oceans International.
 */
import React from 'react';
import bottle from './bottle.jpg';
import coi from './COI.png'

/**
 * JSX code to display the about page.
 * @return JSX code
 */
export function AboutPage() {
  return (
    <div>
      <div
        className=
        "uk-width-1-1 uk-padding-large uk-padding-remove-bottom uk-flex uk-flex-row"
      >
        <div className="uk-width-1-4">
          <img
            src={bottle}
            alt="bottle"
            className="uk-padding uk-padding-remove-right">
          </img>
        </div>
        <div
          className="uk-width-3-4 uk-padding-large uk-padding-remove-vertical">
          <div className="uk-flex uk-flex-column">
            <div>
              <h2 className="uk-text-bold">
                About the Marine Plastic Monitor
              </h2>
            </div>
            <div className="uk-flex uk-flex-column">
              <p>
                Marine debris is one of the top three concerns for ocean health
                today and is only getting worse because of the rapid rate at
                which plastic products are made. The impacts of debris in the
                environment are devastating, but anyone can help reduce the
                damage by participating in or leading beach cleanups.
              </p>
              <p>
                Beyond beach cleanups, marine debris monitoring programs are
                necessary to compare debris sources, amounts, locations, and
                movement internationally. This data can be used to influence
                policy and provide insight into where problem areas are.
              </p>
              <p>
                To combine the power of beach cleanups and marine debris
                monitoring, we have developed a standardized protocols to
                gather data from beach cleanups and ways to analyze the
                differences in debris between regions and over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="uk-width-1-1 uk-padding-large uk-flex uk-flex-middle">
        <div className= "uk-width-1-2 uk-padding uk-text-center">
          <h2 className="uk-text-bold">
            About Clean Oceans International</h2>
        </div>
        <div className= "uk-width-1-3 uk-padding">
          <img src={coi} alt="coi"></img>
        </div>
      </div>
      <div
        className="uk-width-1-1 uk-padding uk-padding-remove-vertical uk-flex">
        <div className= "uk-width-1-2 uk-padding uk-padding-remove-vertical">
          <p>Clean Oceans International (COI) is a Santa Cruz, California based
            501c3 non-profit. Our mission is to develop practical solutions to
            plastic pollution through innovation, education, and direct action.
          </p>
          <p>
            Our agenda is organized in phases to provide educated volunteers.
          </p>
          <p>
            COI’s first phase works with student volunteers conducting simple
            research of plastic pollution deposition, generating useful
            information with minimal financial outlay and creating awareness of
            plastic pollution through community networking.
          </p>
          <p>
            The second facet is independent testing of Plastic to Fuel (PTF)
            technology to convert plastic waste into diesel fuel using safe,
            clean electrical heat. This technology still has unanswered
            questions so testing is conducted through academic institutions in
            collaboration with the manufacturer, waste management
            infrastructure, area business and agricultural industry.
          </p>
          <p>
            These trials will also produce financial guidelines for profitable
            deployment of this emerging technology internationally.
          </p>
        </div>
        <div className= "uk-width-1-2 uk-padding uk-padding-remove-vertical">
          <p>
            Scalable infrastructure to profitably convert plastic into liquid
            fuel generates localized financial motivation to manage plastic
            waste as a valuable resource rather than a nuisance. Just as cash
            deposits have almost eliminated can and bottle debris, value for
            plastic scrap incentivizes plastic collection and recycling.
          </p>
          <p>
            COI’s third facet is direct action, where we apply what we have
            learned to solve a specific problem. Our expeditions page discusses
            our trips to Alaska and Hawaii and the British Virgin Islands.
          </p>
          <p>
            In 2013-16 COI staff and volunteers collected debris and talked
            trash in Hawaii, Alaska, Brazil, British Virgin Islands, Oregon ands
            California.
          </p>
          <p>
            These tests and trials are an important prelude to deploying a
            vessel to collect and process floating plastic in site. In time
            that will become a practical extension of this research and we will
            have the resources to do that effectively and efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
