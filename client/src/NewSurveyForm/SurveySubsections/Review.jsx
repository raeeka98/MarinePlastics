import React, { Component } from 'react';
import RibScanRowReview from '../TableRows/ReviewTable';
import ASRowReview from '../TableRows/ASRowReview';
import { getDebrisNameById } from '../debrisInfo';
import {getDebrisMap} from '../debrisInfo';

const debrisInfo = getDebrisMap();

class Review extends Component {

  componentDidMount() {
      this.calculateFields();
  }

  calculateFields() {

  }

  render() {
    var SRSRows = [];
    var ASRows = [];
    // Parse the row info that we got from the data
    var parsedRows = {};
    /* parsedRows
      {
        cigaretteButts : {
          fresh : [1, 2, 3, 4],
          weathered : [5, 6, 7, 8]
        },
        ...
      }
    */
    var index = 0;
    for(const key in this.props.SRSData) {
      let parsedKey = key.split('__')[0];
      let ribRow = parseInt(key.split('__')[2]) - 1;
      if(index >= 0 && index < 4) {
        // If we're looking at the fresh debris
        if(index === 0)
          parsedRows[parsedKey] = {fresh : [], weathered : []};
        parsedRows[parsedKey].fresh.push(this.props.SRSData[key]); 
      } else {
        parsedRows[parsedKey].weathered.push(this.props.SRSData[key]);
      }
      index = ++index % 8;
    }

    // Now take the parsed data and then create row objects for each 
    for (const key in parsedRows) {
      SRSRows.push(
        <RibScanRowReview 
          id = {key}
          key = {key}
          name = {debrisInfo[key]}
          fresh = {parsedRows[key].fresh}
          weathered = {parsedRows[key].weathered}
        />
      )
    }
    console.log(this.props.ASData);
    // Now we do a similar thing for the As Data
    parsedRows = {};
    index = 0;
    for(const key in this.props.ASData) {
      let parsedKey = key.split('__')[0];
      let freshWeath = key.split('__')[1];
      if(!parsedRows[parsedKey]) 
        parsedRows[parsedKey] = {};
      
      parsedRows[parsedKey][freshWeath] = this.props.ASData[key];
    }

    // Render the rows
    console.log(parsedRows);
    for (const key in parsedRows){
      ASRows.push(
        <ASRowReview
          id={key}
          key={key}
          name = {debrisInfo[key]}
          fresh = {parsedRows[key].fresh}
          weathered={parsedRows[key].weathered}
        />
      )
    }

    const d = this.props.data;
    const s = this.props.displayStrings;
    
    return(
      <div className="uk-background-muted uk-padding">
        <div className="uk-card uk-card-default uk-card-body uk-card-hover">
            <h3 className="uk-card-title">Team Information:</h3>
            <p>Name: <b>{d.userFirst} {d.userLast}</b></p>
            <p>Organization Name: <b>{d.orgName}</b></p>
            <p>Organization Location: <b>{d.orgLoc}</b></p>
            <p>Email Address: <b>{d.email}</b></p>
            <p>Clean Up Date: <b>{d.cleanUpDate}</b></p>
            <p>Clean Up Start Time: <b>{d.cleanUpTime}</b></p>
        </div>

        <br></br>

        <div className="uk-card uk-card-default uk-card-body uk-card-hover">
            <h3 className="uk-card-title">Survey Area:</h3>

            <p>Beach Name: {d.beachName}</p>
            <p>Beach Coordinates: {d.latitude} (lat), {d.longitude} (lon)</p>
            {s.usage.length > 0 &&
              <p>Major Usage: {s.usage}</p>
            }
            {s.locChoice.length > 0 &&
              <p>Reason for Location Choice: {s.locChoice}</p>
            }
            {d.compassDegrees &&
              <p>Compass Direction: {d.compassDegrees}<span>&#176;</span></p>
            }
            {d.riverName &&
              <p>Nearest River Output Name: {d.riverName}</p>
            }
            {d.riverDistance &&
              <p>Nearest River Output Distance: {d.riverDistance}</p>
            }

            {d.tideTypeB && d.tideTimeB && d.tideHeightB &&
              <div>
                <h4>Tide Before:</h4>
                <p>Type: {d.tideTypeB} </p>
                <p>Height: {d.tideHeightB}</p>
                <p>Time: {d.tideTimeB}</p>
              </div>
            }
            {d.tideTypeA && d.tideTimeA && d.tideHeightA &&
              <div>
                <h5>Tide After:</h5>
                <p>{d.tideTypeA} tide of {d.tideTypeA} ft at{d.tideTimeA}</p>
              </div>
            }
            {d.windSpeed &&
              <p>Wind Speed: {d.windSpeed} knots</p>
            }
            {d.windDir &&
              <p>Wind Direction: {d.windDir}</p>
            }
            {d.slope &&
              <p>Slope: {d.slope}</p>
            }
            {s.subType.length > 0 &&
              <p>Substrate Type: {s.subType}</p>
            }
        </div>

        <br></br>

        <div className="uk-card uk-card-default uk-card-body uk-card-hover">
              <h2>Surface Rib Scan</h2>
              <table className='uk-table uk-table-striped'>
                <thead>  
                  <tr>
                    <th>Range</th>
                    <th>Rib #1</th>
                    <th>Rib #2</th>
                    <th>Rib #3</th>
                    <th>Rib #4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rib Start</td>
                    <td>{d.rib1Start}</td>
                    <td>{d.rib2Start}</td>
                    <td>{d.rib3Start}</td>
                    <td>{d.rib4Start}</td>
                  </tr>
                  <tr>
                    <td>Rib End</td>
                    <td>{d.rib1End}</td>
                    <td>{d.rib2End}</td>
                    <td>{d.rib3End}</td>
                    <td>{d.rib4End}</td>
                  </tr>
                </tbody>
              </table>
              <table className='uk-table uk-table-striped'>
                <thead>
                  <tr>
                    <th>Debris Type</th>
                    <th>Rib #1 Fresh</th>
                    <th>Rib #1 Weathered</th>
                    <th>Rib #2 Fresh</th>
                    <th>Rib #2 Weathered</th>
                    <th>Rib #3 Fresh</th>
                    <th>Rib #3 Weathered</th>
                    <th>Rib #4 Fresh</th>
                    <th>Rib #4 Weathered</th>
                  </tr>
                </thead>
                <tbody>
                  {SRSRows}
                </tbody>
              </table>


            </div>

        <br></br>

        <div className="uk-card uk-card-default uk-card-body uk-card-hover">
            <h3 className="uk-card-title">Accumulation Survey:</h3>
            <table className='uk-table uk-table-striped'>
                <thead>  
                  <tr>
                    <th>Debris Type</th>
                    <th>Fresh</th>
                    <th>Weathered</th>
                  </tr>
                </thead>
                <tbody>
                  {ASRows}
                </tbody>
              </table>
        </div>

        <br></br>

        <div className="uk-card uk-card-default uk-card-body uk-card-hover">
            <h3 className="uk-card-title">Micro Debris Survey:</h3>
        </div>

        <br></br>

        <div className="uk-card uk-card-default uk-card-body uk-card-hover">
            <h3 className="uk-card-title">Total Weight:</h3>

            {d.weight ?
              (<p><b>{d.weight}</b></p>) :
              (<p>No weight inputted</p>)
            }
        </div>

      </div>
    );
  }
}

export default Review
