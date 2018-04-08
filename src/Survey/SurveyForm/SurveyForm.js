import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import axios from 'axios';

import Auth from '../../Auth';

import FormStep1 from './FormSteps/FormStep1';
import FormStep2 from './FormSteps/FormStep2';
import FormStep3 from './FormSteps/FormStep3';
import FormStep4 from './FormSteps/FormStep4';
import FormStep5 from './FormSteps/FormStep5';
import SubmitConfirm from './FormSteps/SubmitConfirm';

import '../Style.css';
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
        nextTide: '',
        windDir: '',
        majorUse: '',
        weight: '',
        NumberOfPeople: '',
        SRSTotal: '',
        SRSData: [],
        ASTotal: '',
        ASData: [],
      }
    // }

    this.handleServerSubmit = this.handleServerSubmit.bind(this);
    this.handleServerUpdate = this.handleServerUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSurveyInput = this.handleSurveyInput.bind(this);

    this.auth = new Auth();
    this.pollInterval = null;
    this.url = 'http://localhost:3001/api/comments';
  }

  handleInputChange(e) {
    if (e.target.getAttribute('class').includes('srs')) {
      let SRSData = this.handleSurveyInput(e, this.state.SRSData);
      this.setState({ SRSData });
    } else if (e.target.getAttribute('class').includes('as')) {
      let ASData = this.handleSurveyInput(e, this.state.ASData);
      this.setState({ ASData });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
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
        this.handleServerUpdate(this.props.location.state.initialValues._id, this.state);
      } else {
        this.handleServerSubmit(this.state);
      }
    } else {
      window.alert('Please sign in to enter survey data.');
    }
  }

  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    }

    this.auth.getLoggedInProfile((err, profile) => {
      this.setState({
        user: profile.name,
        email: profile.email,
      });
    });
  }

  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    const steps = [
      {
        name:'Clean Up Information',
        component:
          <FormStep1
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Survey Area',
        component:
          <FormStep2
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Surface Rib Scan',
        component:
          <FormStep3
            title={ 'Surface Rib Scan' }
            class={ 'srs' }
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Accumulation Survey',
        component:
          <FormStep4
            title={ 'Accumulation Survey' }
            class={ 'as' }
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Basic Cleanup',
        component:
          <FormStep5
            handleInputChange={ this.handleInputChange }
          />
       }, {
        name: 'Done!',
        component: <SubmitConfirm />
      }
    ]
    return (
      <div className='step-progress'>
        <StepZilla
          onStepChange={
            (step) => { if (step === 5) this.handleFormSubmit(); }
          }
          steps={steps}
          showSteps={true}
          prevBtnOnLastStep={true}
          showNavigation={true}
        />
      </div>
    );
  }
}

export default SurveyForm;
