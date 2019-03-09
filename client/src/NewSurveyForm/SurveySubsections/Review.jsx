import React, { Component } from 'react';

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
            <p>Clean Up Start Time: {d.cleanUpTime}</p>
        </div>
      </div>
    );
  }
}

export default Review
