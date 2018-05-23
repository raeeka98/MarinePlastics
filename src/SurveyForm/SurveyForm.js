import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../Auth';

import FormStep1 from './FormSteps/FormStep1';
import FormStep2 from './FormSteps/FormStep2';
import FormStep3 from './FormSteps/FormStep3';
import FormStep4 from './FormSteps/FormStep4';
import FormStep5 from './FormSteps/FormStep5';
import SubmitConfirm from './FormSteps/SubmitConfirm';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    // for the entry, the values that are default in the input are default in the state too
    this.state = {
      entry: {
        user: '',
        email: '',
        input_date: '',
        org: '',
        date: '',
        beach: '',
        reason: 'proximity',
        st: 'sand',
        lat: '',
        lon: '' ,
        slope: 'steep',
        nroName: '',
        nroDist: '',
        nroFlow: '',
        nroOut: '',
        aspect: '',
        weather: '',
        lastTide: { type: 'low' },
        nextTide: { type: 'low' },
        windDir: '',
        windSpeed: '',
        majorUse: 'recreation',
        weight: '',
        NumberOfPeople: '',
        SRSTotal: '',
        SRSData: [],
        ASTotal: '',
        ASData: [],
        surveyArea: '',
      },
      formPages: [
        {
          name: 'Clean Up Information',
          hidden: false,
          valid: false,
          formStep: 1,
        }
      ],
      currStep: 0,
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.handleCustomInputChange = this.handleCustomInputChange.bind(this);

    this.auth = new Auth();
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
  }

  handleInputChange(e) {
    // arrow function for handling srs and as data
    let handleSurveyInput = (e, data) => {
      // bool for if input is fresh
      let isFreshInput = e.target.classList.contains('fresh');
      // search index initialized to -1 (not found)
      let index = -1;
  
      // if entry in the data has the same name, sets index to index of result in data
      for (let i = 0; i < data.length; i++) {
        if ((data[i]).name === e.target.id) { index = i; }
      }

      // if not already in data, push a new object to data, also set index to the last element in data (the new one)
      if (index === -1) {
        let newData = {
          name: e.target.id,
          fresh: 0,
          weathered: 0,
        };
        data.push(newData);
        index = data.length - 1;
      }

      // sets value depending if its fresh or weathered
      if (isFreshInput) { (data[index]).fresh = parseInt(e.target.value, 10); }
      else { (data[index]).weathered = parseInt(e.target.value, 10); }

      return data;
    };

    let entry = this.state.entry;

    // changes entry depending on if classlist contains certain class
    if (e.target.classList.contains('srs')) { entry.SRSData = handleSurveyInput(e, entry.SRSData); }
    else if (e.target.classList.contains('as')) { entry.ASData = handleSurveyInput(e, entry.ASData); }
    else if (e.target.classList.contains('next-tide')) { entry.nextTide[e.target.id] = e.target.value; }
    else if (e.target.classList.contains('last-tide')) { entry.lastTide[e.target.id] = e.target.value; } 
    else { entry[e.target.id] = e.target.value; }

    this.setState({ entry });
  }

  handleValidation(e) {
    let formPages = this.state.formPages;

    // handleInvalid/handleValid change the current page's valid value and add/remove the danger class
    let handleInvalid = () => {
      formPages[this.state.currStep].valid = false;
      e.target.classList.add('uk-form-danger');
    }

    let handleValid = () => {
      formPages[this.state.currStep].valid = true;
      if (e.target.classList.contains('uk-form-danger')) { e.target.classList.remove('uk-form-danger'); }
    }

    if (e.target.getAttribute('required') !== null && !this.state.entry[e.target.id]) {
      // if input is required and the value is empty or null, invalid
      handleInvalid();
    } else if (
        (e.target.id === 'weight' || e.target.id === 'NumberOfPeople' ||
        e.target.classList.contains('srs') || e.target.classList.contains('as'))
        && e.target.value < 0
    ) {
      // if input is for weight, number of people, or for srs/as data and value is negative, invalid
      handleInvalid();
    } else {
      // otherwise valid
      handleValid();
    }

    this.setState({ formPages });
  }

  handleCustomInputChange(e) {
    const customTypeRAW = e.target.value;
    // removes whitespace from custom input, capitalizes first letter of words
    const customType = customTypeRAW.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).replace(/\s/g,'');

    // set id of all elements in row to what is in text input
    const rowElements = e.target.parentElement.parentElement.childNodes;
    for (let i = 0; i < rowElements.length; i++) {
      rowElements[i].childNodes[0].id = customType;
    }
  }

  handleFormSubmit(e) {
    if (this.auth.isAuthenticated()) {
      let entry = this.state.entry;
      entry.input_date = Date.now();
      this.setState({ entry });

      // submit entry data to server
      axios.post(this.url, this.state.entry)
        .catch(err => { console.error(err); });
    } else {
      window.alert('Please sign in to enter survey data.');
    }

    // move to final page
    this.changeStep(e)
  }

  changeStep(e) {
    const moveNext = e.target.value === 'next' ? true : false;
    let formPages = this.state.formPages;
    let currStep = this.state.currStep;
    let newStep = this.state.currStep;
    let isInRange = false;

    // check if moving within valid range
    if ((moveNext && currStep + 1 < formPages.length) || (!moveNext && currStep - 1 > -1)) { isInRange = true; }

    if (isInRange) {
      // if moving next, add one. if moving prev, subtract 1.
      newStep = moveNext ? currStep + 1 : currStep - 1;

      // hide/show pages and set new state
      formPages[currStep].hidden = true;
      formPages[newStep].hidden = false;
      this.setState({ currStep: newStep });
      this.setState({ formPages });
    }

    // update progress bar, needs to be + 1 because progress bar starts at 1.
    document.getElementById('progress').value = newStep + 1;
  }

  componentDidMount() {
    // check if user is authenticated (redirect if not)
    if(!this.auth.isAuthenticated()){
      window.alert('Please sign in to continue');
      window.location.replace('/');
    }

    // set entry user/email from auth0
    this.auth.getLoggedInProfile((err, profile) => {
      let entry =  this.state.entry;
      entry.user = profile.name;
      entry.email = profile.email;
      this.setState({ entry });
    });

    let formPages = this.state.formPages;

    // get pages based on contents of localStorage (from ./ChooseForm)
    if (localStorage.BasicCleanUp === '1'){
      formPages.push({
        name: 'Basic Cleanup',
        hidden: true,
        valid: false,
        formStep: 5,
      });
    }
    
    if (
      localStorage.BasicCleanUp === '0' ||
      localStorage.SurfaceRibScan === '1' ||
      localStorage.AccumulationSurvey === '1'
    ) {
      formPages.push({
        name: 'Survey Area',
        hidden: true,
        valid: true,
        formStep: 2,
      });
    }

    if (localStorage.SurfaceRibScan === '1'){
      formPages.push({
        name: 'Surface Rib Scan',
        hidden: true,
        valid: false,
        formStep: 3,
      });
    };

    if (localStorage.AccumulationSurvey === '1'){
      formPages.push({
        name: 'Accumulation Survey',
        hidden: true,
        valid: false,
        formStep: 4,
      });
    };

    formPages.push({
      name: 'Done!',
      hidden: true,
      valid: false,
      formStep: 6,
    });

    this.setState({ formPages });
  }

  render() {
    // based on formpages, return pages components
    let stepsComponents = this.state.formPages.map((el, i) => {
      let component;
      let isStep1Hidden = this.state.currStep === 0 ? false : true;
      if (el.formStep === 1) component = () => { return(<FormStep1 isHidden={isStep1Hidden} handleInputChange={ this.handleInputChange } handleValidation={ this.handleValidation } />); };
      else if (el.formStep === 2) component = () => { return(<FormStep2 isHidden={el.hidden} handleInputChange={ this.handleInputChange } handleValidation={ this.handleValidation } />); };
      else if (el.formStep === 3) component = () => { return(<FormStep3 isHidden={el.hidden} handleInputChange={ this.handleInputChange } handleValidation={ this.handleValidation } />); };
      else if (el.formStep === 4) component = () => { return(<FormStep4 isHidden={el.hidden} handleInputChange={ this.handleInputChange } handleValidation={ this.handleValidation } />); };
      else if (el.formStep === 5) component = () => { return(<FormStep5 isHidden={el.hidden} handleInputChange={ this.handleInputChange } handleValidation={ this.handleValidation } />); };
      else component = component = () => { return(<SubmitConfirm isHidden={el.hidden}/>); };

      return(<div key={ i }>{ component() } </div>);
    });

    return (
      <div>
        <h2>Clean Up Survey</h2>
        <progress className="uk-progress" value="1" max={ this.state.formPages.length } id="progress" />
        <h3>{ this.state.formPages[this.state.currStep].name }</h3>

        { stepsComponents }

        {
          this.state.currStep === this.state.formPages.length - 1 ? 
          null : 
          <div className="uk-flex uk-flex-center uk-margin-medium">
            { this.state.currStep !== 0 ? 
              <button
                className="uk-button uk-button-primary"
                onClick={ this.changeStep }
                disabled={ !this.state.formPages[this.state.currStep].valid }
                value="previous"
              >
                Previous Step
              </button> 
              : null 
            }
            { this.state.currStep === this.state.formPages.length - 2 ? 
              <button
                className={ this.state.currStep === 0 ? "uk-button uk-button-secondary" : "uk-button uk-button-secondary uk-margin-large-left" }
                onClick={ this.handleFormSubmit }
                disabled={ !this.state.formPages[this.state.currStep].valid }
                value="next"
              >
                Submit Form
              </button>
              : null
            }
            { this.state.currStep < this.state.formPages.length - 2 ?
              <button
                className={ this.state.currStep === 0 ? "uk-button uk-button-primary" : "uk-button uk-button-primary uk-margin-large-left" }
                onClick={ this.changeStep }
                disabled={ !this.state.formPages[this.state.currStep].valid }
                value="next"
              >
                Next Step
              </button>
              : null
              }

              { this.state.formPages[this.state.currStep].valid ? 
                null : <div className="uk-text-danger uk-margin-top">Please fix the invalid inputs.</div>
              }
          </div>
        }
      </div>
    );
  }
}

export default SurveyForm;
