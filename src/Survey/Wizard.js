import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../Auth';
import Steps from './Steps.js';
import SurveyForm2 from './SurveyForm2';
import SurveyForm1 from './SurveyForm1';
import StepZilla from 'react-stepzilla'

class Wizard extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state !== undefined) {
      this.state = this.props.location.state.initialValues;
    } else {
      this.state = {
        leader: '',
        surveyorNames: '',
        contactInfo: '',
        date: '',
      }
    }

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.handleValChange = this.handleValChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pollInterval = null;
    this.auth = new Auth();
    this.url = 'http://localhost:3001/api/comments';
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

  handleCommentSubmit(comment) {
    comment.user_id = this.auth.getAccessToken();
    comment.id = Date.now();
    axios.post(this.url, comment)
      .catch(err => { console.error(err); });
  }

  handleCommentUpdate(id, comment) {
    //sends the comment id and new beach/reason to our api
    axios.put(`${this.url}/${id}`, comment)
      .catch(err => {
        console.log(err);
      })
  }

  handleValChange(e) { this.setState({ [e.target.id]: e.target.value }); }

  // when add update functionality - check in this function if need to do
  // either handleCommentSubmit or handleCommentUpdate
  handleSubmit(e) {
    e.preventDefault();
    if (this.auth.isAuthenticated()) {
      if (this.props.location.state !== undefined) {
        this.handleCommentUpdate(this.props.location.state.initialValues._id, this.state);
      } else {
        this.handleCommentSubmit(this.state);
      }
      // need to replace
      location.reload();
    } else {
      window.alert('Please sign in to enter survey data.');
    }
  }

  render() {
    const steps = 
      [
        {name:'Survey Area', component: <SurveyForm1 onCommentSubmit={ this.handleCommentSubmit }/> },
        {name:'Survey Area', component: <SurveyForm2 onCommentSubmit={ this.handleCommentSubmit }/> },
      ]
    return (
      <div>
      <div className='step-progress'>
        <StepZilla 
          onStepChange={ (step) => console.log(step) }
          steps={steps}
          showSteps={true}
          showNavigation={true} />
      </div>
      <form onSubmit={ this.handleSubmit }>
        <h2>Clean Up Info</h2>
        <label>Organization</label>
        <input
          type='string'
          placeholder='Organization'
          id='org'
          value={ this.state.org }
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
        <label>Date</label>
        <input
          type='date'
          placeholder='Date'
          id='date'
          value={ this.state.date }
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
      </form>

      </div>
    
    );
  }
}

export default Wizard;