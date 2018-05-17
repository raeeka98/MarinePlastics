import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Auth from '../../Auth';

import FormStep1 from './FormSteps/FormStep1';
import FormStep2 from './FormSteps/FormStep2';
import FormStep3 from './FormSteps/FormStep3';
import FormStep4 from './FormSteps/FormStep4';
import FormStep5 from './FormSteps/FormStep5';
import SubmitConfirm from './FormSteps/SubmitConfirm';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    // temp - need to fix this if want to update to populate elements with original values
    // if (this.props.location !== undefined && this.props.location.state !== undefined  ) {
    //   this.state = this.props.location.state.initialValues;
    // } else {
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
          lastTide: '',
          nextTide: {},
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
            valid: true,
            formStep: 1,
          }
        ],
        currStep: 0,
      }
    // }

    this.handleServerSubmit = this.handleServerSubmit.bind(this);
    this.handleServerUpdate = this.handleServerUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSurveyInput = this.handleSurveyInput.bind(this);
    this.handleTideInput = this.handleTideInput.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);

    this.auth = new Auth();
    this.pollInterval = null;
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
  }

  handleInputChange(e) {
    if (e.target.getAttribute('class').includes('srs')) {
      let SRSData = this.handleSurveyInput(e, this.state.entry.SRSData);
      this.setState({ SRSData });
    } else if (e.target.getAttribute('class').includes('as')) {
      let ASData = this.handleSurveyInput(e, this.state.entry.ASData);
      this.setState({ ASData });
    } else if (e.target.getAttribute('class').includes('next-tide')) {
      let nextTide = this.handleTideInput(e, this.state.entry.nextTide);
      this.setState({ nextTide });
    } else if (e.target.getAttribute('class').includes('last-tide')) {
      let lastTide = this.handleTideInput(e, this.state.entry.lastTide);
      this.setState({ lastTide });
    } else {
      this.setState({ entry: {[e.target.id]: e.target.value }});
    }
  }

  handleValidation(e) {
    let handleInvalid = () => {
      let formPages = this.state.formPages;
      formPages[this.state.currStep].valid = false;
      this.setState({ formPages });
      e.target.classList.add('uk-form-danger');
    }

    let handleValid = () => {
      let formPages = this.state.formPages;
      formPages[this.state.currStep].valid = true;
      this.setState({ formPages });
      if (e.target.classList.contains('uk-form-danger')) e.target.classList.remove('uk-form-danger');
      
    }

    if (e.target.getAttribute('required') !== null && !this.state.entry[e.target.id]) {
      handleInvalid();
      return false;
    } else if (
        (e.target.id === 'weight' || e.target.id === 'NumberOfPeople' ||
        e.target.classList.contains('srs') || e.target.classList.contains('as'))
        && e.target.value < 0
    ) {
      handleInvalid();
      return false;
    } else {
      handleValid();
      return true;
    }
  }
  
  handleTideInput(e, data) {
    data[e.target.id] = e.target.value;
    return data;
  }

  handleSurveyInput(e, data) {
    let isFreshInput = (e.target.className).indexOf('fresh');
    let index = -1;

    for (let i = 0; i < data.length; i++) {
      if ((data[i]).name === e.target.id) { index = i; }
    }

    if (index > -1) {
      if (isFreshInput > -1) {
        (data[index]).fresh = parseInt(e.target.value);
      } else {
        (data[index]).weathered = parseInt(e.target.value);
      }
    } else {
      let newData = { name: e.target.id }
      if (isFreshInput > -1) {
        newData.fresh = parseInt(e.target.value);
        newData.weathered = 0;
      } else {
        newData.fresh = 0;
        newData.weathered = parseInt(e.target.value);
      }
      data.push(newData);
    }
    return data;
  }

  handleServerSubmit(comment) {
    comment.input_date = Date.now();
    console.log('server submit', comment);
    axios.post(this.url, comment)
      .catch(err => { console.error(err); });
  }

  handleServerUpdate(id, comment) {
    //sends the comment id and new beach/reason to our api
    axios.put(`${this.url}/${id}`, comment)
      .catch(err => {
        console.log(err);
      })
  }

  handleFormSubmit(e) {
    if (this.auth.isAuthenticated()) {
      if (this.props.location.state !== undefined) {
        this.handleServerUpdate(this.props.location.state.initialValues._id, this.state.entry);
      } else {
        this.handleServerSubmit(this.state.entry);
      }
    } else {
      window.alert('Please sign in to enter survey data.');
    }

    this.nextStep();
  }

  nextStep() {
    if (this.state.currStep + 1 < this.state.formPages.length) {
      let formPages = this.state.formPages;
      let currStep = this.state.currStep;
      formPages[currStep].hidden = true;
      currStep += 1;
      this.setState({ currStep });
      formPages[currStep].hidden = false;
      this.setState({ formPages });

      document.getElementById('progress').value = currStep + 1;
    }
  }

  previousStep() {
    if (this.state.currStep - 1 > -1) {
      let formPages = this.state.formPages;
      let currStep = this.state.currStep;
      formPages[currStep].hidden = true;
      currStep -= 1;
      this.setState({ currStep });
      formPages[currStep].hidden = false;
      this.setState({ formPages });

      document.getElementById('progress').value = currStep + 1;
    }
  }

  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    }

    if(!this.auth.isAuthenticated()){
      window.alert('Please sign in to continue');
      window.location.replace('/');
    }

    this.auth.getLoggedInProfile((err, profile) => {
      let entry =  this.state.entry;
      entry.user = profile.name;
      entry.email = profile.email;
      this.setState({ entry });
    });

    if (localStorage.BasicCleanUp === '1'){
      let formPages = this.state.formPages;
      formPages.push({
        name: 'Basic Cleanup',
        hidden: true,
        valid: true,
        formStep: 5,
      });
      this.setState({ formPages });
    }
    
    if (
      localStorage.BasicCleanUp === '0' ||
      localStorage.SurfaceRibScan === '1' ||
      localStorage.AccumulationSurvey === '1'
    ) {
      let formPages = this.state.formPages;
      formPages.push({
        name: 'Survey Area',
        hidden: true,
        valid: true,
        formStep: 2,
      });
      this.setState({ formPages });
    }

    if (localStorage.SurfaceRibScan === '1'){
      let formPages = this.state.formPages;
      formPages.push({
        name: 'Surface Rib Scan',
        hidden: true,
        valid: true,
        formStep: 3,
      });
      this.setState({ formPages });
    };

    if (localStorage.AccumulationSurvey === '1'){
      let formPages = this.state.formPages;
      formPages.push({
        name: 'Accumulation Survey',
        hidden: true,
        valid: true,
        formStep: 4,
      });
      this.setState({ formPages });
    };

    let formPages = this.state.formPages;
    formPages.push({
      name: 'Done!',
      hidden: true,
      valid: true,
      formStep: 6,
    });
    this.setState({ formPages });
  }

  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
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
                onClick={ this.previousStep }
                disabled={ !this.state.formPages[this.state.currStep].valid }
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
              >
                Submit Form
              </button>
              : null
            }
            { this.state.currStep < this.state.formPages.length - 2 ?
              <button
                className={ this.state.currStep === 0 ? "uk-button uk-button-primary" : "uk-button uk-button-primary uk-margin-large-left" }
                onClick={ this.nextStep }
                disabled={ !this.state.formPages[this.state.currStep].valid }
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
