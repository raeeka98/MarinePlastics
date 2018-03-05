import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../Auth';

class SurveyForm extends Component {
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
        org: '',
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
    return (
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

        <h2>Survey Area</h2>
        <label>Name of Beach</label>
        <input
          type='text'
          placeholder='Name of Beach'
          id='beach'
          value={ this.state.beach }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Reason for Location Choice</label>
        <input
          type='text'
          placeholder='Reason for Location Choice (ex. Proximity, Problem Spot, etc.)'
          id='reason'
          value={ this.state.reason }
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
        <label>Substrate Type</label>
        <input
          type='text'
          placeholder='Substrate Type (ex. Sand, Gravel, etc.)'
          id='st'
          value={ this.state.st }
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
        <label>GPS Coordinates (Starting Point)</label>
        <input
          type='number'
          placeholder='Latitude'
          id='lat'
          value={ this.state.lat }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='number'
          placeholder='Longitude'
          id='lon'
          value={ this.state.lon }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Slope</label>
        <input
          type='text'
          placeholder='Slope (ex. Steep, Gradual, Gentle, etc.)'
          id='slope'
          value={ this.state.slope }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Nearest River Output</label>
        <input
          type='text'
          placeholder='Name'
          id='nroName'
          value={ this.state.nroName }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='number'
          placeholder='Distance (m)'
          id='nroDist'
          value={ this.state.nroDist }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='text'
          placeholder='Direction of Flow'
          id='nroFlow'
          value={ this.state.nroFlow }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='text'
          placeholder='Direction to Output'
          id='nroOut'
          value={ this.state.nroOut }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Aspect</label>
        <input
          type='text'
          placeholder='(Compass direction facing water in degrees, perpendicular to spine)'
          id='aspect'
          value={ this.state.aspect }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Weather</label>
        <input
          type='text'
          placeholder='Weather (ex. Rainy, Sunny, etc.)'
          id='weather'
          value={ this.state.weather }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Tide Information</label>
        <input
          type='text'
          placeholder='Last Tide / Height'
          id='lastTide'
          value={ this.state.lastTide }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='text'
          placeholder='Next Tide / Height'
          id='nextTide'
          value={ this.state.nextTide }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Wind Direction</label>
        <input
          type='text'
          placeholder='Wind Speed/Direction'
          id='windDir'
          value={ this.state.windDir }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Major Usage</label>
        <input
          type='text'
          placeholder='(ex. Recreational, Commercial, Remote/Unused, Private, etc.)'
          id='majorUse'
          value={ this.state.majorUse }
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='submit'
          target="_top"
          value='Submit'
          className='uk-button uk-button-primary'
        />
      </form>
    );
  }
}

export default SurveyForm;