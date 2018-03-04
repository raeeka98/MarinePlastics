import React, { Component } from 'react';
import axios from 'axios';
import style from '../style';

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
    <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
      <h2>Team Info</h2>
      <label>Trip Leader</label>
      <input
        type='text'
        placeholder='Trip Leader'
        id='leader'
        style={ style.commentFormText }
        onChange={ this.handleValChange } 
      />
      <label>Surveyor Name(s)</label>
      <input
        type='text'
        placeholder='Surveyor Name(s)'
        id='surveyorNames'
        style={ style.commentFormText }
        onChange={ this.handleValChange } 
      />
      <label>Contact Information</label>
      <input
        type='text'
        placeholder='Contact Information'
        id='contactInfo'
        style={ style.commentFormText}
        onChange={ this.handleValChange } 
      />
      <label>Date</label>
      <input
        type='text'
        placeholder='Date'
        id='date'
        style={ style.commentFormText}
        onChange={ this.handleValChange } 
      />

      <h2>Survey Area</h2>
      <label>Name of Beach</label>
      <input
        type='text'
        placeholder='Name of Beach'
        id='beach'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <label>Reason for Location Choice</label>
      <input
        type='text'
        placeholder='Reason for Location Choice (ex. Proximity, Problem Spot, etc.)'
        id='reason'
        style={ style.commentFormText}
        onChange={ this.handleValChange } 
      />
      <label>Substrate Type</label>
      <input
        type='text'
        placeholder='Substrate Type (ex. Sand, Gravel, etc.)'
        id='st'
        style={ style.commentFormText}
        onChange={ this.handleValChange } 
      />
      <label>GPS Coordinates (Starting Point)</label>
      <input
        type='text'
        placeholder='Latitude'
        id='lat'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <input
        type='text'
        placeholder='Longitude'
        id='lon'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <label>Slope</label>
      <input
        type='text'
        placeholder='Slope (ex. Steep, Gradual, Gentle, etc.)'
        id='slope'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <label>Nearest River Output</label>
      <input
        type='text'
        placeholder='Name'
        id='nroName'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <input
        type='text'
        placeholder='Distance (m)'
        id='nroDist'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <input
        type='text'
        placeholder='Direction of Flow'
        id='nroFlow'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <input
        type='text'
        placeholder='Direction to Output'
        id='nroOut'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <label>Aspect</label>
      <input
        type='text'
        placeholder='(Compass direction facing water in degrees, perpendicular to spine)'
        id='aspect'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <label>Weather</label>
      <input
        type='text'
        placeholder='Weather (ex. Rainy, Sunny, etc.)'
        id='weather'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <label>Tide Information</label>
      <input
        type='text'
        placeholder='Last Tide / Height'
        id='lastTide'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <input
        type='text'
        placeholder='Next Tide / Height'
        id='nextTide'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <label>Wind Direction</label>
      <input
        type='text'
        placeholder='Wind Speed/Direction'
        id='windDir'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <label>Major Usage</label>
      <input
        type='text'
        placeholder='(ex. Recreational, Commercial, Remote/Unused, Private, etc.)'
        id='majorUse'
        style={ style.commentFormText}
        onChange={ this.handleValChange }
      />
      <input
        type='submit'
        style={ style.commentFormPost }
        value='Post'
      />
    </form>
    )
  }
}

export default SurveyForm;
