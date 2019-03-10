import React, { Component } from 'react';
import RibScanRowReview from '../TableRows/ReviewTable';

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
    console.log(this.props.SRSData);
    var SRSRows = [];
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

      if(index % 8 >= 0 && index % 8 < 4) {
        // If we're looking at the fresh debris
        if(index % 8 === 0)
          parsedRows[parsedKey] = {fresh : [], weathered : []};
        parsedRows[parsedKey].fresh.push(this.props.SRSData[key]); 
      } else {
        parsedRows[parsedKey].weathered.push(this.props.SRSData[key]);
      }
      index ++;
    }

    // Now take the parsed data and then create row objects for each 
    console.log(parsedRows);
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
                <tbody>
                  {SRSRows}
                </tbody>
              </table>
              {/*<div className="accordion__arrow" role="presentation" />
                  <div className="uk-grid uk-child-width-1-5">
                    <div></div>
                    <div><h4>Rib #1</h4></div>
                    <div><h4>Rib #2</h4></div>
                    <div><h4>Rib #3</h4></div>
                    <div><h4>Rib #4</h4></div>
                  </div>

                  <div className="uk-grid uk-child-width-1-5">
                    <div><h5>Rib Start Point(m)</h5></div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #1 Start'
                        id='rib1Start'
                        className='uk-input uk-margin'
                        onChange={this.props.updateSurveyState}
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #2 Start'
                        id='rib2Start'
                        className='uk-input uk-margin'
                        onChange={this.props.updateSurveyState}
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #3 Start'
                        id='rib3Start'
                        className='uk-input uk-margin'
                        onChange={this.props.updateSurveyState}
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #4 Start'
                        id='rib4Start'
                        className='uk-input uk-margin'
                        onChange={this.props.updateSurveyState}
                        />
                    </div>
                  </div>

                  <div className="uk-grid uk-child-width-1-5">
                    <div><h5>Rib End Point(m)</h5></div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #1 End'
                        id='rib1End'
                        className='uk-input uk-margin'
                        onChange={this.props.updateSurveyState}
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #2 End'
                        id='rib2End'
                        className='uk-input uk-margin'
                        onChange={this.props.updateSurveyState}
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #3 End'
                        id='rib3End'
                        className='uk-input uk-margin'
                        onChange={this.props.updateSurveyState}
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #4 End'
                        id='rib4End'
                        className='uk-input uk-margin'
                        onChange={this.props.updateSurveyState}
                        />
                    </div>
                  </div>

                  <hr></hr>

                  <div className="uk-grid data-uk-sticky">
                      <div className="uk-width-1-5"></div>
                      <div className="uk-width-1-5">
                          <div className="uk-grid">
                            <div className="uk-width-1-2">
                                <center><label>Rib #1 Fresh</label></center>
                            </div>
                            <div className="uk-width-1-2">
                                <center><label>Rib #1 Weathered</label></center>
                            </div>
                          </div>
                      </div>
                      <div className="uk-width-1-5">
                          <div className="uk-grid">
                            <div className="uk-width-1-2">
                                <center><label>Rib #2 Fresh</label></center>
                            </div>
                            <div className="uk-width-1-2">
                                <center><label>Rib #2 Weathered</label></center>
                            </div>
                          </div>
                      </div>
                      <div className="uk-width-1-5">
                          <div className="uk-grid">
                            <div className="uk-width-1-2">
                                <center><label>Rib #3 Fresh</label></center>
                            </div>
                            <div className="uk-width-1-2">
                                <center><label>Rib #3 Weathered</label></center>
                            </div>
                          </div>
                      </div>
                      <div className="uk-width-1-5">
                          <div className="uk-grid">
                            <div className="uk-width-1-2">
                                <center><label>Rib #4 Fresh</label></center>
                            </div>
                            <div className="uk-width-1-2">
                                <center><label>Rib #4 Weathered</label></center>
                            </div>
                          </div>
                      </div>
          </div>*/}

            </div>

        <br></br>

        <div className="uk-card uk-card-default uk-card-body uk-card-hover">
            <h3 className="uk-card-title">Accumulation Survey:</h3>
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
