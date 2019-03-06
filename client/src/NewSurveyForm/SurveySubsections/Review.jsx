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
      <div>
        <div className="uk-card uk-card-default uk-card-small uk-card-body">
            <h4 className="uk-card-title">Team Information:</h4>
            <p>Name: {d.name}</p>
            <p>Organization Name: {d.orgName}</p>
            <p>Organization Location: {d.orgLoc}</p>
            <p>Email Address: {d.email}</p>
            <p>Clean Up Date: {d.cleanUpDate}</p>
            <p>Clean Up Start Time: {d.cleanUpTime}</p>
        </div>

        <div className="uk-card uk-card-default uk-card-small uk-card-body">
            <h4 className="uk-card-title">Survey Area:</h4>
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


            <p>Clean Up Start Time: {d.cleanUpTime}</p>
        </div>
      </div>
    );
  }
}

export default Review
