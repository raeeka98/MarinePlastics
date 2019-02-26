import React, { Component } from 'react';
import Auth from '../Auth';
import axios from 'axios';

import SurveyTableRow from './SurveyTableRow';

class SurveyEntry extends Component {
  constructor(props) {
    super(props);
    let { surveyID } = props.match.params;
    this.state = {
      beachName: this.props.location.state.beachName,
      surveyID,
      surveyData: {}
    };
    this.auth = new Auth();
  }

  getSurvey = () => {
    console.log(this.state.surveyID);
    axios.get(`/surveys/${this.state.surveyID}`)
      .then(res => {
        console.log(res.data);
        this.setState({ surveyData: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // once the component is on the page, gets the surveyData from the server
  componentDidMount() {
    this.getSurvey();
  }

  render() {
    // initializes to null because when component mounts, there is no data yet
    let SRSRows = [];
    let ASRows = [];

    // if there is data (which is once the component mounts)
    if (this.state.surveyData.SRSData) {
      let { SRSData, ASData } = this.state.surveyData;
      // for every type of trash, return a surveyTableRow component with the data
      for (const trash in SRSData) {
        const trashData = SRSData[trash];
        SRSRows.push(
          <SurveyTableRow
            key={trash}
            name={trash}
            fresh={trashData.fresh}
            weathered={trashData.weathered}
          />
        );
      }
      for (const trash in ASData) {
        const trashData = ASData[trash];
        ASRows.push(
          <SurveyTableRow
            key={trash}
            name={trash}
            fresh={trashData.fresh}
            weathered={trashData.weathered}
          />
        );
      }

      document.getElementById('SRS-section').style.display = this.state.surveyData.srsDataLength > 0 ? 'block' : 'none';
      document.getElementById('AS-section').style.display = this.state.surveyData.asDataLength > 0 ? 'block' : 'none';
    }

    if (this.state.surveyData.weight || this.state.surveyData.NumberOfPeople) {
      document.getElementById('b-cleanup-section').style.display = 'block';
    }

    if (
      this.state.surveyData.lat || this.state.surveyData.lon ||
      this.state.surveyData.reason || this.state.surveyData.st ||
      this.state.surveyData.slope || this.state.surveyData.aspect ||
      this.state.surveyData.majorUse || this.state.surveyData.lastTide ||
      this.state.surveyData.nextTide || this.state.surveyData.nroDist ||
      this.state.surveyData.nroName || this.state.surveyData.windDir
    ) {
      document.getElementById('survey-area-section').style.display = 'block';
    }

    if (this.state.surveyData.lastTide || this.state.surveyData.nextTide) {
      document.getElementById('tide-section').style.display = 'block';
    }

    return (
      <div>
        <h2 className="uk-text-primary uk-heading-primary">
          {this.state.beachName}
          <span className="uk-text-muted uk-text-large uk-margin-left">
            {this.state.surveyData.date}
          </span>
        </h2>
        <div className="uk-grid uk-grid-large uk-grid-match uk-child-width-1-2">
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Team Information</h3>
              <p><strong>Team Leader:</strong> {this.state.surveyData.user}</p>
              <p><strong>Organization:</strong> {this.state.surveyData.org}</p>
              <p><strong>Email:</strong> {this.state.surveyData.email}</p>
            </div>
          </div>
          <div id="survey-area-section" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Area</h3>
              {
                this.state.surveyData.lat && this.state.surveyData.lon ?
                  <p><strong>GPS Coordinates:</strong> {this.state.surveyData.lat}, {this.state.surveyData.lon}</p> : null
              }
              {
                this.state.surveyData.reason ?
                  <p><strong>Reason for Location Choice:</strong> {this.state.surveyData.reason}</p> : null
              }
              {
                this.state.surveyData.majorUse ?
                  <p><strong>Major Use:</strong> {this.state.surveyData.majorUse}</p> : null
              }
              {
                this.state.surveyData.st ?
                  <p><strong>Substrate Type:</strong> {this.state.surveyData.st}</p> : null
              }
              {
                this.state.surveyData.slope ?
                  <p><strong>Beach Slope:</strong> {this.state.surveyData.slope}</p> : null
              }
              {
                this.state.surveyData.aspect ?
                  <p><strong>Beach Aspect:</strong> {this.state.surveyData.aspect}</p> : null
              }
              {
                this.state.surveyData.windDir ?
                  <p><strong>Wind Direction:</strong> {this.state.surveyData.windDir}</p> : null
              }
              {
                this.state.surveyData.nroName ?
                  <p><strong>Nearest River:</strong> {this.state.surveyData.nroName}</p> : null
              }
              {
                this.state.surveyData.nroDist ?
                  <p><strong>Distance to Nearest River:</strong> {this.state.surveyData.nroDist}m</p> : null
              }
            </div>
          </div>
          <div id="b-cleanup-section" className="uk-grid-margin uk-margin-bottom" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Basic Clean Up</h3>
              {
                this.state.surveyData.NumberOfPeople ?
                  <p><strong>Number of People:</strong> {this.state.surveyData.NumberOfPeople}</p> : null
              }
              {
                this.state.surveyData.weight ?
                  <p><strong>Total Weight:</strong> {this.state.surveyData.weight}</p> : null
              }
            </div>
          </div>
          <div id="tide-section" className="uk-grid-margin uk-margin-bottom" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Tide Information</h3>
              <h4>The Last Tide</h4>
              <div>
                {
                  this.state.surveyData.lastTide ?
                    (<div>
                      <p><strong>Type:</strong> {this.state.surveyData.lastTide.type}</p>
                      <p><strong>Time:</strong> {this.state.surveyData.lastTide.time}</p>
                      <p><strong>Height:</strong> {this.state.surveyData.lastTide.height}</p>
                    </div>) : null
                }
              </div>
              <h4>The Next Tide</h4>
              <div>
                {
                  this.state.surveyData.nextTide ?
                    (<div>
                      <p><strong>Type:</strong> {this.state.surveyData.nextTide.type}</p>
                      <p><strong>Time:</strong> {this.state.surveyData.nextTide.time}</p>
                      <p><strong>Height:</strong> {this.state.surveyData.nextTide.height}</p>
                    </div>) : null
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
              {SRSRows}
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
              {ASRows}
            </tbody>
          </table>
        </div>
        <button className="uk-button uk-button-danger">Delete Survey</button>
      </div>
      
    );
  }
}

export default SurveyEntry;
