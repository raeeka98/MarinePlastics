import React, { Component } from 'react';

import { getDebrisNameById } from '../debrisInfo';

class Review extends Component {

  componentDidMount() {
      this.calculateFields();
  }

  calculateFields() {

  }

  render() {
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

            <p>Beach Name: {d.name}</p>
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
            <h3 className="uk-card-title">Surface Rib Scan:</h3>
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
            <h3 className="uk-card-title">Accumulation Survey:</h3>
        </div>

        <br></br>

        <div className="uk-card uk-card-default uk-card-body uk-card-hover">
            <h3 className="uk-card-title">Total Weight:</h3>

            {d.weight ?
              (<p><b>d.weight</b></p>) :
              (<p>No weight inputted</p>)
            }
        </div>

      </div>
    );
  }
}

export default Review
