import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { getAllDebris, allDebrisNames, getAllDebrisID,getDebrisID } from '../NewSurveyForm/debrisInfo'

import SurveyTableRow from './SurveyTableRow';
import EditableTable from './editableTable'
import './surveyEntry.css';
import './surveyEdit.css';

const debrisInfo = getAllDebris();


class SurveyEntryEdit extends Component {
  constructor(props) {
    super(props);
    let srsOptions = allDebrisNames;
    let asOptions = allDebrisNames;

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
      userProfile: props.location.state.userProfile,
      newData: {},
      origSRSDebris: [...srsDebris],
      origASDebris: [...asDebris],
      srsDebris,
      asDebris,
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

  deleteDebris = (typeOfDebris, deletedTrashID) => {
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

  }

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
    let newASDebris = [];
    this.state.asDebris.forEach(val => {
      
      newASDebris.push([val.trashID, { fresh: val.fresh, weathered: val.weathered }])
    });
    let newSRSDebris = [];
    this.state.srsDebris.forEach(val => {
      console.log(val);
      newSRSDebris.push([val.trashID, { fresh: val.fresh, weathered: val.weathered }])
    });
    let oldSRSDebris = this.state.origSRSDebris.map(val => [val.trashID, { fresh: val.fresh, weathered: val.weathered }]);
    let oldASDebris = this.state.origASDebris.map(val => [val.trashID, { fresh: val.fresh, weathered: val.weathered }]);
    let finalData = {
      newSRSDebris,
      newASDebris,
      oldSRSDebris,
      oldASDebris,
      changedInfo: { ...this.state.newData }
    }
    axios.post(`/beaches/surveys/${this.state.surveyData._id}`,
      finalData, {
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
        <div data-uk-grid="masonry: true" className="uk-grid uk-grid-large uk-grid-match uk-width-1 uk-child-width-1-2@m">
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Team Information</h3>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Team Leader</p>
                <input className="uk-input uk-form-small uk-margin-small-bottom" type="text" name="user.f" onChange={this.editSurveyData} defaultValue={this.state.surveyData.user.f}></input>
                <input className="uk-input uk-form-small" type="text" name="user.l" onChange={this.editSurveyData} defaultValue={this.state.surveyData.user.l} />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Organization</p>
                <input className="uk-input uk-form-small" type="text" name="org" onChange={this.editSurveyData} defaultValue={this.state.surveyData.org} />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Email</p>
                <input className="uk-input uk-form-small" type="email" name="email" onChange={this.editSurveyData} defaultValue={this.state.surveyData.email} />
              </div>
            </div>
          </div>

          <div id="b-cleanup-section" >
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Basic Clean Up</h3>
              <div className="uk-grid">
                <div className="uk-width-1-2">
                  <p>Number of People</p>
                  <input className="uk-input uk-form-small" type="number" name="numOfP" onChange={this.editSurveyData} defaultValue={this.state.surveyData.numOfP} />
                </div>
                <div className="uk-width-1-2">
                  <p>Total Weight (lbs)</p>
                  <input className="uk-input uk-form-small" type="number" name="weight" onChange={this.editSurveyData} defaultValue={this.state.surveyData.weight} />
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
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Reason for Location Choice</p>
                <div>
                  <input className="uk-checkbox" type="checkbox" name="reason.prox" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.majorUse.rec} />
                  <span className="uk-margin-left uk-text-small">Proximity</span>
                </div>
                <div>
                  <input className="uk-checkbox" type="checkbox" name="reason.debris" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.majorUse.com} />
                  <span className="uk-margin-left uk-text-small">Debris</span>
                </div>
                <div className="uk-grid uk-margin-small-top otherInput">
                  <div className="uk-width-auto">
                    <input className="uk-checkbox" type="checkbox" defaultChecked={this.state.surveyData.majorUse.other ? true : false} />
                  </div>
                  <div className="uk-width-expand">
                    <input className="uk-input uk-form-small" type="text" name="majorUse.reason.other" onChange={this.editSurveyData} defaultValue={this.state.surveyData.majorUse.other} placeholder="Other" />
                  </div>
                </div>
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Major Use</p>
                <div>
                  <input className="uk-checkbox" type="checkbox" name="majorUse.rec" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.majorUse.rec} />
                  <span className="uk-margin-left uk-text-small">Recreation</span>
                </div>
                <div>
                  <input className="uk-checkbox" type="checkbox" name="majorUse.com" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.majorUse.com} />
                  <span className="uk-margin-left uk-text-small">Commercial</span>
                </div>
                <div className="uk-grid uk-margin-small-top otherInput">
                  <div className="uk-width-auto">
                    <input className="uk-checkbox" type="checkbox" defaultChecked={this.state.surveyData.majorUse.other ? true : false} />
                  </div>
                  <div className="uk-width-expand">
                    <input className="uk-input uk-form-small" type="text" name="majorUse.other" onChange={this.editSurveyData} defaultValue={this.state.surveyData.majorUse.other} placeholder="Other" />
                  </div>
                </div>
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Substrate Type</p>
                <div>
                  <input className="uk-checkbox" type="checkbox" name="st.s" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.st.s} />
                  <span className="uk-margin-left uk-text-small">Sand</span>
                </div>
                <div>
                  <input className="uk-checkbox" type="checkbox" name="st.p" onChange={this.editSurveyCheckBoxes} defaultChecked={this.state.surveyData.st.p} />
                  <span className="uk-margin-left uk-text-small">Pebble</span>
                </div>
                <div className="uk-grid uk-margin-small-top otherInput">
                  <div className="uk-width-auto">
                    <input className="uk-checkbox" type="checkbox" defaultChecked={this.state.surveyData.majorUse.other ? true : false} />
                  </div>
                  <div className="uk-width-expand">
                    <input className="uk-input uk-form-small" type="text" name="st.other" onChange={this.editSurveyData} defaultValue={this.state.surveyData.st.other} placeholder="Other" />
                  </div>
                </div>
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Beach Slope:</p>
                <select className="uk-select uk-form-small" name="slope" onChange={this.editSurveyData} defaultValue={this.state.surveyData.slope}>
                  <option value="winter" >Winter</option>
                  <option value="summer" >Summer</option>
                </select>
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Beach Aspect</p>
                <input className="uk-input uk-form-small" type="text" name="aspect" onChange={this.editSurveyData} defaultValue={this.state.surveyData.aspect} />

              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Wind Direction</p>
                <select className="uk-select uk-form-small" name="wind.dir" onChange={this.editSurveyData} defaultValue={this.state.surveyData.wind.dir}>
                  <option value="n">North</option>
                  <option value="s">South</option>
                  <option value="e">East</option>
                  <option value="w">West</option>
                </select>
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Wind Speed (knots)</p>
                <input className="uk-input uk-form-small" type="number" name="wind.spd" onChange={this.editSurveyData} defaultValue={this.state.surveyData.wind.spd} />
              </div>
              {/* <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Nearest River</p>
                <input className="uk-input uk-form-small" type="text" name="info.nroName" onChange={this.editSurveyData} defaultValue={this.state.info.nroName} />
              </div>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Distance to Nearest River (mi)</p>
                <input className="uk-input uk-form-small" type="text" name="info.nroDist" onChange={this.editSurveyData} defaultValue={this.state.info.nroDist} />
              </div> */}
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <p>Compass Direction (degrees)</p>
                <input className="uk-input uk-form-small" type="number" name="cmpsDir" onChange={this.editSurveyData} defaultValue={this.state.surveyData.cmpsDir} />
              </div>
            </div>
          </div>

          {/* SRS SECTION*/}
          <EditableTable changeDebris={this.changeDebris} addNewDebris={this.addDebris} options={this.state.srsOptions} type="SRS" rows={SRSRows} />

          {/* TIDE SECTION*/}
          <div id="tide-section">
            <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
              <h3 className="uk-card-title">Tide Information</h3>
              <div className="uk-padding-small uk-padding-remove-horizontal">
                <h4>The Last Tide</h4>
                <div>
                  <div>
                    <p>Type</p>
                    <select className="uk-select uk-form-small" name="lastTide.type" onChange={this.editSurveyData} defaultValue={this.state.surveyData.lastTide.type}>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <p>Time</p>
                  <input className="uk-input uk-form-small" type="time" name="lastTide.time" onChange={this.editSurveyData} defaultValue={this.state.surveyData.lastTide.time} />
                  <p>Height</p>
                  <input className="uk-input uk-form-small" type="number" name="lastTide.height" onChange={this.editSurveyData} defaultValue={this.state.surveyData.lastTide.height} />
                </div>
              </div>

              <div className="uk-padding-small uk-padding-remove-horizontal">
                <h4>The Next Tide</h4>
                <div>
                  <p>Type</p>
                  <select className="uk-select uk-form-small" name="nextTide.type" onChange={this.editSurveyData} defaultValue={this.state.surveyData.nextTide.type}>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                  </select>

                  <p>Time</p>
                  <input className="uk-input uk-form-small" type="time" name="nextTide.time" onChange={this.editSurveyData} defaultValue={this.state.surveyData.nextTide.time} />

                  <p>Height</p>
                  <input className="uk-input uk-form-small" type="number" name="nextTide.height" onChange={this.editSurveyData} defaultValue={this.state.surveyData.nextTide.height} />

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



