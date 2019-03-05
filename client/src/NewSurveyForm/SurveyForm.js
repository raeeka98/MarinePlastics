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
      console.log(form);
    /*  axios.post("/beaches/surveys", form)
          .then(res => {
              this.setState({
                  isInputting: false,
                  isReviewing: false,
                  isSubmitted: true
                })
          })
          .catch(err => {
              console.log(err)
          })*/
  }

  toTitleCase(word) {
    return word.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  prepareForm() {
    const data = this.state.surveyData;

      const usage = (data.usageRecreation ? "Recreation, " : "") +
                    (data.usageCommercial ? "Commercial, " : "") +
                    (data.usageOther ? data.usageOther : "");



      const form = {
          user : (data.name ? data.name : ""),
          email : (data.email ? data.email : ""),
          reason : usage

      }
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
        prevState.surveyData[key] = val
        return prevState;
    })
  }

  render() {
      return(
        <div className="uk-container">
          {console.log(this.state)}
            {this.state.isInputting && (
            <div>
              <Accordion>
                  <TeamInformation data={this.state.surveyData} updateSurveyState={this.updateSurveyState}/>
                  <SurveyArea data={this.state.surveyData} updateSurveyState={this.updateSurveyState} updateCheckedState={this.updateCheckedState}/>
                  <SurfaceRibScan data={this.state.surveyData} trash={this.state.trash} updateSurveyState={this.updateSurveyState}/>
                  <AccumulationSurvey data={this.state.surveyData} trash={this.state.trash} updateSurveyState={this.updateSurveyState}/>
                  <MicroDebrisSurvey data={this.state.surveyData} updateSurveyState={this.updateSurveyState}/>
                  <Totals updateSurveyState={this.updateSurveyState}/>
              </Accordion>
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
