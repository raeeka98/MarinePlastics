/**
 * surveyEntryEdit.jsx
 * Code for survey edit page, that allows users to edit the survey. Accessible
 * by clicking on the edit survey button in the survey page.
 */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
  getAllDebrisMap,
  debrisNames,
  getDebrisID
} from '../NewSurveyForm/debrisInfo';

import SurveyTableRow from './SurveyTableRow';
import EditableTable from './editableTable';
import './surveyEntry.css';
import './surveyEdit.css';

const debrisInfo = getAllDebrisMap();

class SurveyEntryEdit extends Component {
  constructor(props) {
    super(props);

    let srsOptions = debrisNames;
    let asOptions = debrisNames;

    let srsDebris = [], asDebris = [];
    let { SRSDebris, ASDebris, MicroDebris } = props.location.state.surveyData;
    for (const trashID in SRSDebris) {
      const trashData = SRSDebris[trashID];
      const trashName = debrisInfo[trashID];
      srsOptions = srsOptions.filter(val => val !== trashName);
      srsDebris.push({ trashName, trashID, ...trashData });
    }
    for (const trashID in ASDebris) {
      const trashData = ASDebris[trashID];
      const trashName = debrisInfo[trashID];
      asOptions = asOptions.filter(val => val !== trashName);
      asDebris.push({ trashName, trashID, ...trashData });
    }

    let origMDSDebris = {};

    // not creating an array, since only one object
    if (MicroDebris && MicroDebris['microDebris']) {
      origMDSDebris = {
        fresh: MicroDebris['microDebris']['fresh'],
        weathered: MicroDebris['microDebris']['weathered']
      }
    }

    let mdsDebris = {};

    // do both separate so not pointing to the same object
    if (MicroDebris && MicroDebris['microDebris']) {
      mdsDebris = {
        fresh: MicroDebris['microDebris']['fresh'],
        weathered: MicroDebris['microDebris']['weathered']
      }
    }

    this.state = {
      surveyData: props.location.state.surveyData,
      beachName: props.location.state.beachName,
      info: props.location.state.info,
      userProfile: props.location.state.userProfile,
      newData: {},
      origSRSDebris: [...srsDebris],
      origASDebris: [...asDebris],
      origMDSDebris,
      srsDebris,
      asDebris,
      mdsDebris,
      asOptions,
      srsOptions,
      editedSurveyData: false
    };
  }

  windDir = {
    n: "North",
    e: "East",
    s: "South",
    w: "West"
  }

  /**
   * Removes a type of trash in one of the surveys in the state, for updating
   * the survey.
   * @params {any} typeOfDebris, {any} deletedTrashID
   */
  deleteDebris = (typeOfDebris, deletedTrashID) => {
    let newsrsDebris = this.state.srsDebris;
    let newasDebris = this.state.asDebris;
    if (typeOfDebris === "SRS") {
      newsrsDebris = newsrsDebris.filter((val) => val.trashID !==
        deletedTrashID);
    } else {
      newasDebris = newasDebris.filter((val) => val.trashID !==
        deletedTrashID);
    }
    this.setState(prevState => {
      return {
        srsDebris: newsrsDebris,
        asDebris: newasDebris
      }
    });
  }

  /**
   * Changes the fresh or weathered trash based on valName, to the value
   * newVal.
   * @params {any} typeOfDebris, {any} changedTrashID, {any} valName, {any}
   * newVal
   */
  changeDebris = (typeOfDebris, changedTrashID, valName, newVal) => {
    let newSRSDebris = this.state.srsDebris;
    let newASDebris = this.state.asDebris;
    if (typeOfDebris === "SRS") {
      newSRSDebris = newSRSDebris.map(debris => (debris.trashID ===
        changedTrashID ? { ...debris, [valName]: newVal } : debris));
    } else {
      newASDebris = newASDebris.map(debris => (debris.trashID ===
        changedTrashID ? { ...debris, [valName]: newVal } : debris));
    }
    this.setState(prev => ({
      srsDebris: newSRSDebris,
      asDebris: newASDebris
    }));
  }

  /**
   * Adds new type of debris with initial values of fresh and weathered debris
   * 0.
   * @params {any} type, {any} trashName
   */
  addDebris = (type, trashName) => {
    let newSRS = this.state.srsDebris;
    let newAS = this.state.asDebris;
    let newasOptions = this.state.asOptions;
    let newsrsOptions = this.state.srsOptions;

    if (type === "SRS") {
      newsrsOptions = newsrsOptions.filter(val => val !== trashName);
      newSRS = [...newSRS, {
        trashName: trashName,
        trashID: getDebrisID(trashName), fresh: 0, weathered: 0
      }];
    } else {
      newasOptions = newasOptions.filter(val => val !== trashName);
      newAS = [...newAS, {
        trashName: trashName,
        trashID: getDebrisID(trashName),
        fresh: 0, weathered: 0
      }];
    }
    this.setState(prev => ({
      srsDebris: newSRS,
      asDebris: newAS,
      srsOptions: newsrsOptions,
      asOptions: newasOptions
    }));
  }

  /**
   * Changes most of the data in survey, except for data on debris or data from
   * checkboxes.
   * @param {any} e
   */
  editSurveyData = (e) => {
    let pathStr = e.target.name;
    let path = pathStr.split(".");
    let oldData = { ...this.state.surveyData };
    let sendingData = { ...this.state.newData };
    if (path.length === 2) {
      oldData[path[0]][path[1]] = e.target.value;
      sendingData[pathStr] = e.target.value;
    } else {
      oldData[path[0]] = e.target.value;
      sendingData[path[0]] = e.target.value;
    }
    this.setState(prev => ({
      surveyData: oldData,
      newData: sendingData
    }));
  }

  /**
   * Changes micro debris data when user changes its value.
   * @param {any} e
   */
  editMDSData = (e) => {
    // find out if fresh or weathered
    let freshOrWeathered = e.target.name;
    let oldMDSDebris = this.state.mdsDebris;
    oldMDSDebris[freshOrWeathered] = e.target.value;
    this.setState({
      mdsDebris: oldMDSDebris
    });
  }

  /**
   * Changes data that was created by checkbox.
   * @param {any} e
   */
  editSurveyCheckBoxes = e => {
    let pathStr = e.target.name;
    let path = pathStr.split(".");
    let oldData = { ...this.state.surveyData };
    let sendingData = { ...this.state.newData };
    if (path.length === 2) {
      oldData[path[0]][path[1]] = !oldData[path[0]][path[1]];
      sendingData[pathStr] = oldData[path[0]][path[1]];

    } else {
      oldData[path[0]] = !oldData[path[0]];
      sendingData[path[0]] = oldData[path[0]];
    }
    this.setState(prev => ({
      surveyData: oldData,
      newData: sendingData
    }));

    // for testing
    if (process.env.NODE_ENV === 'test') {
      return oldData, sendingData
    }
  }

  /**
   * Removes the other option user entered if the other checkbox is unchecked,
   * so that the option doesn't get submitted to the database.
   * @param {any} category
   */
  removeOther = (category) => {
    let oldData = { ...this.state.surveyData };
    let sendingData = { ...this.state.newData };
    if (category === 'usage') {
      // set to quotes, cause undefined won't update data
      oldData.majorUse.other = "";
      sendingData["majorUse.other"] = "";
    } else if (category === 'reason') {
      oldData.reason.other = "";
      sendingData["reason.other"] = "";
    } else if (category === 'substrate') {
      oldData.st.other = "";
      sendingData["st.other"] = "";
    } else if (category === 'incomplete') {
      oldData.incompleteSurvey.other = "";
      sendingData["incompleteSurvey.other"] = "";
    }

    this.setState({
      surveyData: oldData,
      newData: sendingData
    });
  }

  /**
   * Updates database with new changes to survey.
   */
  save = () => {
    let newASDebris = [];
    this.state.asDebris.forEach(val => {
      newASDebris.push([val.trashID, {
        fresh: val.fresh,
        weathered: val.weathered
      }]);
    });
    let newSRSDebris = [];
    this.state.srsDebris.forEach(val => {
      newSRSDebris.push([val.trashID, {
        fresh: val.fresh,
        weathered: val.weathered
      }])
    });
    let oldSRSDebris = this.state.origSRSDebris.map(val => [val.trashID, {
      fresh: val.fresh,
      weathered: val.weathered
    }]);
    let oldASDebris = this.state.origASDebris.map(val => [val.trashID, {
      fresh: val.fresh,
      weathered: val.weathered
    }]);

    // for micro debris
    let newMicroDebris = [];
    let oldMicroDebris = [];

    if (this.state.mdsDebris.fresh || this.state.mdsDebris.weathered) {
      newMicroDebris = [
        [
          "microDebris",
          {
            fresh: this.state.mdsDebris.fresh,
            weathered: this.state.mdsDebris.weathered
          }
        ]
      ];

      oldMicroDebris = [
        [
          "microDebris",
          {
            fresh: this.state.origMDSDebris.fresh,
            weathered: this.state.origMDSDebris.weathered
          }
        ]
      ];
    }

    let finalData = {
      newSRSDebris,
      newASDebris,
      newMicroDebris,
      oldSRSDebris,
      oldASDebris,
      oldMicroDebris,
      changedInfo: { ...this.state.newData }
    }

    console.log("finalData", finalData);

    let userID = this.state.userProfile ?
      this.state.userProfile.sub.split("|")[1] : undefined;

    let userRoles = this.state.userProfile ?
      this.state.userProfile['https://marineplastics.com/roles'] : undefined;

    axios.post(`/beaches/surveys/${this.state.surveyData._id}`,
      finalData, {
        params: {
          userID,
          userRoles
        },
        headers: {
          Authorization: `Bearer ${this.props.auth.getAccessToken()}`
        }
      })
      .then(res => {
        if (res.data.res === "fail") {
          alert("This account does not have the correct permissions.")
        } else {
          this.setState({ editedSurveyData: true })
        }
      });
  }

  /**
   * Creates edit survey page.
   * @return rendered react component to create page
   */
  render() {
    // redirect if data change actions are being taken
    if (this.state.editedSurveyData) {
      return <Redirect to={
        {
          pathname: `/surveys/${this.state.surveyData._id}`,
          state: {
            beachName: this.state.beachName,
            info: this.state.info,
            userProfile: this.state.userProfile
          }
        }
      } />
    }
    // initializes to null because when component mounts, there is no data yet
    let SRSRows = [];
    let ASRows = [];
    let MDSRow = [];

    // if there is data (which is once the component mounts)
    // for every type of trash, return a surveyTableRow component with the data
    this.state.asDebris.forEach(debrisData => {
      ASRows.push(
        <SurveyTableRow
          key={debrisData.trashID}
          trashID={debrisData.trashID}
          type="AS"
          name={debrisData.trashName}
          fresh={debrisData.fresh}
          weathered={debrisData.weathered}
          edit
          onClick={this.deleteDebris}
          onChange={this.changeDebris}
        />
      );
    });

    this.state.srsDebris.forEach(debrisData => {
      SRSRows.push(
        <SurveyTableRow
          key={debrisData.trashID}
          trashID={debrisData.trashID}
          type="SRS"
          name={debrisData.trashName}
          fresh={debrisData.fresh}
          weathered={debrisData.weathered}
          edit
          onClick={this.deleteDebris}
          onChange={this.changeDebris}
        />
      );
    })

    const mdsDebris = this.state.mdsDebris;
    // if there is any micro debris data
    if (mdsDebris) {
      MDSRow.push(
        <tr>
          <td>
            <input
              className="uk-input uk-form-small"
              type="number"
              name="fresh"
              defaultValue={mdsDebris.fresh}
              onChange={this.editMDSData}
            />
          </td>
          <td>
            <input
              className="uk-input uk-form-small"
              type="number"
              name="weathered"
              defaultValue={mdsDebris.weathered}
              onChange={this.editMDSData}
            />
          </td>
        </tr>
      )
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
          "uk-grid uk-grid-large uk-grid-match uk-width-1 uk-child-width-1-2@m"
        >
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Team Information</h3>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Surveyor's Full Name</p>
                <input
                  className="uk-input uk-form-small uk-margin-small-bottom"
                  type="text"
                  name="user.f"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.user.f}
                >
                </input>
                <input
                  className="uk-input uk-form-small"
                  type="text"
                  name="user.l"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.user.l}
                />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Organization</p>
                <input
                  className="uk-input uk-form-small"
                  type="text"
                  name="org"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.org}
                />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Email</p>
                <input
                  className="uk-input uk-form-small"
                  type="email"
                  name="email"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.email}
                />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Clean Up Start Time</p>
                <input
                  className="uk-input uk-form-small"
                  type="time"
                  name="survStartTime"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.survStartTime}
                />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Clean Up End Time</p>
                <input
                  className="uk-input uk-form-small"
                  type="time"
                  name="survEndTime"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.survEndTime}
                />
              </div>
            </div>
          </div>

          <div id="b-cleanup-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Basic Clean Up</h3>
              <div className="uk-grid">
                <div className="uk-width-1-2">
                  <p>Number of People</p>
                  <input
                    className="uk-input uk-form-small"
                    type="number"
                    name="numOfP"
                    onChange={this.editSurveyData}
                    defaultValue={this.state.surveyData.numOfP}
                  />
                </div>
                <div className="uk-width-1-2">
                  <p>Total Weight (lbs)</p>
                  <input
                    className="uk-input uk-form-small"
                    type="number"
                    name="weight"
                    onChange={this.editSurveyData}
                    defaultValue={this.state.surveyData.weight}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SURVEY AREA SECTION */}
          <div id="survey-area-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Area</h3>
              {/* <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>GPS Coordinates</p>
                <p className="uk-text-small uk-margin-small-left">Lat: <span className="uk-text-muted">{this.state.info.lat}</span></p>
                <p className="uk-text-small uk-margin-small-left">Lon: <span className="uk-text-muted">{this.state.info.lon}</span></p>
              </div> */}
              {/* <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Reason for Location Choice</p>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="reason.prox"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.reason.prox}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Proximity/Convenience
                  </span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="reason.debris"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.reason.debris}
                  />
                  <span className="uk-margin-left uk-text-small">Debris</span>
                </div>
                <div className="uk-width-auto">
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    onChange={e => {
                      this.setState({
                        showOtherReason: e.target.checked
                      });
                      if (!e.target.checked) {
                        this.removeOther('reason');
                      }
                    }}
                    defaultChecked={this.state.surveyData.reason.other ?
                      true : false}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Other
                  </span>
                </div>
                <div>
                  {(this.state.showOtherReason ||
                    this.state.surveyData.reason.other !== "") &&
                    <div className="uk-width-expand">
                      <input
                        className="uk-input uk-form-small"
                        type="text"
                        name="reason.other"
                        onChange={this.editSurveyData}
                        defaultValue={this.state.surveyData.reason.other}
                      />
                    </div>
                  }
                </div>
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Major Use</p>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="majorUse.rec"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.majorUse.rec}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Recreation
                  </span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="majorUse.com"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.majorUse.com}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Commercial
                  </span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="majorUse.rem"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.majorUse.rem}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Remote/Unused
                  </span>
                </div>
                <div className="uk-width-auto">
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    onChange={e => {
                      this.setState({
                        showOtherUsage: e.target.checked
                      });
                      if (!e.target.checked) {
                        this.removeOther('usage');
                      }
                    }}
                    defaultChecked={this.state.surveyData.majorUse.other ?
                      true : false}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Other
                  </span>
                </div>
                <div className="uk-width-expand">
                  {(this.state.showOtherUsage ||
                    this.state.surveyData.majorUse.other !== "") &&
                    <input
                      className="uk-input uk-form-small"
                      type="text"
                      name="majorUse.other"
                      onChange={this.editSurveyData}
                      defaultValue={this.state.surveyData.majorUse.other}
                    />
                  }
                </div>
              </div> */}

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Substrate Type</p>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="st.s"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.st.s}
                  />
                  <span className="uk-margin-left uk-text-small">Sand</span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="st.p"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.st.p}
                  />
                  <span className="uk-margin-left uk-text-small">Pebble</span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="st.rr"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.st.rr}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Rip Rap (large boulders)
                  </span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="st.sea"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={this.state.surveyData.st.sea}
                  />
                  <span className="uk-margin-left uk-text-small">Seaweed</span>
                </div>
                <div className="uk-width-auto">
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    onChange={e => {
                      this.setState({
                        showOtherSubstrate: e.target.checked
                      });
                      if (!e.target.checked) {
                        this.removeOther('substrate');
                      }
                    }}
                    defaultChecked={this.state.surveyData.st.other ?
                      true : false}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Other
                  </span>
                </div>
                {(this.state.showOtherSubstrate ||
                  this.state.surveyData.st.other !== "") && 
                  <div className="uk-width-expand">
                    <input
                      className="uk-input uk-form-small"
                      type="text"
                      name="st.other"
                      onChange={this.editSurveyData}
                      defaultValue={this.state.surveyData.st.other}
                    />
                  </div>
                }
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Beach Slope:</p>
                <select
                  className="uk-select uk-form-small"
                  name="slope"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.slope}
                >
                  <option value="winter" >Winter</option>
                  <option value="summer" >Summer</option>
                </select>
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Beach Aspect</p>
                <input
                  className="uk-input uk-form-small"
                  type="text"
                  name="aspect"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.aspect}
                />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Wind Direction</p>
                <select
                  className="uk-select uk-form-small"
                  name="wind.dir"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.wind.dir}
                >
                  <option value="n">North</option>
                  <option value="s">South</option>
                  <option value="e">East</option>
                  <option value="w">West</option>
                </select>
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Wind Speed (knots)</p>
                <input
                  className="uk-input uk-form-small"
                  type="number"
                  name="wind.spd"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.wind.spd}
                />
              </div>
              {/* <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Nearest River</p>
                <input className="uk-input uk-form-small" type="text" name="info.nroName" onChange={this.editSurveyData} defaultValue={this.state.info.nroName} />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Distance to Nearest River (mi)</p>
                <input className="uk-input uk-form-small" type="text" name="info.nroDist" onChange={this.editSurveyData} defaultValue={this.state.info.nroDist} />
              </div> */}
              {/* <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Compass Direction (degrees)</p>
                <input
                  className="uk-input uk-form-small"
                  type="number"
                  name="cmpsDir"
                  onChange={this.editSurveyData}
                  defaultValue={this.state.surveyData.cmpsDir}
                />
              </div> */}
            </div>
          </div>

          {/* SRS SECTION*/}
          <EditableTable
            changeDebris={this.changeDebris}
            addNewDebris={this.addDebris}
            options={this.state.srsOptions}
            type="SRS"
            rows={SRSRows}
          />

          {/* TIDE SECTION*/}
          <div id="tide-section">
            <div
              className="uk-card uk-card-default uk-card-body uk-margin-bottom"
            >
              <h3 className="uk-card-title">Tide Information</h3>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <h4>The Last Tide</h4>
                <div>
                  <div>
                    <p>Type</p>
                    <select
                      className="uk-select uk-form-small"
                      name="lastTide.type"
                      onChange={this.editSurveyData}
                      defaultValue={this.state.surveyData.lastTide.type}
                    >
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <p>Time</p>
                  <input
                    className="uk-input uk-form-small"
                    type="time"
                    name="lastTide.time"
                    onChange={this.editSurveyData}
                    defaultValue={this.state.surveyData.lastTide.time}
                  />
                  <p>Height</p>
                  <input
                    className="uk-input uk-form-small"
                    type="number"
                    name="lastTide.height"
                    onChange={this.editSurveyData}
                    defaultValue={this.state.surveyData.lastTide.height}
                  />
                </div>
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <h4>The Next Tide</h4>
                <div>
                  <p>Type</p>
                  <select
                    className="uk-select uk-form-small"
                    name="nextTide.type"
                    onChange={this.editSurveyData}
                    defaultValue={this.state.surveyData.nextTide.type}
                  >
                    <option value="low">Low</option>
                    <option value="high">High</option>
                  </select>

                  <p>Time</p>
                  <input
                    className="uk-input uk-form-small"
                    type="time"
                    name="nextTide.time"
                    onChange={this.editSurveyData}
                    defaultValue={this.state.surveyData.nextTide.time}
                  />

                  <p>Height</p>
                  <input
                    className="uk-input uk-form-small"
                    type="number"
                    name="nextTide.height"
                    onChange={this.editSurveyData}
                    defaultValue={this.state.surveyData.nextTide.height}
                  />
                </div>
              </div>
            </div>
          </div>
          <EditableTable
            changeDebris={this.changeDebris}
            addNewDebris={this.addDebris}
            options={this.state.asOptions}
            type="AS"
            rows={ASRows}
            incompleteSurvey={this.state.surveyData.incompleteSurvey}
          />
          {/* INCOMPLETE SURVEY SECTION*/}
          <div id="incomplete-survey-section">
            <div
              className="uk-card uk-card-default uk-card-body uk-margin-bottom"
            >
              <h3 className="uk-card-title">Incomplete Survey</h3>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Why unable to complete survey</p>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="incompleteSurvey.time"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={
                      this.state.surveyData.incompleteSurvey.time
                    }
                  />
                  <span className="uk-margin-left uk-text-small">
                    Not enough time
                  </span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="incompleteSurvey.people"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={
                      this.state.surveyData.incompleteSurvey.people
                    }
                  />
                  <span className="uk-margin-left uk-text-small">
                    Not enough people
                  </span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="incompleteSurvey.area"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={
                      this.state.surveyData.incompleteSurvey.area
                    }
                  />
                  <span className="uk-margin-left uk-text-small">
                    Too much area
                  </span>
                </div>
                <div>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="incompleteSurvey.trash"
                    onChange={this.editSurveyCheckBoxes}
                    defaultChecked={
                      this.state.surveyData.incompleteSurvey.trash
                    }
                  />
                  <span className="uk-margin-left uk-text-small">
                    Too much trash
                  </span>
                </div>
                <div className="uk-width-auto">
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    onChange={e => {
                      this.setState({
                        showOtherIncompleteSurvey: e.target.checked
                      });
                      if (!e.target.checked) {
                        this.removeOther('incomplete');
                      }
                    }}
                    defaultChecked={
                      this.state.surveyData.incompleteSurvey.other ?
                      true : false}
                  />
                  <span className="uk-margin-left uk-text-small">
                    Other
                  </span>
                </div>
                {console.log(this.state.showOtherIncompleteSurvey)}
                {
                (this.state.showOtherIncompleteSurvey ||
                  this.state.surveyData.incompleteSurvey.other !== "") &&
                  <div className="uk-width-expand">
                    <input
                      className="uk-input uk-form-small"
                      type="text"
                      name="incompleteSurvey.other"
                      onChange={this.editSurveyData}
                      defaultValue={this.state.surveyData.incompleteSurvey.other}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
          {/* MDS SECTION */}
          <div id="MDS-section">
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
        <button className="uk-button button-active" onClick={this.save}
          data-uk-toggle="target: #modal">
          Save Edits
        </button>
      </div>
    );
  }
}

export default SurveyEntryEdit;



