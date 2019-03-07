import React from 'react';

export function ProtocolPage() {
  
  return (
    <div className= "uk-padding">
      <h2 className="uk-heading">The COI Beach Cleanup Protocol</h2>
      <h3>Why Pick Up Beach Trash?</h3>
      <p>
        Marine debris is one of the top three concerns for ocean health today and is only getting worse because of the 
        rapid rate at which plastic products are made. The impacts of debris in the environment are devastating, but 
        anyone can help reduce the damage by participating in or leading beach cleanups. 
      </p>
      <p>
        Beyond beach cleanups, marine debris monitoring programs are necessary to compare debris sources, amounts, 
        locations, and movement internationally. This data can be used to influence policy and provide insight into 
        where problem areas are.
      </p>
      <p>
        To combine the power of beach cleanups and marine debris monitoring, we have developed a standardized protocols
        to gather data from beach cleanups and ways to analyze the differences in debris between regions and over time.
      </p>
      <p>
        Download and read the Training Field Guide and the field form linked below to get started.
      </p>
      <a href="http://localhost:3001/pdfs/COIDataSheet_Oct_24.pdf" download>View Our Data Sheet </a>
    </div>
  );
}

export default ProtocolPage;