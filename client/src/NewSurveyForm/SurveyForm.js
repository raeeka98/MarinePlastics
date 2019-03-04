import React, { Component } from 'react';
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
        // TI: name, orgName, orgLoc, email, cleanUpTime, cleanUpDate
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
        //      format for debris is: trash_id + ("FreshRib" | "WeatheredRib") + ribNumber
        //
        //
        //
      },
      isInputting: true,
      isReviewing: false,
      isSubmitted: false,
      trash: [],
      user: "",
      email: ""
    }
    this.moveToReview = this.moveToReview.bind(this);
    this.moveToInput = this.moveToInput.bind(this);
    this.moveToSubmit = this.moveToSubmit.bind(this);
    this.updateSurveyState = this.updateSurveyState.bind(this);
    this.updateCheckedState = this.updateCheckedState.bind(this);
    this.prepareForm = this.prepareForm.bind(this);
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

    axios.get("/beaches/trash")
      .then(res => {
        this.setState({trash: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  moveToReview() {
      this.setState({
          isInputting: false,
          isReviewing: true,
          isSubmitted: false
      })
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

  prepareForm() {
    const data = this.state.surveyData;

      const usage = (data.usageRecreation ? "Recreation, " : "") +
                    (data.usageCommercial ? "Commercial, " : "") +
                    (data.usageOther ? data.usageOther : "");

      const locChoice = (data.locationChoiceDebris ? "Debris, " : "") +
                        (data.locationChoiceProximity ? "Proximity, " : "") +
                        (data.locationChoiceOther ? data.locationChoiceOther : "");

      const subType =   (data.substrateTypeSand ? "Sand, " : "") +
                        (data.substrateTypeRipRap ? "Sand, " : "") +
                        (data.substrateTypePebble ? "Pebble, " : "") +
                        (data.substrateTypeSeaweed ? "Pebble, " : "") +
                        (data.substrateTypeOther ? data.substrateTypeOther : "");

      const dateTime = (data.cleanUpDate ? data.cleanUpDate : "") +
                       (data.cleanUpTime ? data.cleanUpTime : "");

      const form = {
          user : (data.name ? data.name : ""),
          email : (data.email ? data.email : ""),
          org : (data.orgName ? data.orgName : ""),
          reason : (locChoice ? locChoice : ""),
          st : (subType ? subType : ""),
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
          windDir: (data.windDir ? data.windDir : ""),
          windSpeed: (data.windSpeed ? data.windSpeed : ""),
          majorUse: (usage ? usage : ""),
          weight: (data.weight ? data.weight : ""),
          SRSDebris : {},
          ASDebris : {},
          srsDebrisLength : 0,
          asDebrisLength : 0,
          survDate: Date.now(),
          beachID: '5c74f1bc71992a56a570d485'
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

  render() {
      return(
        <div>
          {console.log(this.state.surveyData)}
            {this.state.isInputting && (
            <div>
              <form id="surveyForm">
                <Accordion>
                    <TeamInformation data={this.state.surveyData} updateSurveyState={this.updateSurveyState}/>
                    <SurveyArea data={this.state.surveyData} updateSurveyState={this.updateSurveyState} updateCheckedState={this.updateCheckedState}/>
                    <SurfaceRibScan data={this.state.surveyData} trash={this.state.trash} updateSurveyState={this.updateSurveyState}/>
                    <AccumulationSurvey data={this.state.surveyData} trash={this.state.trash} updateSurveyState={this.updateSurveyState}/>
                    <MicroDebrisSurvey data={this.state.surveyData} updateSurveyState={this.updateSurveyState}/>
                    <Totals updateSurveyState={this.updateSurveyState}/>
                  </Accordion>
              </form>
              <button className="uk-button uk-button-secondary" onClick={this.moveToReview}>Review</button>
            </div>
          )}
          {this.state.isReviewing && (
            <div>
              <Review data={this.state.surveyData}/>
              <button className="uk-button uk-button-secondary" onClick={this.moveToInput}>Back to Input</button>
              <button className="uk-button uk-button-disabled" onClick={this.moveToSubmit}>Submit</button>
            </div>
          )}
          {this.state.isSubmitted && (
            <div>
              <h1>submitted!! </h1>
                <button className="uk-button uk-button-secondary" onClick={this.moveToReview}>Back to Review</button>
            </div>
          )}


        </div>
      );
  }
}

export default SurveyForm;
