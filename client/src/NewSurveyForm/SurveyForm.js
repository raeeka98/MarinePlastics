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
         user : profile.name,
         email : profile.email,
         userID : profile.sub
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

      const isValidEmail = this.state.email &&
                           this.state.email.match(/[\w-.]+@([\w-]+\.)+[\w]+/);

      const requiredIDs = ['userFirst', 'userLast', 'orgName', 'orgLoc',
                          'cleanUpTime', 'cleanUpDate', 'beachName',
                           'latitude', 'longitude'];

      for(const id of requiredIDs) {
          if(!this.state.surveyData[id]) {
              invalid.push(id);
          }
      }

      if(!isValidEmail) {
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
      console.log(form);
      axios.post("beaches/surveys", form)
          .then(res => {
              console.log(res.data);
              if(res.data.survID === undefined) {

              } else {
                this.setState({
                    isInputting: false,
                    isReviewing: false,
                    isSubmitted: true
                  })
              }
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

      const cardinalMap = {
          North : 'N',
          Northeast : 'NE',
          East : 'E',
          Southeast : 'SE',
          South : 'S',
          Southwest : 'SW',
          West : 'W',
          Northwest : 'NW',
          None : ''
      }

      const data = this.state.surveyData;
      let date = new Date(data.cleanUpDate);
      const min = parseInt(data.cleanUpTime.replace(/[0-9]+:/, ''));
      const hr = parseInt(data.cleanUpTime.replace(/:[0-9]+/, ''));

      date = parseInt(date.valueOf()) + (((hr * 60) + min) * 100000);
      console.log(date);

      /*
      bID: { type: mongoose.Types.ObjectId, ref: 'Beaches', index: true },
      user: {
          f: {
              type: String,
              alias: "first"
          },
          l: {
              type: String,
              alias: "last"
          },
      },
      userID: String,
      email: {
          type: String,
      },
      org: {
          type: String,
      },
      reason: locationReason,
      survDate: {
          type: Date,
      },
      st: substrateTypeSchema,
      slope: String,
      cmpsDir: {
          type: Number,
          alias: "compassDirection"
      },
      lastTide: tideSchema,
      nextTide: tideSchema,
      wind: {
          dir: { type: String },
          spd: { type: Number }
      },
      majorUse: majorUsageSchema,
      numOfP: {
          type: Number,
          alias: "NumberOfPeople"
      },
      SRSDebris: {
          type: Map,
          of: newDataSchema
      },
      ASDebris: {
          type: Map,
          of: newDataSchema
      },
      srsDebrisLength: { type: Number, required: true, min: 0 },
      asDebrisLength: { type: Number, required: true, min: 0 }
      */
      const form = {
          survData : {
              user : {
                first : (data.userFirst ? data.userFirst : ""),
                last : (data.userLast ? data.userLast : "")
              },
              userID : this.state.userID,
              email : this.state.email,
              org : (data.orgName ? data.orgName : ""),
              reason : {
                  prox: data.locationChoiceProximity,
                  debris: data.locationChoiceProximity,
                  other: data.locationChoiceOther ? data.locationChoiceOther : ""
              },
              survDate: date,
              st : {
                  s : data.substrateTypeSand,
                  p : data.substrateTypePebble,
                  rr : data.substrateTypeRipRap,
                  sea : data.substrateTypeSeaweed,
                  other : data.substrateTypeOther ? data.substrateTypeOther : ""
              },
              slope : (data.slope ? data.slope : ""),
              compassDirection : (data.compassDegrees ? data.compassDegrees : ""),
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
                  dir : (data.windDir ? cardinalMap[data.windDir] : ""),
                  spd : (data.windSpeed ? data.windSpeed : "")
              },
              majorUse: {
                  rec : data.usageRecreation,
                  com : data.usageCommercial,
                  other : (data.usageOther ? data.usageOther : "")
              },
              numOfP : data.numofP ? data.numOfP : 0,
              weight: (data.weight ? data.weight : ""),
              SRSDebris : this.calcTotalsSRS(),
              ASDebris : this.calcTotalsAS(),
              srsDebrisLength : 0,
              asDebrisLength : 0

          },

          bID : data.beachID ? data.beachID : data.beachName,

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
    console.log(this.state.ASData)
  }

  //alternative
  setSurveyData = (key, val) => {
    this.setState(prevState => {prevState.surveyData[key] = val; return prevState});
  }

  render() {
      return(
        <div className="centering-container">
            {this.state.isInputting && (
            <div style={{marginLeft:'7vw'}}>
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
                        setSurveyData={this.setSurveyData}
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
