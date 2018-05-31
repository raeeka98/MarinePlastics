import React from 'react';

export function ProtocolPage() {
  
  return (
    <div>
      <h2 className="uk-heading-primary">The COI Beach Cleanup Protocol</h2>
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
      <h3>Types of Surveys</h3>
      <p>
        The individual factors (i.e. number of people, time) determine which kind of survey is best for a cleanup. 
        There are three main types of surveys: basic, surface rib scan, and accumulation sweep.
      </p>
      <h4 className="uk-heading-bullet">Basic Survey</h4>
      <p>
        The most simple procedure, only requires recording the number of people at the cleanup and the number of pounds 
        of trash collected.
      </p>
      <h4 className="uk-heading-bullet">Surface Rib Scan Survey</h4>
      <p>
        The goal of a surface rib scan is to collect a small sample of the debris on the beach to quickly assess the amount
        and density of debris on the beach.
      </p>
      <h5>Procedure</h5>
      <ol>
        <li>
          Break up 100m of shoreline into 20 5m segments marked with flags and number each of them 1 to 20. 
          Each segment should run from the water’s edge to the back of the shoreline. The back of the shoreline is where the 
          primary substrate (i.e. sand) changes (i.e. sand becomes gravel) or at the first barrier (i.e. vegetation line). 
          It is best to do the cleanup during low tide.
        </li>
        <li>
          Select four random numbers, this can be done with a random number table or with a phone. These four numbers correspond 
          to the 5m segments on the beach and are called transect ID numbers. On any sampling day, 20m out of the 100m of 
          shoreline is cleaned up and analyzed.
        </li>
        <li>
          Record the GPS coordinates for the beach in decimal degree format. 
        </li>
        <li>
          Walking each transect from water’s edge back to the shoreline, record on the Beach Cleanup sheet counts for debris 
          that measures over 2.5cm or 1in. Record any microplastics in the microplastics section of the sheet.
        </li>
      </ol>
      <h4 className="uk-heading-bullet">Accumulation Sweep Survey</h4>
      <p>
        The goal of an accumulation sweep is to collect all the debris from a beach and the data can be used to calculate 
        the rate debris is deposited.
      </p>
      <h5>Procedure</h5>
      <ol>
        <li>
          Measure out 100m of shoreline that goes from the water’s edge to the back of the shoreline. The back of the 
          shoreline is where the primary substrate (i.e. sand) changes (i.e. sand becomes gravel) or at the first barrier 
          (i.e. vegetation line). It is best to do the cleanup during low tide.
        </li>
        <li>
          After deciding the survey area:
          <ul>
            <li>
              If also completing a Surface Rib Scan, do that first. Then record and pick up the debris on the other 80% of the area.
            </li>
            <li>
              If not completing a Surface Rib Scan, decide to traverse either parallel or perpendicular to the water. 
              Surveyors should traverse the area until the entire site is cleaned of debris and the data recorded.
            </li>
          </ul>
        </li>
        <li>
          Record the GPS coordinates for the beach in decimal degree format. 
        </li>
        <li>
          Record data on the Accumulation Sweep section of the Beach Cleanup Sheet that measure over 2.5cm or 1in. Record any 
          microplastics in the microplastics section.
        </li>
      </ol>
    </div>
  );
}

export default ProtocolPage;
