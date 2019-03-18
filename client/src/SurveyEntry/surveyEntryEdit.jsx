import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { getDebrisMap, debrisNames, getDebrisID } from '../NewSurveyForm/debrisInfo'

import SurveyTableRow from './SurveyTableRow';
import EditableTable from './editableTable'
import './surveyEntry.css';
import './surveyEdit.css';

const debrisInfo = getDebrisMap();


class SurveyEntryEdit extends Component {
  constructor(props) {
    super(props);
    console.log(props.location.state.surveyData);
    let srsOptions = debrisNames;
    let asOptions = debrisNames;

    let srsDebris = [], asDebris = [];
    let { SRSDebris, ASDebris } = props.location.state.surveyData;
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

    this.state = {
      surveyData: props.location.state.surveyData,
      beachName: props.location.state.beachName,
      info: props.location.state.info,
      newData: {},
      origSRSDebris: [...srsDebris],
      origASDebris: [...asDebris],
      srsDebris,
      asDebris,
      asOptions,
      srsOptions
    };
    //this.auth = new Auth();

  }



  windDir = {
    n: "North",
    e: "East",
    s: "South",
    w: "West"
  }

  deleteDebris = (typeOfDebris, deletedTrashID) => {
    console.log(deletedTrashID);
    let newsrsDebris = this.state.srsDebris;
    let newasDebris = this.state.asDebris;
    if (typeOfDebris === "SRS") {
      newsrsDebris = newsrsDebris.filter((val) => val.trashID !== deletedTrashID);
    } else {
      newasDebris = newasDebris.filter((val) => val.trashID !== deletedTrashID);
    }
    this.setState(prevState => {
      return {
        srsDebris: newsrsDebris,
        asDebris: newasDebris
      }
    });
  }

  changeDebris = (typeOfDebris, changedTrashID, valName, newVal) => {
    let newSRSDebris = this.state.srsDebris;
    let newASDebris = this.state.asDebris;
    if (typeOfDebris === "SRS") {
      newSRSDebris = newSRSDebris.map(debris => (debris.trashID === changedTrashID ? { ...debris, [valName]: newVal } : debris));
    } else {
      newASDebris = newASDebris.map(debris => (debris.trashID === changedTrashID ? { ...debris, [valName]: newVal } : debris));
    }
    this.setState(prev => ({
      srsDebris: newSRSDebris,
      asDebris: newASDebris
    }))
  }

  addDebris = (type, trashName) => {
    let newSRS = this.state.srsDebris;
    let newAS = this.state.asDebris;
    let newasOptions = this.state.asOptions;
    let newsrsOptions = this.state.srsOptions;

    if (type === "SRS") {
      newsrsOptions = newsrsOptions.filter(val => val !== trashName);
      newSRS = [...newSRS, { trashName: trashName, trashID: getDebrisID(trashName), fresh: 0, weathered: 0 }];
    } else {
      newasOptions = newasOptions.filter(val => val !== trashName);
      newAS = [...newAS, { trashName: trashName, trashID: getDebrisID(trashName), fresh: 0, weathered: 0 }];
    }
    this.setState(prev => ({
      srsDebris: newSRS,
      asDebris: newAS,
      srsOptions: newsrsOptions,
      asOptions: newasOptions
    }));
    console.log("add");

  }

  editSurveyData = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

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
    }))
  }
  editSurveyCheckBoxes = e => {
    let pathStr = e.target.name;
    let path = pathStr.split(".");
    let oldData = { ...this.state.surveyData };
    let sendingData = { ...this.state.newData };
    if (path.length === 2) {
      oldData[path[0]][path[1]] = !oldData[path[0]][path[1]];
      sendingData[pathStr] = !oldData[path[0]][path[1]];

    } else {
      oldData[path[0]] = oldData[path[0]];
      sendingData[path[0]] = !oldData[path[0]];
    }
    this.setState(prev => ({
      surveyData: oldData,
      newData: sendingData
    }))
  }

  save = () => {
    console.log("save");
    
  }

  render() {
    // redirect if data change actions are being taken
    if (this.state.deletedComment) return <Redirect to="/home" />
    if (this.state.editSurvey) return <Redirect to="/survey" />
    // initializes to null because when component mounts, there is no data yet
    let SRSRows = [];
    let ASRows = [];

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
              <div>
                <strong>Team Leader:</strong>
                <div><input type="text" name="f" onChange={this.editSurveyData} defaultValue={this.state.surveyData.user.f}></input></div>
                <input type="text" name="l" onChange={this.editSurveyData} defaultValue={this.state.surveyData.user.l} />
              </div>
              <p><strong>Organization:</strong> <input type="text" name="org" onChange={this.editSurveyData} defaultValue={this.state.surveyData.org} /></p>
              <p><strong>Email:</strong>
                <input type="email" name="email" onChange={this.editSurveyData} defaultValue={this.state.surveyData.email} />
              </p>
            </div>
          </div>

          <div id="b-cleanup-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Basic Clean Up</h3>
              <p><strong>Number of People:</strong> <input type="number" name="numOfP" onChange={this.editSurveyData} defaultValue={this.state.surveyData.numOfP} /></p>
              <p><strong>Total Weight:</strong> <input type="number" name="weight" onChange={this.editSurveyData} defaultValue={this.state.surveyData.weight} /></p>
            </div>
          </div>

          {/* SURVEY AREA SECTION */}
          <div id="survey-area-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Area</h3>
              <p><strong>GPS Coordinates:</strong> {this.state.info.lat}, {this.state.info.lon}</p>
              <div><strong>Reason for Location Choice: </strong>
                <div><span>Proximity: </span>
                  <input type="checkbox" name="reason.prox" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.majorUse.rec} />
                </div>
                <div><span>Debris: </span>
                  <input type="checkbox" name="reason.debris" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.majorUse.com} />
                </div>
                <div>
                  <span>Other: </span>
                  <input type="text" name="majorUse.reason.other" onChange={this.editSurveyData} defaultValue={this.state.surveyData.majorUse.other} />
                </div>
              </div>
              <div>
                <strong>Major Use: </strong>
                <div><span>Recreation: </span>
                  <input type="checkbox" name="majorUse.rec" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.majorUse.rec} />
                </div>
                <div><span>Commercial: </span>
                  <input type="checkbox" name="majorUse.com" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.majorUse.com} />
                </div>
                <div>
                  <span>Other: </span>
                  <input type="text" name="majorUse.other" onChange={this.editSurveyData} defaultValue={this.state.surveyData.majorUse.other} />
                </div>
              </div>
              <div><strong>Substrate Type: </strong>
                <div><span>Sand: </span>
                  <input type="checkbox" name="st.s" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.st.s} />
                </div>
                <div><span>Pebble: </span>
                  <input type="checkbox" name="st.p" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.st.p} />
                </div>
                <div>
                  <span>Other: </span>
                  <input type="text" name="st.other" onChange={this.editSurveyData} defaultValue={this.state.surveyData.st.other} />
                </div>
              </div>
              <p>
                <strong>Beach Slope:</strong>
                <select name="slope" onChange={this.editSurveyData} defaultValue={this.state.surveyData.slope}>
                  <option value="winter" >Winter</option>
                  <option value="summer" >Summer</option>
                </select>
              </p>
              <p><strong>Beach Aspect:</strong>
                <input type="text" name="aspect" onChange={this.editSurveyData} defaultValue={this.state.surveyData.aspect} />
              </p>
              <p><strong>Wind Direction: </strong>
                <select name="wind.dir" onChange={this.editSurveyData} defaultValue={this.state.surveyData.wind.dir}>
                  <option value="n">North</option>
                  <option value="s">South</option>
                  <option value="e">East</option>
                  <option value="w">West</option>
                </select></p>
              <p><strong>Wind Speed: </strong> <input type="number" name="wind.spd" onChange={this.editSurveyData} defaultValue={this.state.surveyData.wind.spd} /> knots</p>
              <p><strong>Nearest River:</strong> <input type="text" name="info.nroName" onChange={this.editSurveyData} defaultValue={this.state.info.nroName} /></p>
              <p><strong>Distance to Nearest River:</strong> <input type="text" name="info.nroDist" onChange={this.editSurveyData} defaultValue={this.state.info.nroDist} /> mi</p>
              <p><strong>Compass Direction:</strong> <input type="number" name="cmpsDir" onChange={this.editSurveyData} defaultValue={this.state.surveyData.cmpsDir} /> Degrees</p>
            </div>
          </div>

          {/* SRS SECTION*/}
          <EditableTable changeDebris={this.changeDebris} addNewDebris={this.addDebris} options={this.state.srsOptions} type="SRS" rows={SRSRows} />

          {/* TIDE SECTION*/}
          <div id="tide-section">
            <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
              <h3 className="uk-card-title">Tide Information</h3>
              <h4>The Last Tide</h4>
              <div>
                <div>
                  <p><strong>Type: </strong>
                    <select name="lastTide.type" onChange={this.editSurveyData} defaultValue={this.state.surveyData.lastTide.type}>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </select>
                  </p>
                  <p>
                    <strong>Time: </strong>
                    <input type="time" name="lastTide.time" onChange={this.editSurveyData} defaultValue={this.state.surveyData.lastTide.time} />
                  </p>
                  <p><strong>Height:</strong> <input type="number" name="lastTide.height" onChange={this.editSurveyData} defaultValue={this.state.surveyData.lastTide.height} />
                  </p>
                </div>
              </div>
              <h4>The Next Tide</h4>
              <div>
                <div>
                  <p><strong>Type: </strong>
                    <select name="nextTide.type" onChange={this.editSurveyData} defaultValue={this.state.surveyData.nextTide.type}>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </select>
                  </p>
                  <p>
                    <strong>Time: </strong>
                    <input type="time" name="nextTide.time" onChange={this.editSurveyData} defaultValue={this.state.surveyData.nextTide.time} />
                  </p>
                  <p><strong>Height:</strong> <input type="number" name="nextTide.height" onChange={this.editSurveyData} defaultValue={this.state.surveyData.nextTide.height} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <EditableTable changeDebris={this.changeDebris} addNewDebris={this.addDebris} options={this.state.asOptions} type="AS" rows={ASRows} />

        </div>

        <button className="uk-button button-active" onClick={this.save}
          data-uk-toggle="target: #modal">
          Save Edits
            </button>
      </div >

    );
  }
}

export default SurveyEntryEdit;



