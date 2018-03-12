import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import axios from 'axios';

import Auth from '../../Auth';

import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import SubmitConfirm from './SubmitConfirm';

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
        majorUse: ''
      }
    // }

    this.handleServerSubmit = this.handleServerSubmit.bind(this);
    this.handleServerUpdate = this.handleServerUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.auth = new Auth();
    this.pollInterval = null;
    this.url = 'http://localhost:3001/api/comments';
  }

  handleInputChange(e) { this.setState({ [e.target.id]: e.target.value }); }

  handleServerSubmit(comment) {
    this.auth.getLoggedInProfile((err, profile) => {
      comment.user = profile.name;
      comment.email = profile.email;
    });
    comment.input_date = Date.now();
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
    // e.preventDefault();
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
  }

  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    const initialValues1 = [
      this.state.org,
      this.state.date,
    ]

    const steps = [
      {
        name:'Clean Up Information',
        component: 
          <FormStep1
            initialValues={ initialValues1 }
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Survey Area',
        component: 
          <FormStep2 
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
            (step) => { if (step === 2) this.handleFormSubmit() }
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
