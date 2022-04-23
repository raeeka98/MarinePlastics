/**
 * SurveyEntry.jsx
 * Code for the survey page that displays all of the data on a survey,
 * including a pie chart showing the percentages of each type of data for the
 * surface rib scan or the accumulation survey.
 */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { PieChart } from './SurveyCharts'
import { getAllDebrisMap } from '../NewSurveyForm/debrisInfo'

import SurveyTableRow from './SurveyTableRow';
import './surveyEntry.css';

const debrisInfo = getAllDebrisMap();

class SurveyEntry extends Component {
  constructor(props) {
    super(props);
    let { surveyID } = props.match.params;
    this.state = {
      beachName: this.props.location.state.beachName,
      info: this.props.location.state.info,
      lat: [0, 0, 0, 0],
      lon: [0, 0, 0, 0],
      surveyID,
      surveyData: {},
      userProfile: this.props.location.state.userProfile,

      deletedComment: false,
      srsSelected: true,
      debrisNA: false,
      editSurvey: false,
      editable: false
    };
    // this.auth = new Auth();
    this.handleChartTypeChange = this.handleChartTypeChange.bind(this);
    this.renderOptions = this.renderOptions.bind(this);

  }

  windDir = {
    n: "North",
    ne: "Northeast",
    e: "East",
    se: "Southeast",
    s: "South",
    sw: "Southwest",
    w: "West",
    nw: "Northwest"
  }

  /**
   * Capitalizes first letter in word, and makes all other letters lowercase.
   * @param {any} word
   * @return word with first letter capitalized and other letters lowercase
   */
  toTitleCase(word) {
    return word.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  /**
   * If there is data for both surface rib scan and accumulation survey,
   * creates options to switch between displaying data on one survey or the
   * other.
   * @return JSX code to select between the two surveys, or if there is only
   * data for one survey, just lists which survey has data, or that there is no
   * debris data available
   */
  renderOptions() {
    if (this.state.surveyData.SRSDebris
      && this.state.surveyData.ASDebris) {
      //render both options
      return (
        <select
          className="uk-select uk-form"
          id="view-type"
          onChange={this.handleChartTypeChange}
        >
          <option value="srs">Suface Rib Scan</option>
          <option value="as">Accumulation Sweep</option>
        </select>
      )
    } else if (this.state.surveyData.SRSDebris) {
      return <h3>Surface Rib Scan</h3>
    } else if (this.state.surveyData.ASDebris) {
      return <h3>Accumulation Sweep</h3>
    } else {
      return <h3>Debris total not available</h3>
    }
  }

  /*
   * If the user wants to select a survey to display, then we need to be able
   * to set the state of the Survey component to tell it what to render.
   * @param {any} e
   */
  async handleChartTypeChange(e) {
    await this.setState({ view: e.target.value });
    if (this.state.view === 'srs') {
      this.setState({ srsSelected: true })
    } else {
      this.setState({ srsSelected: false })
    }
  }

  /*
   * Returns string representation of checked answers for category.
   * @param category
   * @return string data
   */
  getCheckBoxData(category) {
    var data = "";
    // true if should add comma and space to data to separate different options
    var addComma = false;

    var option = null;

    // determine which object in SurveyData to get checked options
    if (category === "reason") {
      option = this.state.info.reason;

      if (option.prox) {
        // addComma becomes true to separate with any future options checked
        addComma = true;
        data = "Proximity/Convenience";
      }
      if (option.debris) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Debris";
      }
      if (option.other) {
        if (addComma) {
          data += ", ";
        }
        data += option.other;
      }
    }
    else if (category === "majorUse") {
      option = this.state.info.majorUse;

      if (option.rec) {
        addComma = true;
        data = "Recreation";
      }
      if (option.com) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Commercial";
      }
      if (option.rem) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Remote/Unused";
      }
      if (option.other) {
        if (addComma) {
          data += ", ";
        }
        data += option.other;
      }
    }
    else if (category === "st") {
      option = this.state.surveyData.st;

      if (option.s) {
        addComma = true;
        data = "Sand";
      }
      if (option.p) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Pebble";
      }
      if (option.rr) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Rip Rap";
      }
      if (option.sea) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Seaweed";
      }
      if (option.other) {
        if (addComma) {
          data += ", ";
        }
        data += option.other;
      }
    }
    else if (category === "incompleteSurvey") {
      option = this.state.surveyData.incompleteSurvey;

      if (option.time) {
        addComma = true;
        data = "Not enough time";
      }
      if (option.people) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Not enough people";
      }
      if (option.area) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Too much area";
      }
      if (option.trash) {
        if (addComma) {
          data += ", ";
        }
        else {
          addComma = true;
        }
        data += "Too much trash";
      }
      if (option.other) {
        if (addComma) {
          data += ", ";
        }
        data += option.other;
      }
    }

    return data;
  }

  /**
   * Gets data on survey and whether the user has permission to edit or delete
   * the survey or not, and then gets data for the pie chart and beach data.
   */
  getSurvey = () => {
    let userID = this.state.userProfile ?
      this.state.userProfile.sub.split("|")[1] : undefined;

    let userRoles = this.state.userProfile ?
      this.state.userProfile['https://marineplastics.com/roles'] : undefined
    axios.get(`/beaches/surveys/${this.state.surveyID}`, {
      params: {
        userID,
        userRoles
      },
      headers: {
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    })
      .then(res => {
        this.setState({ surveyData: res.data.survData, editable: res.data.e });
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.getChartData();
      })
      .then(() => {
        this.getBeachInfo();
      });
  }

  /**
   * Gets data on the beach to display on page.
   */
  getBeachInfo = () => {
    axios.get(`/beaches/${this.state.surveyData.bID}/info`)
      .then(res => {
        this.setState({ info: res.data });
      })
      .then(() => {
        this.convertLatLon();
      });
  }

  /**
   * Extracts the SRS and AS debris data in a way that the PieChart can process
   * the data and display it.
   */
  getChartData = () => {
    // first, check to see if we even have the data
    if (this.state.surveyData.SRSDebris) {
      // if yes, sums weathered and fresh for the given trash type
      var SRSChartDataObject = {};
      for (const key in this.state.surveyData.SRSDebris) {
        let thisDebrisTotal = this.state.surveyData.SRSDebris[key].fresh +
          this.state.surveyData.SRSDebris[key].weathered;
        SRSChartDataObject[key] = thisDebrisTotal;
      }
      // now sorts the data so that it will display nicely
      var keysSRS = Object.keys(SRSChartDataObject);
      let cleanedKeysSorted = {};
      keysSRS.sort((a, b) => {
        return (SRSChartDataObject[a] -
          SRSChartDataObject[b])
      });
      for (const i in keysSRS) {
        let key = keysSRS[i];
        let cleanedKey = debrisInfo[key];
        if (cleanedKey === "Fishing Line / Polypropylene Rope")
          cleanedKey = "Fishing Line";
        if (cleanedKey === "Plastic Bottles / Plastic Caps")
          cleanedKey = "Plastic Bottles";
        cleanedKeysSorted[cleanedKey] = SRSChartDataObject[key];
      }
      // sets the state of the component
      this.setState({ chartDataSRS: cleanedKeysSorted });
    } else {
      // we dont have survey data for the surface rib scan!!
      this.setState({ srsSelected: false });
    }
    if (this.state.surveyData.ASDebris) {
      var ASChartDataObject = {};
      for (const key in this.state.surveyData.ASDebris) {
        let thisDebrisTotal = this.state.surveyData.ASDebris[key].fresh +
          this.state.surveyData.ASDebris[key].weathered;
        ASChartDataObject[key] = thisDebrisTotal;
      }
      //Now we can sort i guess
      var keysAS = Object.keys(ASChartDataObject);
      let cleanedKeysSorted = {};
      keysAS.sort((a, b) => {
        return (ASChartDataObject[a] -
          ASChartDataObject[b])
      });
      for (const i in keysAS) {
        let key = keysAS[i];
        let cleanedKey = debrisInfo[key];
        if (cleanedKey === "Fishing Line / Polypropylene Rope")
          cleanedKey = "Fishing Line";
        if (cleanedKey === "Plastic Bottles / Plastic Caps")
          cleanedKey = "Plastic Bottles";
        cleanedKeysSorted[cleanedKey] = ASChartDataObject[key];
      }

      this.setState({ chartDataAS: cleanedKeysSorted });
    } else {
      if (!this.state.surveyData.SRSDebris && !this.state.surveyData.ASDebris)
        this.setState({ debrisNA: true });
    }
  }

  /**
   * Requests to delete survey, and tells user if survey was successfully
   * deleted or not.
   */
  deleteSurvey = () => {
    axios.delete(`/beaches/surveys/${this.state.surveyID}`,
      {
        params:
        {
          bID: this.state.surveyData.bID,
          dos: this.state.surveyData.survDate,
          userID: this.state.userProfile ? this.state.userProfile.sub.split('|')[1] : '',
          userRoles: this.state.userProfile ?
            this.state.userProfile['https://marineplastics.com/roles'] :
            undefined
        },
        headers: {
          Authorization: `Bearer ${this.props.auth.getAccessToken()}`
        }
      })
      .then(res => {
        if (res.data.res === "fail") {
          alert("Survey deleted failed.");
        }
        else {
          this.setState({
            deletedComment: true
          })
          let closeModal = document.getElementById('closeModalButton');
          closeModal.click();
          setTimeout(() => alert("Survey deleted successfully."), 1000);
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  /**
   * Allows user to edit survey.
   */
  editSurvey = () => {
    this.setState({ editSurvey: true });
  }

  /**
   * Converts stored latitude and longitude from decimal to degrees, minutes,
   * seconds, and direction.
   */
  convertLatLon = () => {
    //this.setState({info: res.data});
    let lat = this.state.info.lat;
    let latDeg = Math.floor(lat);
    let tempDecimal = (lat - latDeg) * 60;
    let latMin = Math.floor(tempDecimal);
    let latSec = (tempDecimal - latMin) * 60;
    latSec = (Math.trunc((latSec * 100)) / 100);
    let latDir = Math.sign(latDeg);
    latDeg = latDeg * latDir;

    let lon = this.state.info.lon;
    let lonDeg = Math.floor(lon);
    tempDecimal = (lon - lonDeg) * 60;
    let lonMin = Math.floor(tempDecimal);
    let lonSec = (tempDecimal - lonMin) * 60;
    lonSec = (Math.trunc((latSec * 100)) / 100);
    let lonDir = Math.sign(lonDeg);
    lonDeg = lonDeg * lonDir;

    this.setState({ lat: [latDeg, latMin, latSec, latDir], lon: [lonDeg, lonMin, lonSec, lonDir] });
  }

  /**
   * Once the component is on the page, gets the surveyData from the server.
   */
  componentDidMount() {
    this.getSurvey();
  }

  /**
   * Creates buttons to edit or delete the survey.
   * @return JSX code to create the buttons
   */
  editBtns = () => {
    return (
      <React.Fragment>
        {/* Edit and Delete buttons are disabled if user is not logged in or 
         * doesn't own the survey */}
        {this.state.editable ?
          <div className="uk-flex uk-flex-row">
            <button className="uk-button button-active uk-margin-right">
              <Link className="uk-button button-active" to={{
                pathname: `${this.props.location.pathname}/edit`,
                state: {
                  surveyData: this.state.surveyData,
                  beachName: this.state.beachName,
                  info: this.state.info,
                  userProfile: this.state.userProfile
                }
              }}>Edit Survey</Link>
            </button>
            <button className="uk-button button-active"
              data-uk-toggle="target: #modal">
              Delete Survey
            </button>
          </div>
          :
          <div className="uk-flex uk-flex-row">
            <button className="uk-button button-disabled uk-margin-right"
              data-uk-toggle="target: #modal">
              Edit Survey
              </button>
            <button className="uk-button button-disabled"
              data-uk-toggle="target: #modal"
              id="delete">
              Delete Survey
              </button>

          </div>
        }

        {/* The modal that is opened by clicking on the edit/delete buttons */}
        <div id="modal" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body">
            {this.state.editable ?
              <div>
                <h2>Are you sure you want to delete this survey?</h2>
                <p>This action cannot be undone.</p>
              </div>
              :
              <div>
                <h2>
                  You do not have permission to make changes to this survey.
                </h2>
                <p>
                  You may only edit or delete a survey if you created it and
                  are logged in.
                </p>
              </div>
            }

            <p className="uk-text-right">

              {this.state.editable ?
                <div>
                  <button
                    className="uk-button uk-button-danger uk-margin-left"
                    onClick={this.deleteSurvey}
                  >
                    Delete
                  </button>
                  <button
                    className="uk-button uk-button-default uk-modal-close"
                  >
                    Cancel
                  </button>
                </div>
                : null}
            </p>

            <button
              id="closeModalButton"
              className="uk-modal-close-default"
              data-uk-close
            >
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  /**
   * Creates survey page.
   * @return rendered react component to display page
   */
  render() {
    // redirect if data change actions are being taken
    if (this.state.deletedComment) return <Redirect to="/home" />
    // initializes to null because when component mounts, there is no data yet
    let SRSRows = [];
    let ASRows = [];
    let MDSRow = [];

    // if there is data (which is once the component mounts)
    if (this.state.surveyData.SRSDebris || this.state.surveyData.ASDebris ||
      this.state.surveyData.MicroDebris) {
      let { SRSDebris, ASDebris, MicroDebris } = this.state.surveyData;
      // for each type of trash, return surveyTableRow component with the data
      for (const trash in SRSDebris) {
        const trashData = SRSDebris[trash];
        SRSRows.push(
          <SurveyTableRow
            key={trash}
            name={debrisInfo[trash]}
            fresh={trashData.fresh}
            weathered={trashData.weathered}
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
          />
        );
      }

      // failsafe since surveys use to not have micro debris
      if (MicroDebris && MicroDebris['microDebris']) {
        const mdsData = MicroDebris['microDebris'];
        if (mdsData) {
          MDSRow.push(
            <tr>
              <td>
                {mdsData.fresh}
              </td>
              <td>
                {mdsData.weathered}
              </td>
            </tr>
          );
        }
      }

      document.getElementById('SRS-section').style.display =
        this.state.surveyData.SRSDebris ? 'block' : 'none';
      document.getElementById('AS-section').style.display =
        this.state.surveyData.ASDebris ? 'block' : 'none';
      document.getElementById('MDS-section').style.display =
        this.state.surveyData.MicroDebris ? 'block' : 'none';
    }

    if (this.state.surveyData.weight || this.state.surveyData.numOfP) {
      document.getElementById('b-cleanup-section').style.display = 'block';
    }

    if (
      this.state.surveyData.lat || this.state.surveyData.lon ||
      this.state.info.reason || this.state.surveyData.st ||
      this.state.surveyData.slope || this.state.surveyData.aspect ||
      this.state.info.majorUse || this.state.surveyData.lastTide ||
      this.state.surveyData.nextTide || this.state.surveyData.nroDist ||
      this.state.surveyData.nroName || this.state.surveyData.windDir
    ) {
      const surveyAreaSection = document.getElementById('survey-area-section');
      if (surveyAreaSection) {
        surveyAreaSection.style.display = 'block';
      }
    }

    if (this.state.surveyData.lastTide || this.state.surveyData.nextTide) {
      document.getElementById('tide-section').style.display = 'block';
    }
    return (
      <div className="uk-container">

        {/* BEACH NAME AND DATE */}
        <h2 className="uk-text-primary uk-heading-primary">
          <Link to={{
            pathname: `/location/${this.state.beachName.replace(/\s/g, '')}`,
            state: {
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

        {/* DATA SECTION CONTAINING SURVEY/SRS/AS/MDS */}
        <div
          data-uk-grid="masonry: true"
          className=
          "uk-grid uk-grid-large uk-grid-match uk-width-1 uk-child-width-1-2"
        >
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Team Information</h3>
              <p><strong>Surveyor's Full Name: </strong>
                {this.state.surveyData.user ? this.state.surveyData.user.f
                + " " + this.state.surveyData.user.l : ""}</p>
              {this.state.surveyData.org && <p><strong>Organization:</strong> {this.state.surveyData.org}</p>}
              <p><strong>Email:</strong> {this.state.surveyData.email}</p>
              <p>
                <strong>
                  Clean Up Start Time
                </strong> {this.state.surveyData.survStartTime}
              </p>
              <p>
                <strong>
                  Clean Up End Time
                </strong> {this.state.surveyData.survEndTime}
              </p>
            </div>
          </div>

          <div id="b-cleanup-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Basic Clean Up</h3>
              {
                this.state.surveyData.numOfP !== 0 ?
                  <p>
                    <strong>Number of People: </strong>
                    {this.state.surveyData.numOfP}
                  </p>
                  : null
              }
              {
                this.state.surveyData.weight ?
                  <p>
                    <strong>Total Weight: </strong>
                    {this.state.surveyData.weight} lb
                  </p>
                  : null
              }
            </div>
          </div>

          {/* SURVEY AREA SECTION */}
          <div id="survey-area-section" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Area</h3>
              {
                (this.state.info.lat || this.state.info.lat === 0)
                    && (this.state.info.lon || this.state.info.lon === 0) ?
                  <p>
                    <strong>GPS Coordinates: </strong>
                    {this.state.lat[0]}&deg; {this.state.lat[1]}'{" "}
                    {this.state.lat[2]}''{" "}
                    {(this.state.lat[3] === 1) ? 'N' : 'S'},{" "}
                    {this.state.lon[0]}&deg; {this.state.lon[1]}'{" "}
                    {this.state.lon[2]}''{" "}
                    {(this.state.lon[3] === 1) ? 'E' : 'W'}
                  </p>
                  : null
              }
              {
                this.state.info.reason ?
                  <p><strong>Reason for Location Choice: </strong>
                    {this.getCheckBoxData("reason")}
                  </p> : null
              }
              {
                this.state.info.majorUse ?
                  <p><strong>Major Use: </strong>
                    {this.getCheckBoxData("majorUse")}
                  </p> : null
              }
              {
                this.state.surveyData.st ?
                  <p><strong>Substrate Type: </strong>
                    {this.getCheckBoxData("st")}
                  </p>
                  : null
              }
              {
                this.state.surveyData.slope ?
                  <p>
                    <strong>Beach Slope: </strong>
                    {this.toTitleCase(this.state.surveyData.slope)}
                  </p>
                  : null
              }
              {
                this.state.surveyData.aspect ?
                  <p>
                    <strong>Beach Aspect: </strong>
                    {this.state.surveyData.aspect}
                  </p>
                  : null
              }
              {
                this.state.surveyData.wind ?
                  <p>
                    <strong>Wind Direction: </strong>
                    {this.windDir[this.state.surveyData.wind.dir]}
                  </p>
                  : null
              }
              {
                this.state.surveyData.wind ?
                  <p>
                    <strong>Wind Speed: </strong>
                    {this.state.surveyData.wind.spd}
                    knots
                  </p>
                  : null
              }
              {
                this.state.info.nroName ?
                  <p>
                    <strong>Nearest River: </strong>
                    {this.state.info.nroName}
                  </p>
                  : null
              }
              {
                (this.state.info.nroDist || this.state.info.nroDist === 0) ?
                  <p>
                    <strong>Distance to Nearest River: </strong>
                    {this.state.info.nroDist}mi
                  </p>
                  : null
              }
              {
                (this.state.info.cmpsDir || this.state.info.cmpsDir === 0) ?
                  <p>
                    <strong>Compass Direction: </strong>
                    {this.state.info.cmpsDir}{" "}
                    degrees
                  </p>
                  : null
              }
            </div>
          </div>

          {/* SRS SECTION*/}
          <div id="SRS-section" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
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
          </div>

          {/* TIDE SECTION*/}
          <div id="tide-section" style={{ display: 'none' }}>
            <div
              className="uk-card uk-card-default uk-card-body uk-margin-bottom"
            >
              <h3 className="uk-card-title">Tide Information</h3>
              <h4>Last Tide</h4>
              <div>
                {
                  this.state.surveyData.lastTide ?
                    (<div>
                      <p>
                        <strong>Type: </strong>
                        {this.toTitleCase(this.state.surveyData.lastTide.type)}
                      </p>
                      <p>
                        <strong>Time: </strong>
                        {this.state.surveyData.lastTide.time}
                      </p>
                      <p>
                        <strong>Height: </strong>
                        {this.state.surveyData.lastTide.height}
                      </p>
                    </div>) : null
                }
              </div>
              <h4>Next Tide</h4>
              <div>
                {
                  this.state.surveyData.nextTide ?
                    (<div>
                      <p>
                        <strong>Type: </strong>
                        {this.toTitleCase(this.state.surveyData.nextTide.type)}
                      </p>
                      <p>
                        <strong>Time: </strong>
                        {this.state.surveyData.nextTide.time}
                      </p>
                      <p>
                        <strong>Height: </strong>
                        {this.state.surveyData.nextTide.height}
                      </p>
                    </div>) : null
                }
              </div>
            </div>
          </div>

          {/* AS SECTION */}
          <div id="AS-section" style={{ display: 'none' }}>
            <div
              className="uk-card uk-card-default uk-card-body uk-margin-bottom"
            >
              <h3>Accumulation Survey</h3>
              {
                (this.state.surveyData.incompleteSurvey &&
                  Object.values(this.state.surveyData.incompleteSurvey).some(val => val)) ?
                  <p><strong>Why unable to complete survey: </strong>
                    {this.getCheckBoxData("incompleteSurvey")}
                  </p> : null
              }            
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
          </div>
          {/* MDS SECTION */}
          <div id="MDS-section" style={{ display: 'none' }}>
            <div
              className="uk-card uk-card-default uk-card-body uk-margin-bottom"
            >
              <h3>Micro Debris Survey</h3>
              <table className="uk-table uk-table-striped">
                <thead>
                  <tr>
                    <th>Amount Fresh</th>
                    <th>Amount Weathered</th>
                  </tr>
                </thead>
                <tbody>
                  {MDSRow}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* DEBRIS TOTALS AND PIE CHART */}
        <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
          <h2>Debris quantity totals for this survey:</h2>
          <div className="uk-width-1-5">
            {this.renderOptions()}
          </div>
          {this.state.debrisNA ? null :
            <PieChart
              chartData={this.state.srsSelected ? this.state.chartDataSRS :
                this.state.chartDataAS}
            />}
        </div>
        {this.editBtns()}
      </div>
    );
  }
}

export default SurveyEntry;