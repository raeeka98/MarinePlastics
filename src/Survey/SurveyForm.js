import React, { Component } from 'react';
import style from '../style';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {leader: '', surveyorNames: '', contactInfo: '', date: '',
    beach: '', reason: '', st: '', lat: '', lon: '' , slope: '', nroName: '', nroDist: '', nroFlow: '', nroOut: '',
    aspect: '', weather: '', lastTide: '', nextTide: '', windDir: '', majorUse: '' };
    this.handleLeaderChange = this.handleLeaderChange.bind(this);
    this.handleSurveyorNamesChange = this.handleSurveyorNamesChange.bind(this);
    this.handleContactInfoChange = this.handleContactInfoChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleBeachChange = this.handleBeachChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleSTChange = this.handleSTChange.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleSlopeChange = this.handleSlopeChange.bind(this);
    this.handleNroNameChange = this.handleNroNameChange.bind(this);
    this.handleNroDistChange = this.handleNroDistChange.bind(this);
    this.handleNroFlowChange = this.handleNroFlowChange.bind(this);
    this.handleNroOutChange = this.handleNroOutChange.bind(this);
    this.handleAspectChange = this.handleAspectChange.bind(this);
    this.handleWeatherChange = this.handleWeatherChange.bind(this);
    this.handleLastTideChange = this.handleLastTideChange.bind(this);
    this.handleNextTideChange = this.handleNextTideChange.bind(this);
    this.handleWindDirChange = this.handleWindDirChange.bind(this);
    this.handleMajorUseChange = this.handleMajorUseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleLeaderChange(e) {
    this.setState({ leader: e.target.value });
  }
  handleSurveyorNamesChange(e) {
    this.setState({ surveyorNames: e.target.value });
  }
  handleContactInfoChange(e) {
    this.setState({ contactInfo: e.target.value });
  }
  handleDateChange(e) {
    this.setState({ date: e.target.value });
  }
  handleBeachChange(e) {
    this.setState({ beach: e.target.value });
  }
  handleReasonChange(e) {
    this.setState({ reason: e.target.value });
  }
  handleSTChange(e) {
    this.setState({ st: e.target.value });
  }
  handleLatChange(e) {
    this.setState({ lat: e.target.value });
  }
  handleLonChange(e) {
    this.setState({ lon: e.target.value });
  }
  handleSlopeChange(e) {
    this.setState({ slope: e.target.value });
  }
  handleNroNameChange(e) {
    this.setState({ nroName: e.target.value });
  }
  handleNroDistChange(e) {
    this.setState({ nroDist: e.target.value });
  }
  handleNroFlowChange(e) {
    this.setState({ nroFlow: e.target.value });
  }
  handleNroOutChange(e) {
    this.setState({ nroOut: e.target.value });
  }
  handleAspectChange(e) {
    this.setState({ aspect: e.target.value });
  }
  handleWeatherChange(e) {
    this.setState({ weather: e.target.value });
  }
  handleLastTideChange(e) {
    this.setState({ lastTide: e.target.value });
  }
  handleNextTideChange(e) {
    this.setState({ nextTide: e.target.value });
  }
  handleWindDirChange(e) {
    this.setState({ windDir: e.target.value });
  }
  handleMajorUseChange(e) {
    this.setState({ majorUse: e.target.value });
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
  this.setState({ leader: '', surveyorNames: '', contactInfo: '', date: '',
    beach: '', reason: '', st: '', lat: '', lon: '' , slope: '', nroName: '', nroDist: '', nroFlow: '', nroOut: '',
    aspect: '', weather: '', lastTide: '', nextTide: '', windDir: '', majorUse: '' });
}
render() {
  return (
    <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
    <h2>Team Info</h2>
    Trip Leader<br /><input
    type='text'
    placeholder='Trip Leader'
    style={ style.commentFormText}
    value={ this.state.leader }
    onChange={ this.handleLeaderChange } />
    <br /><br />
    Surveyor Name(s)<br /><input
    type='text'
    placeholder='Surveyor Name(s)'
    style={ style.commentFormText}
    value={ this.state.surveyorNames }
    onChange={ this.handleSurveyorNamesChange } />
    <br /><br />
    Contact Information<br /><input
    type='text'
    placeholder='Contact Information'
    style={ style.commentFormText}
    value={ this.state.contactInfo }
    onChange={ this.handleContactInfoChange } />
    <br /><br />
    Date<br /><input
    type='text'
    placeholder='Date'
    style={ style.commentFormText}
    value={ this.state.date }
    onChange={ this.handleDateChange } />
    <br /><br />
    <h2>Survey Area</h2>
    Name of Beach<br /><input
    type='text'
    placeholder='Name of Beach'
    style={ style.commentFormText}
    value={ this.state.beach }
    onChange={ this.handleBeachChange } />
    <br /><br />
    Reason for Location Choice<br /><input
    type='text'
    placeholder='Reason for Location Choice (ex. Proximity, Problem Spot, etc.)'
    style={ style.commentFormText}
    value={ this.state.reason }
    onChange={ this.handleReasonChange } />
    <br /><br />
    Substrate Type<br /><input
    type='text'
    placeholder='Substrate Type (ex. Sand, Gravel, etc.)'
    style={ style.commentFormText}
    value={ this.state.st }
    onChange={ this.handleSTChange } />
    <br /><br />
    GPS Coordinates (Starting Point)<br /><input
    type='text'
    placeholder='Latitude'
    style={ style.commentFormText}
    value={ this.state.lat }
    onChange={ this.handleLatChange } />&nbsp;
    <input
    type='text'
    placeholder='Longitude'
    style={ style.commentFormText}
    value={ this.state.lon }
    onChange={ this.handleLonChange } />
    <br /><br />
    Slope<br />
    <input
    type='text'
    placeholder='Slope (ex. Steep, Gradual, Gentle, etc.)'
    style={ style.commentFormText}
    value={ this.state.slope }
    onChange={ this.handleSlopeChange } />
    <br /><br />
    Nearest River Output<br /><input
    type='text'
    placeholder='Name'
    style={ style.commentFormText}
    value={ this.state.nroName }
    onChange={ this.handleNroNameChange } />&nbsp;
    <input
    type='text'
    placeholder='Distance (m)'
    style={ style.commentFormText}
    value={ this.state.nroDist }
    onChange={ this.handleNroDistChange } />
    <br />
    <input
    type='text'
    placeholder='Direction of Flow'
    style={ style.commentFormText}
    value={ this.state.nroFlow }
    onChange={ this.handleNroFlowChange } />&nbsp;
    <input
    type='text'
    placeholder='Direction to Output'
    style={ style.commentFormText}
    value={ this.state.nroOut }
    onChange={ this.handleNroOutChange } />
    <br /><br />
    Aspect<br />
    <input
    type='text'
    placeholder='(Compass direction facing water in degrees, perpendicular to spine)'
    style={ style.commentFormText}
    value={ this.state.aspect }
    onChange={ this.handleAspectChange } />
    <br /><br />
    Weather<br />
    <input
    type='text'
    placeholder='Weather (ex. Rainy, Sunny, etc.)'
    style={ style.commentFormText}
    value={ this.state.weather }
    onChange={ this.handleWeatherChange } />
    <br /><br />
    Tide Information<br />
    <input
    type='text'
    placeholder='Last Tide / Height'
    style={ style.commentFormText}
    value={ this.state.lastTide}
    onChange={ this.handleLastTideChange } />
    <input
    type='text'
    placeholder='Next Tide / Height'
    style={ style.commentFormText}
    value={ this.state.nextTide}
    onChange={ this.handleNextTideChange } />
    <br /><br />
    Wind Direction<br />
    <input
    type='text'
    placeholder='Wind Speed/Direction'
    style={ style.commentFormText}
    value={ this.state.windDir }
    onChange={ this.handleWindDirChange } />
    <br /><br />
    Major Usage<br />
    <input
    type='text'
    placeholder='(ex. Recreational, Commercial, Remote/Unused, Private, etc.)'
    style={ style.commentFormText}
    value={ this.state.majorUse }
    onChange={ this.handleMajorUseChange } />
    <br /><br />
    <input
    type='submit'
    style={ style.commentFormPost }
    value='Post'/>
    </form>
    )
  }
}

export default SurveyForm;
