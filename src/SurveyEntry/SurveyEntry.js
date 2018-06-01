import React, { Component } from 'react';
import Auth from '../Auth';
import axios from 'axios';

import SurveyTableRow from './SurveyTableRow';

class SurveyEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: {} };
    this.getComment = this.getComment.bind(this);
    this.auth = new Auth();
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
  }

  getComment() {
    // get the id of the comment by splitting the current path (which is stored in the props) by '/'
    let splitURL = (this.props.location.pathname).split('/');
    // the id is the last part of the path, so pop the last element of the splitURL array
    let entryID = splitURL.pop();
    // call DB to get entry with the same id
    axios.get(`${this.url}/${entryID}`)
    .then(res => {
      this.setState({ comment: res.data.comment });
    })
    .catch(err => {
      console.log(err);
    });
  }

  // once the component is on the page, gets the comment from the server
  componentDidMount() {
    this.getComment();
  }

  render() {
    // initializes to null because when component mounts, there is no data yet
    let SRSRows = null;
    let ASRows = null;

    // if there is data (which is once the component mounts)
    if (this.state.comment.SRSData) {
      // for every type of trash, return a surveyTableRow component with the data
      SRSRows = this.state.comment.SRSData.map((type, i) => {
        return(
          <SurveyTableRow
            key={type._id}
            name={type.name}
            fresh={type.fresh}
            weathered={type.weathered}
          />
        );
      });

      ASRows = this.state.comment.ASData.map((type, i) => {
        return(
          <SurveyTableRow
            key={type._id}
            name={type.name}
            fresh={type.fresh}
            weathered={type.weathered}
          />
        );
      });

      document.getElementById('SRS-section').style.display = this.state.comment.SRSData.length > 0 ? 'block' : 'none';
      document.getElementById('AS-section').style.display = this.state.comment.ASData.length > 0 ? 'block' : 'none';
    }

    if (this.state.comment.weight || this.state.comment.NumberOfPeople) {
      document.getElementById('b-cleanup-section').style.display = 'block';
    }

    if (
      this.state.comment.lat || this.state.comment.lon ||
      this.state.comment.reason || this.state.comment.st ||
      this.state.comment.slope || this.state.comment.aspect ||
      this.state.comment.majorUse || this.state.comment.lastTide ||
      this.state.comment.nextTide || this.state.comment.nroDist ||
      this.state.comment.nroName || this.state.comment.windDir
    ) {
      document.getElementById('survey-area-section').style.display = 'block';
    }

    if (this.state.comment.lastTide || this.state.comment.nextTide) {
      document.getElementById('tide-section').style.display = 'block';
    }

    return (
      <div>
        <h2 className="uk-text-primary uk-heading-primary">
          { this.state.comment.beach }
          <span className="uk-text-muted uk-text-large uk-margin-left">
            { this.state.comment.date }
          </span>
        </h2>
        <div className="uk-grid uk-grid-large uk-grid-match uk-child-width-1-2">
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Team Information</h3>
              <p><strong>Team Leader:</strong> { this.state.comment.user }</p>
              <p><strong>Organization:</strong> { this.state.comment.org }</p>
              <p><strong>Email:</strong> { this.state.comment.email }</p>
            </div>
          </div>
          <div id="survey-area-section" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Area</h3>
              {
                this.state.comment.lat && this.state.comment.lon ?
                <p><strong>GPS Coordinates:</strong> { this.state.comment.lat }, { this.state.comment.lon }</p> : null
              }
              {
                this.state.comment.reason ?
                <p><strong>Reason for Location Choice:</strong> { this.state.comment.reason }</p> : null
              }
              {
                this.state.comment.majorUse ?
                <p><strong>Major Use:</strong> { this.state.comment.majorUse }</p> : null
              }
              {
                this.state.comment.st ?
                <p><strong>Substrate Type:</strong> { this.state.comment.st }</p> : null
              }
              {
                this.state.comment.slope ?
                <p><strong>Beach Slope:</strong> { this.state.comment.slope }</p> : null
              }
              {
                this.state.comment.aspect ?
                <p><strong>Beach Aspect:</strong> { this.state.comment.aspect }</p> : null
              }
              {
                this.state.comment.windDir ?
                <p><strong>Wind Direction:</strong> { this.state.comment.windDir }</p> : null
              }
              {
                this.state.comment.nroName ?
                <p><strong>Nearest River:</strong> { this.state.comment.nroName }</p> : null
              }
              {
                this.state.comment.nroDist ?
                <p><strong>Distance to Nearest River:</strong> { this.state.comment.nroDist }m</p> : null
              }
            </div>
          </div>
          <div id="b-cleanup-section" className="uk-grid-margin uk-margin-bottom" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Basic Clean Up</h3>
              {
                this.state.comment.NumberOfPeople ?
                <p><strong>Number of People:</strong> { this.state.comment.NumberOfPeople }</p> : null
              }
              {
                this.state.comment.weight ?
                <p><strong>Total Weight:</strong> { this.state.comment.weight }</p> : null
              }
            </div>
          </div>
          <div id="tide-section" className="uk-grid-margin uk-margin-bottom" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Tide Information</h3>
              <h4>The Last Tide</h4>
              <div>
                {
                  this.state.comment.lastTide ?
                  (<div>
                    <p><strong>Type:</strong> { this.state.comment.lastTide.type }</p> 
                    <p><strong>Time:</strong> { this.state.comment.lastTide.time }</p>
                    <p><strong>Height:</strong> { this.state.comment.lastTide.height }</p>
                  </div>): null
                }
              </div>
              <h4>The Next Tide</h4>
              <div>
                {
                  this.state.comment.nextTide ?
                  (<div>
                    <p><strong>Type:</strong> { this.state.comment.nextTide.type }</p> 
                    <p><strong>Time:</strong> { this.state.comment.nextTide.time }</p>
                    <p><strong>Height:</strong> { this.state.comment.nextTide.height }</p>
                  </div>): null
                }
              </div>
            </div>
          </div>
        </div>
        <div id="SRS-section" style={{ display: 'none' }}>
          <h3>Surface Rib Scan Survey</h3>
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Debris Type</th>
                <th>Amount Fresh</th>
                <th>Amount Weathered</th>
              </tr>
            </thead>
            <tbody>
              { SRSRows }
            </tbody>
          </table>
        </div>
        <div id="AS-section" style={{ display: 'none' }}>
          <h3>Accumulation Survey</h3>
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Debris Type</th>
                <th>Amount Fresh</th>
                <th>Amount Weathered</th>
              </tr>
            </thead>
            <tbody>
              { ASRows }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SurveyEntry;
