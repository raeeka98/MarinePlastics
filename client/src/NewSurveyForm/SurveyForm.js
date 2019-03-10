import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Auth from '../Auth';

import AccumulationSurvey from './SurveySubsections/AccumulationSurvey';
import MicroDebrisSurvey from './SurveySubsections/MicroDebrisSurvey';
import SurfaceRibScan from './SurveySubsections/SurfaceRibScan';
import SurveyArea from './SurveySubsections/SurveyArea';
import TeamInformation from './SurveySubsections/TeamInformation';
import Totals from './SurveySubsections/Totals';
import Review from './SurveySubsections/Review';

import {
    Accordion,
} from 'react-accessible-accordion';

import './accordion-styles.css';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.url = '/surveys'
    this.state =
    {
      surveyData : {
        // fields (id's) :
        // TI: userFirst, userLast, orgName, orgLoc, email, cleanUpTime, cleanUpDate
        // SA: beachName, latitude, longitude,
        //     {usageRecreation, usageCommercial, usageOther}
        //     {locationChoiceProximity, locationChoiceDebris, locationChoiceOther}
        //     compassCardinal, compassDegrees, riverName, riverDistance,
        //     {tideTypeB, tideHeightB, tideTimeB},
        //     {tideTypeA, tideHeightA, tideTimeA},
        //     windSpeed, windDir,
        //     {substrateTypeSand, substrateTypePebble, substrateTypeRipRap, substrateTypeSeaweed, substrateTypeOther},
        //
        // SRS: rib1Start, rib2Start, rib3Start, rib4Start, rib1End, rib2End, rib3End, rib4End
        //
        //
        //
        //
      },
      SRSData : {
          // format for debris is: trash_id + ("FreshRib" | "WeatheredRib") + ribNumber
      },
      ASData : {
          // format for debris is: trash_id + "accumulation" + ("Fresh | Weathered | Total")
      },
      displayStrings : {
          usage : "",
          locChoice : "",
          subType : ""
      },
      isInputting: true,
      isReviewing: false,
      isSubmitted: false,
      user: "",
      email: ""
    }
    this.moveToReview = this.moveToReview.bind(this);
    this.moveToInput = this.moveToInput.bind(this);
    this.moveToSubmit = this.moveToSubmit.bind(this);
    this.updateSurveyState = this.updateSurveyState.bind(this);
    this.updateCheckedState = this.updateCheckedState.bind(this);
    this.prepareForm = this.prepareForm.bind(this);
    this.updateSRS = this.updateSRS.bind(this);
    this.updateAS = this.updateAS.bind(this);
  }

  componentDidMount() {
    // check if user is authenticated (redirect if not)
    if(!this.auth.isAuthenticated()){
      window.alert('Please sign in to continue');
      window.location.replace('/');
    }

    // set entry user/email from auth0
    this.auth.getLoggedInProfile((err, profile) => {
      this.setState({
         user: profile.name,
         email: profile.email
       });
    });
  }

 async updateDisplayStrings() {
      const data = this.state.surveyData;

      const _usage = (data.usageRecreation ? "recreation, " : "") +
                    (data.usageCommercial ? "commercial, " : "") +
                    (data.usageOther ? data.usageOther : "");

      const _locChoice = (data.locationChoiceDebris ? "debris, " : "") +
                        (data.locationChoiceProximity ? "proximity, " : "") +
                        (data.locationChoiceOther ? data.locationChoiceOther : "");

      const _subType =   (data.substrateTypeSand ? "sand, " : "") +
                        (data.substrateTypeRipRap ? "rip rap, " : "") +
                        (data.substrateTypePebble ? "pebble, " : "") +
                        (data.substrateTypeSeaweed ? "seaweed, " : "") +
                        (data.substrateTypeOther ? data.substrateTypeOther : "");

      this.setState({
          displayStrings : {
              usage : _usage,
              locChoice : _locChoice,
              subType : _subType
          }
      })
  }

  // returns ID's of invalid elements if invalid, if not, returns empty array;
  validate() {
      let invalid = [];

      const isValidEmail = this.state.surveyData.email &&
                           this.state.surveyData.email.match(/[\w-.]+@([\w-]+\.)+[\w]+/);

      const requiredIDs = ['userFirst', 'userLast', 'orgName', 'orgLoc',
                           'email', 'cleanUpTime', 'cleanUpDate', 'beachName',
                           'latitude', 'longitude'];

      for(const id of requiredIDs) {
          if(!this.state.surveyData[id]) {
              invalid.push(id);
          }
      }

      if(!isValidEmail && this.state.surveyData.email) {
          invalid.push('email (not valid email)');
      }
      return invalid;
  }

  navToID(ids) {
      alert("fill out " + ids);
  }

  moveToReview() {
      const invalidInput = this.validate();
      console.log(invalidInput);
      if (invalidInput && invalidInput.length) {
        this.navToID(invalidInput);
      } else {
        this.updateDisplayStrings();
        this.setState({
            isInputting: false,
            isReviewing: true,
            isSubmitted: false,
        })
      }
  }

  moveToInput() {
      this.setState({
          isInputting: true,
          isReviewing: false,
          isSubmitted: false
      })
  }

  moveToSubmit() {
      const form = this.prepareForm();
      axios.post("beaches/surveys", form)
          .then(res => {
              console.log(res.data);
              this.setState({
                  isInputting: false,
                  isReviewing: false,
                  isSubmitted: true
                })
          })
          .catch(err => {
              console.log(err.response)
          })
  }



  toTitleCase(word) {
    return word.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  calcTotalsSRS() {
      let totals = {};
      let totalsArray = [];

      const data = this.state.SRSData;

      for(const id in data) {
          const noNum = id.replace(/__[1-4]/, '');
          const trash_id = noNum.replace(/__\w+/,'');
          const type = noNum.replace(/\w+__/, '');
          if(!totals[trash_id]) {
              totals[trash_id] = {
                  fresh : 0,
                  weathered : 0
              }
          }
          if(type === "weathered") {
              totals[trash_id].weathered = totals[trash_id].weathered + parseInt(data[id]);
          } else {
              totals[trash_id].fresh = totals[trash_id].fresh + parseInt(data[id]);
          }
      }
      for(const id in totals) {
          totalsArray.push([
              id,
              {fresh: totals[id].fresh, weathered: totals[id].weathered}
          ]);
      }
      return totalsArray;
  }

  calcTotalsAS() {
      let totals = {};
      let totalsArray = [];

      const data = this.state.ASData;

      for(const id in data) {
          const noAcc = id.replace(/__accumulation/i, '');
          const trash_id = noAcc.replace(/__\w+/,'');
          const type = noAcc.replace(/\w+__/, '');
          console.log(trash_id);
          console.log(type);
          if(!totals[trash_id]) {
              totals[trash_id] = {
                  fresh : 0,
                  weathered : 0
              }
          }
          if(type === "weathered") {
              totals[trash_id].weathered = totals[trash_id].weathered + parseInt(data[id]);
          } else {
              totals[trash_id].fresh = totals[trash_id].fresh + parseInt(data[id]);
          }
      }
      for(const id in totals) {
          totalsArray.push([
              id,
              {fresh: totals[id].fresh, weathered: totals[id].weathered}
          ]);
      }
      return totalsArray;
  }

  prepareForm() {
      // for that visual AESTHETIC

      const data = this.state.surveyData;
      const show = this.state.displayStrings;
      console.log(show);

      const form = {
          survData : {
              user : {
                f : (data.userFirst ? data.userFirst : ""),
                l : (data.userLast ? data.userLast : "")
              },
              email : (data.email ? data.email : ""),
              org : (data.orgName ? data.orgName : ""),
              reason : (show.locChoice ? show.locChoice : ""),
              st : (show.subType ? show.subType : ""),
              slope : (data.slope ? data.slope : ""),
              lastTide : {
                  type : (data.tideTypeB ? data.tideTypeB : ""),
                  time : (data.tideTimeB ? data.tideTimeB : ""),
                  height : (data.tideHeightB ? data.tideHeightB : "")
              },
              nextTide : {
                  type : (data.tideTypeA ? data.tideTypeA : ""),
                  time : (data.tideTimeA ? data.tideTimeA : ""),
                  height : (data.tideHeightA ? data.tideHeightA : "")
              },
              wind : {
                  dir : (data.windDir ? data.windDir : ""),
                  spd : (data.windSpeed ? data.windSpeed : "")
              },
              majorUse: (show.usage ? show.usage : ""),
              weight: (data.weight ? data.weight : ""),
              /* SRSDebris: [
                  [cigaretteButts, {
                      fresh (total):
                      weathered (total):
                  }],
                  ...
              ]
              */
              SRSDebris : this.calcTotalsSRS(),
              ASDebris : this.calcTotalsAS(),
              srsDebrisLength : 0,
              asDebrisLength : 0,
              survDate: new Date(data.cleanUpDate+"T"+data.cleanUpTime)
          },
          bID : '5c74f1bc71992a56a570d485'

      }

      return form;
  }

  updateSurveyState(e) {
    const key = e.target.id;
    const val = e.target.value;
    this.setState(prevState => {
        prevState.surveyData[key] = val
        return prevState;
    })
  }

  updateCheckedState(e) {
    const key = e.target.id;
    const val = e.target.checked;
    this.setState(prevState => {
        prevState.surveyData[key] = val;
        return prevState;
    })
  }

  updateSRS(e) {
    const key = e.target.id;
    const val = e.target.value;
    this.setState(prevState => {
        prevState.SRSData[key] = val;
        return prevState;
    })
  }

  updateAS(e) {
    const key = e.target.id;
    const val = e.target.value;
    this.setState(prevState => {
        prevState.ASData[key] = val;
        return prevState;
    })
  }



  render() {
      return(
        <div className="centering-container">
            {this.state.isInputting && (
            <div>
              <form id="surveyForm">
                <Accordion>
                    <TeamInformation
                        data={this.state.surveyData}
                        updateSurveyState={this.updateSurveyState}
                    />
                    <SurveyArea
                        data={this.state.surveyData}
                        updateSurveyState={this.updateSurveyState}
                        updateCheckedState={this.updateCheckedState}
                    />
                    <SurfaceRibScan
                        data={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        updateSurveyState={this.updateSurveyState}
                        updateSRS={this.updateSRS}
                    />
                    <AccumulationSurvey
                        data={this.state.ASData}
                        updateAS={this.updateAS}
                    />
                    <MicroDebrisSurvey
                        data={this.state.surveyData}
                        updateSurveyState={this.updateSurveyState}
                    />
                    <Totals
                        updateSurveyState={this.updateSurveyState}
                        data={this.state.surveyData}
                    />
                  </Accordion>
              </form>
              <div className="submit-button-container">
                <button className="uk-button uk-button-secondary" onClick={this.moveToReview}>Review</button>
              </div>

            </div>
          )}
          {this.state.isReviewing && (
            <div>
              <button className="uk-button uk-button-secondary" onClick={this.moveToInput}>Back to Input</button>
              <Review
                data={this.state.surveyData}
                SRSData={this.state.SRSData}
                ASData={this.state.ASData}
                displayStrings={this.state.displayStrings}
              />
              <button className="uk-button uk-button-disabled" onClick={this.moveToSubmit}>Submit</button>
            </div>
          )}
          {this.state.isSubmitted && (
            <div>
              <h1>Your survey was successfully submitted! </h1>
              <h3>Click <Link to="/home">here</Link> to view your survey.</h3>
              <div className="submit-button-container">
                <button className="uk-button uk-button-secondary" onClick={this.moveToReview}>Back to Review</button>
              </div>

            </div>
          )}


        </div>
      );
  }
}

export default SurveyForm;
