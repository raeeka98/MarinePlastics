import React, { Component } from 'react';
import axios from 'axios';
// import style from '../style';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state =  {
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
    };

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.handleValChange = this.handleValChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pollInterval = null;
    this.url = 'http://localhost:3001/api/comments';
  }

  componentDidMount() {
    console.log(this.props);
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    } 
  }

  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  handleCommentSubmit(comment) {
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
    this.handleCommentSubmit(this.state);
    location.reload();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <h2>Team Info</h2>
        <label>Trip Leader</label>
        <input
          type='text'
          placeholder='Trip Leader'
          id='leader'
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
        <label>Surveyor Name(s)</label>
        <input
          type='text'
          placeholder='Surveyor Name(s)'
          id='surveyorNames'
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
        <label>Contact Information</label>
        <input
          type='text'
          placeholder='Contact Information'
          id='contactInfo'
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
        <label>Date</label>
        <input
          type='date'
          placeholder='Date'
          id='date'
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />

        <h2>Survey Area</h2>
        <label>Name of Beach</label>
        <input
          type='text'
          placeholder='Name of Beach'
          id='beach'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Reason for Location Choice</label>
        <input
          type='text'
          placeholder='Reason for Location Choice (ex. Proximity, Problem Spot, etc.)'
          id='reason'
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
        <label>Substrate Type</label>
        <input
          type='text'
          placeholder='Substrate Type (ex. Sand, Gravel, etc.)'
          id='st'
          onChange={ this.handleValChange }
          className='uk-input uk-margin' 
        />
        <label>GPS Coordinates (Starting Point)</label>
        <input
          type='number'
          placeholder='Latitude'
          id='lat'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='number'
          placeholder='Longitude'
          id='lon'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Slope</label>
        <input
          type='text'
          placeholder='Slope (ex. Steep, Gradual, Gentle, etc.)'
          id='slope'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Nearest River Output</label>
        <input
          type='text'
          placeholder='Name'
          id='nroName'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='number'
          placeholder='Distance (m)'
          id='nroDist'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='text'
          placeholder='Direction of Flow'
          id='nroFlow'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='text'
          placeholder='Direction to Output'
          id='nroOut'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Aspect</label>
        <input
          type='text'
          placeholder='(Compass direction facing water in degrees, perpendicular to spine)'
          id='aspect'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Weather</label>
        <input
          type='text'
          placeholder='Weather (ex. Rainy, Sunny, etc.)'
          id='weather'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Tide Information</label>
        <input
          type='text'
          placeholder='Last Tide / Height'
          id='lastTide'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <input
          type='text'
          placeholder='Next Tide / Height'
          id='nextTide'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Wind Direction</label>
        <input
          type='text'
          placeholder='Wind Speed/Direction'
          id='windDir'
          onChange={ this.handleValChange }
          className='uk-input uk-margin'
        />
        <label>Major Usage</label>
        <input
          type='text'
          placeholder='(ex. Recreational, Commercial, Remote/Unused, Private, etc.)'
          id='majorUse'
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