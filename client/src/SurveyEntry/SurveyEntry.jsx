import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { PieChart } from './SurveyCharts'
import { getDebrisMap } from '../NewSurveyForm/debrisInfo'

import SurveyTableRow from './SurveyTableRow';
import { runInThisContext } from 'vm';
import './surveyEntry.css';

const debrisInfo = getDebrisMap();


class SurveyEntry extends Component {
  constructor(props) {
    super(props);
    let { surveyID } = props.match.params;
    this.state = {
      beachName: this.props.location.state.beachName,
      info: this.props.location.state.info,
      surveyID,
      surveyData: {},
      userProfile: this.props.location.state.userProfile,

      deletedComment: false,
      srsSelected: true,
      debrisNA: false,
      editSurvey: false,
      editable: false
    };
    //this.auth = new Auth();
    this.handleChartTypeChange = this.handleChartTypeChange.bind(this);
    this.renderOptions = this.renderOptions.bind(this);

  }

  renderOptions() {
    if (this.state.surveyData.SRSDebris && this.state.surveyData.ASDebris) {
      console.log("Render both")
      //render both options
      return (
        <select className="uk-select uk-form" id="view-type" onChange={this.handleChartTypeChange}>
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
   * to set the state of the Survey component to tell it what to render
   */

  async handleChartTypeChange(e) {
    await this.setState({ view: e.target.value });
    if (this.state.view === 'srs') {
      this.setState({ srsSelected: true })
    } else {
      this.setState({ srsSelected: false })
    }
  }

  getSurvey = () => {
    let userID = this.state.userProfile.sub.split("|")[1];
    
    axios.get(`/beaches/surveys/${this.state.surveyID}`, {
      params: {
        userID
      } 
    })
      .then(res => {
        console.log(res.data);

        this.setState({ surveyData: res.data.survData, editable: res.data.e });
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.getChartData();
      })
      .then(()=> {
        this.getBeachInfo();
      })
  }

  getBeachInfo = () => {
    axios.get(`/beaches/${this.state.surveyData.bID}/info`)
      .then(res => {
        console.log(res.data);
        this.setState({info: res.data});
      })
  }

  /**
   * getChartData: This function will need to extract the SRS and AS debris data in a way
   * that the PieChart can process the data and display it
   */

  getChartData = () => {
    //First, check to see if we even have the data

    if (this.state.surveyData.SRSDebris) {
      //If yes, then we need to sum up the number of pieces picked up for the given trash type
      //add the weathered and fresh totals
      var SRSChartDataObject = {};
      for (const key in this.state.surveyData.SRSDebris) {
        let thisDebrisTotal = this.state.surveyData.SRSDebris[key].fresh + this.state.surveyData.SRSDebris[key].weathered;
        SRSChartDataObject[key] = thisDebrisTotal;
      }
      //Now we can sort the data so that it will display nicely
      var keysSRS = Object.keys(SRSChartDataObject);
      console.log(keysSRS)
      let cleanedKeysSorted = {};
      keysSRS.sort((a, b) => { return (SRSChartDataObject[a] - SRSChartDataObject[b]) });
      for (const i in keysSRS) {
        let key = keysSRS[i];
        let cleanedKey = debrisInfo[key]
        if (cleanedKey === "Fishing Line / Polypropylene Rope")
          cleanedKey = "Fishing Line";
        if (cleanedKey === "Plastic Bottles / Plastic Caps")
          cleanedKey = "Plastic Bottles";
        cleanedKeysSorted[cleanedKey] = SRSChartDataObject[key];
      }
      //Set the state of the component
      this.setState({ chartDataSRS: cleanedKeysSorted });
    } else {
      // We dont have survey data for the surface rib scan!!
      this.setState({ srsSelected: false });
    }
    if (this.state.surveyData.ASDebris) {
      var ASChartDataObject = {};
      for (const key in this.state.surveyData.ASDebris) {
        let thisDebrisTotal = this.state.surveyData.ASDebris[key].fresh + this.state.surveyData.ASDebris[key].weathered;
        ASChartDataObject[key] = thisDebrisTotal;
      }
      //Now we can sort i guess
      var keysAS = Object.keys(ASChartDataObject);
      console.log(keysAS)
      let cleanedKeysSorted = {};
      keysAS.sort((a, b) => { return (ASChartDataObject[a] - ASChartDataObject[b]) });
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

  deleteSurvey = () => {
    axios.delete(`/beaches/surveys/${this.state.surveyID}`,
      {
        params:
        {
          bID: this.state.surveyData.bID,
          dos: this.state.surveyData.survDate,
          userID: this.state.userProfile ? this.state.userProfile.sub : ''
        }
      })
      .then(res => {
        console.log("Survey deleted!")
        this.setState({
          deletedComment: true
        })
        alert("Survey deleted successfully.");
      })
      .catch(err => {
        console.log(err)
      })
  }


  editSurvey = () => {
    axios.get(`/beaches/surveys/${this.state.surveyID}/edit`, {
      params: {
        id: this.state.userProfile ? this.state.userProfile : ''
      }
    })
      .then(res => {
        console.log(this.state.userProfile.sub);
        console.log(res.data);
        this.setState({ editSurvey: true });
      })

  }


  // once the component is on the page, gets the surveyData from the server
  componentDidMount() {
    this.getSurvey();
  }

  editBtns = () => {
    console.log(this.state.editable);
    return (
      <React.Fragment>
        
        {/* Edit and Delete buttons are disabled if user is not logged in or doesn't own the survey */}
        { this.state.editable ? 
          <div className="uk-flex uk-flex-row">
            <button className="uk-button button-active uk-margin-right" onClick={this.editSurvey}>Edit Survey</button>
            <button className="uk-button button-active"
              data-uk-toggle="target: #modal">
              Delete Survey
            </button>
            
          </div>
          :
          <div className="uk-flex uk-flex-row">
            <button className="uk-button button-disabled uk-margin-right" 
              data-uk-toggle="target: #modal">
              Edit Survey</button>
            <button className="uk-button button-disabled"
              data-uk-toggle="target: #modal"
              id="delete">
              Delete Survey</button>
            
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
                <h2>You do not have permission to make changes to this survey.</h2>
                <p>Please log in to continue.</p>
              </div>
            }
            
            <p className="uk-text-right">
              <button className="uk-button uk-button-default uk-modal-close">Cancel</button>
              {this.state.editable ? <button className="uk-button uk-button-danger uk-margin-left" onClick={this.deleteSurvey}>Delete</button> : null}
            </p>

            <button className="uk-modal-close-default" data-uk-close></button>
          </div>
        </div>
      </React.Fragment>
    );

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

      document.getElementById('SRS-section').style.display = this.state.surveyData.SRSDebris ? 'block' : 'none';
      document.getElementById('AS-section').style.display = this.state.surveyData.ASDebris ? 'block' : 'none';
    }

    if (this.state.surveyData.weight || this.state.surveyData.numOfP) {
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
          <div id="survey-area-section" style={{ display: 'none' }}>
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
                  <p><strong>Wind Direction: </strong> {this.state.surveyData.wind.dir}</p> : null
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
          <div id="AS-section" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
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
          </div>
        </div>

        {/* DEBRIS TOTALS AND PIE CHART */}
        <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
          <h2>Debris quantity totals for this survey:</h2>
          <div className="uk-width-1-5">
            {this.renderOptions()}
          </div>
          {this.state.debrisNA ? null : <PieChart chartData={this.state.srsSelected ? this.state.chartDataSRS : this.state.chartDataAS} />}
        </div>

        {this.editBtns()}
      </div>

    );
  }
}

export default SurveyEntry;



