/**
 * Protocol.js
 * Code for the protocol page. Explains the importance of the project and why
 * it is important to follow the protocol found in the link to the shoreline
 * plastic monitoring field guide. Also has a link to the most current data
 * sheet to conduct a survey.
 */
import React from 'react';
import coi from './COI.png';
import pdf_paths from './pdf_names.json';

/**
 * Creates protocol page.
 * @return JSX code for protocol page
 */
export function ProtocolPage() {
  return (
    <div className= "uk-padding uk-padding-remove-vertical">
      <div className= "uk-width-1-1 uk-flex uk-flex-middle">
        <div className= "uk-width-3-4 uk-text-bottom uk-flex">
          <h2 className= "uk-text-bold">The COI Beach Cleanup Protocol</h2>
        </div>
        <div className="uk-width-1-4">
          <img src={coi} alt="coi" className=""></img>
        </div>
      </div>
      <div>
        <h3>Why Pick Up Beach Trash?</h3>
        <p>
          Marine debris is one of the top three concerns for ocean health today
          and is only getting worse because of the rapid rate at which plastic
          products are made. The impacts of debris in the environment are
          devastating, but anyone can help reduce the damage by participating
          in or leading beach cleanups.
        </p>
        <p>
          Beyond beach cleanups, marine debris monitoring programs are
          necessary to compare debris sources, amounts, locations, and movement
          internationally. This data can be used to influence policy and
          provide insight into where problem areas are.
        </p>
        <p>
          To combine the power of beach cleanups and marine debris monitoring,
          we have developed a standardized protocols to gather data from beach
          cleanups and ways to analyze the differences in debris between
          regions and over time.
        </p>
        <p>
          Download and read the Training Field Guide and the field form linked
          below to get started.
        </p>
        <a href={`/pdfs/${pdf_paths.training_field_guide}`} download>
          View Our Training Field Guide
        </a>
        <br/>
        <a href={`/pdfs/${pdf_paths.data_sheet}`} download>View Our Data Sheet</a>
      </div>
    </div>
    );
}

export default ProtocolPage;
