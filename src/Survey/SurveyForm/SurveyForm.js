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

import '../progress.css';
// Validation for the survey form
// submitting on the next step

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
          reason: '',
          st: '',
          lat: '',
          lon: '' ,
          slope: '',
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
          majorUse: '',
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
    }else if (e.target.getAttribute('class').includes('last-tide')) {
      let lastTide = this.handleTideInput(e, this.state.entry.lastTide);
      this.setState({ lastTide });
    } else {
      // var isvalid = isValidated(e.target.value)
      // if isvalid = true
        this.setState({ entry: {[e.target.id]: e.target.value }});
      // else 
        // e.target.class add the ui-warning
        // make a dialog saying 'yo not valid'
    }
  }
  
  isValidated(e) {
    
    
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
      this.setState({ entry: {
        user: profile.name,
        email: profile.email,
      }});
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
    } else if (localStorage.BasicCleanUp === '0') {
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
      if (el.formStep === 1) component = <FormStep1 isHidden={isStep1Hidden} handleInputChange={ this.handleInputChange } />;
      else if (el.formStep === 2) component = <FormStep2 isHidden={el.hidden} handleInputChange={ this.handleInputChange } />;
      else if (el.formStep === 3) component = <FormStep3 isHidden={el.hidden} handleInputChange={ this.handleInputChange } />;
      else if (el.formStep === 4) component = <FormStep4 isHidden={el.hidden} handleInputChange={ this.handleInputChange } />;
      else if (el.formStep === 5) component = <FormStep5 isHidden={el.hidden} handleInputChange={ this.handleInputChange } />;
      else component = <SubmitConfirm isHidden={el.hidden}/>;

      return(<div key={ i }>{ component } </div>);
    });

    return (
      <div>
        <h2>Clean Up Survey</h2>

        <progress className="uk-progress" value="1" max={ this.state.formPages.length } id="progress" />

        <h3>{ this.state.formPages[this.state.currStep].name }</h3>

        { stepsComponents }

        { this.state.currStep !== 0 && this.state.currStep <= this.state.formPages.legnth  ? 
          <button className="uk-button uk-button-primary" onClick={ this.previousStep }>
            Previous Step
          </button> 
          : null 
        }
        { this.state.currStep < this.state.formPages.length - 2 ?
          <button className="uk-button uk-button-primary" onClick={ this.nextStep }>
            Next Step
          </button>
          : null
        }
        { this.state.currStep === this.state.formPages.length - 2 ? 
          <button className="uk-button uk-button-secondary" onClick={ this.handleFormSubmit }>
            Submit Form
          </button>
          : null
        }
      </div>
    );
  }
}

export default SurveyForm;
