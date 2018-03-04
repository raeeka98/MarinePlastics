import React, { Component } from 'react';
import axios from 'axios';
// import style from '../style';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
      majorUse: ''
    }

    this.handleValChange = this.handleValChange.bind(this);
    // this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValChange(e) { this.setState({ [e.target.id]: e.target.value }); }

  onCommentSubmit(comment) {
    let comments = this.state.data;
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    axios.post(this.props.url, comment)
      .catch(err => {
        console.error(err);
        this.setState({ data: comments });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let leader = this.state.leader.trim();
    let surveyorNames = this.state.surveyorNames.trim();
    let contactInfo = this.state.contactInfo.trim();
    let date = this.state.date.trim();
    let beach = this.state.beach.trim();
    let reason = this.state.reason.trim();
    let st = this.state.st.trim();
    let lat = this.state.lat.trim();
    let lon = this.state.lon.trim();
    let slope = this.state.slope.trim();
    let nroName = this.state.nroName.trim();
    let nroDist = this.state.nroDist.trim();
    let nroFlow = this.state.nroFlow.trim();
    let nroOut = this.state.nroOut.trim();
    let aspect = this.state.aspect.trim();
    let weather = this.state.weather.trim();
    let lastTide = this.state.lastTide.trim();
    let nextTide = this.state.nextTide.trim();
    let windDir = this.state.windDir.trim();
    let majorUse = this.state.majorUse.trim();

    if (!leader || !surveyorNames || !contactInfo || !date ||
      !beach || !reason || !st || !lat || !lon || !slope || !nroName || !nroDist || !nroFlow || !nroOut || !aspect ||
      !weather || !lastTide || !nextTide || !windDir || !majorUse) {
      return;
  }
  this.props.onCommentSubmit({ leader: leader, surveyorNames: surveyorNames, contactInfo: contactInfo, date: date,
    beach: beach, reason: reason, st: st, lat: lat, lon: lon, slope: slope, nroName: nroName, nroDist: nroDist, 
    nroFlow: nroFlow, nroOut: nroOut, aspect: aspect, weather: weather, lastTide: lastTide, nextTide: nextTide, windDir: windDir, 
    majorUse: majorUse});

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
        type='text'
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
        type='text'
        placeholder='Latitude'
        id='lat'
        onChange={ this.handleValChange }
        className='uk-input uk-margin'
      />
      <input
        type='text'
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
        type='text'
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
        value='Submit'
        className='uk-button uk-button-primary'
      />
    </form>
    )
  }
}

export default SurveyForm;
