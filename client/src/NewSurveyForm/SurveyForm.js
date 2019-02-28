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
      surveyData : {},
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
      let form = this.prepareForm();
      axios.post("/beaches/surveys", form)
          .then(res => {
              this.setState({
                  isInputting: false,
                  isReviewing: false,
                  isSubmitted: true
                })
          })
          .catch(err => {
              console.log(err)
          })
  }

  prepareForm() {
    console.log(this.state.surveyData.firstName + this.state.surveyData.lastName)
      let form = {

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

  render() {
      return(
        <div className="uk-container">
          {console.log(this.state)}
            {this.state.isInputting && (
            <div>
              <Accordion>
                  <TeamInformation data={this.state.surveyData} updateSurveyState={this.updateSurveyState}/>
                  <SurveyArea data={this.state.surveyData} updateSurveyState={this.updateSurveyState}/>
                  <SurfaceRibScan data={this.state.surveyData} trash={this.state.trash} updateSurveyState={this.updateSurveyState}/>
                  <AccumulationSurvey data={this.state.surveyData} trash={this.state.trash} updateSurveyState={this.updateSurveyState}/>
                  <MicroDebrisSurvey data={this.state.surveyData} updateSurveyState={this.updateSurveyState}/>
                  <Totals/>
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
