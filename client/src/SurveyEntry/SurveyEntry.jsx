import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
      surveyData: {},
      userProfile : this.props.location.state.userProfile,
     // getUserProfile: this.props.location.state.getUserProfile,
      //isAuth: this.props.location.state.isAuth,
      deletedComment: false
    };
    console.log(this.state.userProfile)
    //this.auth = new Auth();
  }

  getSurvey = () => {
    axios.get(`/beaches/surveys/${this.state.surveyID}`)
      .then(res => {
        console.log(res.data);
        this.setState({ surveyData: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteSurvey = () => {
    if(!this.state.userProfile){
      alert("You must be logged in to delete a survey");
    } else {
      if(this.state.userProfile.name !== this.state.surveyData.email){
        alert("You cannot delete this survey because you did not create it")
      } else {
        alert("deleted survey!");
      }/*
      axios.delete(`/beaches/surveys/${this.state.surveyID}`, 
      { params:
        {
          bID: this.state.surveyData.bID,
          dos: this.state.surveyData.survDate
        }
      })
        .then(res => {
          console.log("Survey deleted!")
          this.setState({
            deletedComment: true
          })
        })
        .catch(err => {
          console.log(err)
        })*/
    }
  }

  showConfirmationModal = () => {
    return (
      <div id="confirmationModal" className="uk-modal">
        <div className="uk-modal-dialog">
          <h1>Are you sure you want to delete this survey?</h1>
          <button className="uk-button uk-button-default">Cancel</button>
          <button className="uk-button uk-button-danger">Delete</button>
        </div>
      </div>
    )
  }

  componentWillMount() {
    if(this.state.userProfile){
      console.log(this.state.userProfile)
    }
  }
  
  // once the component is on the page, gets the surveyData from the server
  componentDidMount() {
    this.getSurvey();
  }

  render() {
    // redirect if data change actions are being taken
    if (this.state.deletedComment) return <Redirect to="/home" />

    // initializes to null because when component mounts, there is no data yet
    let SRSRows = [];
    let ASRows = [];
    console.log(this.state.surveyData);

    // if there is data (which is once the component mounts)
    if (this.state.surveyData.SRSDebris) {
      let { SRSDebris, ASDebris } = this.state.surveyData;
      // for every type of trash, return a surveyTableRow component with the data
      for (const trash in SRSDebris) {
        const trashData = SRSDebris[trash];
        SRSRows.push(
          <SurveyTableRow
            key={trash}
            name={trash}
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
            name={trash}
            fresh={trashData.fresh}
            weathered={trashData.weathered}
          />
        );
      }

      document.getElementById('SRS-section').style.display = this.state.surveyData.srsDebrisLength > 0 ? 'block' : 'none';
      document.getElementById('AS-section').style.display = this.state.surveyData.asDebrisLength > 0 ? 'block' : 'none';
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
    console.log(this.props.location.state.info);
    return (
      <div className="uk-container">
        <h2 className="uk-text-primary uk-heading-primary">
          <Link to={{ pathname: `/location/${this.state.beachName.replace(/\s/g, '')}`, state: { data: this.props.location.state.info, userProfile: this.state.userProfile } }}>
            {this.state.beachName}
          </Link>
          <span className="uk-text-muted uk-text-large uk-margin-left">
            {this.state.surveyData.date}
          </span>
        </h2>
        <div className="uk-grid uk-grid-large uk-grid-match uk-width-1 uk-child-width-1-2">
          <div>
            <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
              <h3 className="uk-card-title">Team Information</h3>
              <p><strong>Team Leader:</strong> {this.state.surveyData.user}</p>
              <p><strong>Organization:</strong> {this.state.surveyData.org}</p>
              <p><strong>Email:</strong> {this.state.surveyData.email}</p>
            </div>
          </div>
          
          <div id="tide-section" className=" uk-margin-bottom" style={{ display: 'none' }}>
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
          <div id="survey-area-section" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
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
          
          
         
          <div id="b-cleanup-section" className=" uk-margin-bottom" >
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
          <div id="SRS-section" style={{ display: 'none' }}>
          <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
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
          
        
        
        <button className="uk-button uk-button-danger" onClick={this.deleteSurvey}>Delete Survey</button>
      </div>
      
    );
  }
}

export default SurveyEntry;
