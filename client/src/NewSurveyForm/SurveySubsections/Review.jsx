import React, { Component } from 'react';

class Review extends Component {

  componentDidMount() {
      this.calculateFields();
  }

  calculateFields() {

  }

  render() {
    let d = this.props.data;
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
            <p>Beach Coordinates: {d.latitude}, {d.longitude}</p>
            <p>Major Usage: {d.orgLoc}</p>
            <p>Email Address: {d.email}</p>
            <p>Clean Up Date: {d.cleanUpDate}</p>
            <p>Clean Up Start Time: {d.cleanUpTime}</p>
        </div>
      </div>
    );
  }
}

export default Review
