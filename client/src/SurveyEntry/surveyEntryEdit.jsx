import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { getDebrisMap } from '../NewSurveyForm/debrisInfo'

import SurveyTableRow from './SurveyTableRow';
import './surveyEntry.css';
import './surveyEdit.css';

const debrisInfo = getDebrisMap();


class SurveyEntryEdit extends Component {
  constructor(props) {
    super(props);
    console.log(props.location.state.surveyData);

    this.state = {
      surveyData: props.location.state.surveyData,
      beachName: props.location.state.beachName,
      info: props.location.state.info,
      newData:{}
    };
    //this.auth = new Auth();

  }

  windDir = {
    n: "North",
    e: "East",
    s: "South",
    w: "West"
  }

  save = () => {
    console.log("save");
    
  }

  render() {
    console.log(this.state.info);
    // redirect if data change actions are being taken
    if (this.state.deletedComment) return <Redirect to="/home" />
    if (this.state.editSurvey) return <Redirect to="/survey" />
    // initializes to null because when component mounts, there is no data yet
    let SRSRows = [];
    let ASRows = [];

    // if there is data (which is once the component mounts)
    if (this.state.surveyData.SRSDebris) {
      let { SRSDebris, ASDebris } = this.state.surveyData;
      // for every type of trash, return a surveyTableRow component with the data
      for (const trash in SRSDebris) {
        const trashData = SRSDebris[trash];
        SRSRows.push(
          <SurveyTableRow
            key={trash}
            name={debrisInfo[trash]}
            fresh={trashData.fresh}
            weathered={trashData.weathered}
            edit
          />
        );
      }

      for (const trash in ASDebris) {
        const trashData = ASDebris[trash];
        ASRows.push(
          <SurveyTableRow
            key={trash}
            name={debrisInfo[trash]}
            fresh={trashData.fresh}
            weathered={trashData.weathered}
            edit
          />
        );
      }

    }

    return (
      <div className="uk-container">

        {/* BEACH NAME AND DATE */}
        <h2 className="uk-text-primary uk-heading-primary">
          <Link to={{
            pathname: `/location/${this.state.beachName.replace(/\s/g, '')}`, state: {
              data: this.props.location.state.info,
              userProfile: this.state.userProfile
            }
          }}>
            {this.state.beachName}
          </Link>
          <span className="uk-text-muted uk-text-large uk-margin-left">
            {new Date(this.state.surveyData.survDate).toLocaleDateString()}
          </span>
        </h2>

        {/* DATA SECTION CONTAINING SURVEY/SRS/AS */}
        <div data-uk-grid="masonry: true" className="uk-grid uk-grid-large uk-grid-match uk-width-1 uk-child-width-1-2">
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Team Information</h3>
              <p><strong>Team Leader:</strong> {this.state.surveyData.user ? this.state.surveyData.user.f
                + " " + this.state.surveyData.user.l : ""}</p>
              <p><strong>Organization:</strong> {this.state.surveyData.org}</p>
              <p><strong>Email:</strong> {this.state.surveyData.email}</p>
            </div>
          </div>

          <div id="b-cleanup-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Basic Clean Up</h3>
              {
                this.state.surveyData.numOfP ?
                  <p><strong>Number of People:</strong> {this.state.surveyData.numOfP}</p> : null
              }
              {
                this.state.surveyData.weight ?
                  <p><strong>Total Weight:</strong> {this.state.surveyData.weight}</p> : null
              }
            </div>
          </div>

          {/* SURVEY AREA SECTION */}
          <div id="survey-area-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Area</h3>
              {
                this.state.info.lat && this.state.info.lon ?
                  <p><strong>GPS Coordinates:</strong> {this.state.info.lat}, {this.state.info.lon}</p> : null
              }
              {
                this.state.surveyData.reason ?
                  <p><strong>Reason for Location Choice: </strong>
                    {
                      this.state.surveyData.reason.prox ? "Proximity" : this.state.surveyData.reason.debris ? "Debris" : this.state.surveyData.reason.other
                    }
                  </p> : null
              }
              {
                this.state.surveyData.majorUse ?
                  <p><strong>Major Use: </strong>
                    {this.state.surveyData.majorUse.rec ? "Recreation" : this.state.surveyData.majorUse.com ? "Commercial" : this.state.surveyData.majorUse.other}
                  </p> : null
              }
              {
                this.state.surveyData.st ?
                  <p><strong>Substrate Type: </strong>
                    {
                      this.state.surveyData.st.s ? "Sand" : this.state.surveyData.st.p ? "Pebbles" : this.state.surveyData.st.rr ? "Rip rap" : this.state.surveyData.st.sea ? "Seaweed" : this.state.surveyData.st.other
                    }
                  </p> : null
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
                this.state.surveyData.wind ?
                  <p><strong>Wind Direction: </strong> {this.windDir[this.state.surveyData.wind.dir]}</p> : null
              }
              {
                this.state.surveyData.wind ?
                  <p><strong>Wind Speed: </strong> {this.state.surveyData.wind.spd} knots</p> : null
              }
              {
                this.state.info.nroName ?
                  <p><strong>Nearest River:</strong> {this.state.info.nroName}</p> : null
              }
              {
                this.state.info.nroDist ?
                  <p><strong>Distance to Nearest River:</strong> {this.state.info.nroDist}mi</p> : null
              }
              {
                this.state.surveyData.cmpsDir ?
                  <p><strong>Compass Direction:</strong> {this.state.surveyData.cmpsDir} Degrees</p> : null
              }
            </div>
          </div>

          {/* SRS SECTION*/}
          <div id="SRS-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3>Surface Rib Scan Survey</h3>
              <table className="uk-table uk-table-striped tableEdit">
                <thead>
                  <tr>
                    <th>Debris Type</th>
                    <th>Amount Fresh</th>
                    <th>Amount Weathered</th>
                  </tr>
                </thead>
                <tbody>
                  {SRSRows}
                  <tr className="plusBtn"></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TIDE SECTION*/}
          <div id="tide-section">
            <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
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

          {/* AS SECTION */}
          <div id="AS-section">
            <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
              <h3>Accumulation Survey</h3>
              <table className="uk-table uk-table-striped tableEdit">
                <thead>
                  <tr>
                    <th>Debris Type</th>
                    <th>Amount Fresh</th>
                    <th>Amount Weathered</th>
                  </tr>
                </thead>
                <tbody>
                  {ASRows}
                  <tr className="plusBtn"></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button className="uk-button button-active" onClick={this.save}
          data-uk-toggle="target: #modal">
          Save Edits
            </button>
      </div>

    );
  }
}

export default SurveyEntryEdit;



