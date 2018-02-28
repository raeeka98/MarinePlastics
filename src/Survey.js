import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      leader: '',
      surveyorNames: '',
      contactInfo: '',
      date: '',
      beach: '',
      reason: '',
      st: '',
      lat: '',
      lon: '',
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
    };
    //binding all our functions to this class
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
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
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
  }
  updateComment(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleCommentUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if beach or reason changed, set it. if not, leave null and our PUT request
    //will ignore it.
    let leader = (this.state.leader) ? this.state.leader : null;
    let surveyorNames = (this.state.surveyorNames) ? this.state.surveyorNames : null;
    let contactInfo = (this.state.contactInfo) ? this.state.contactInfo : null;
    let date = (this.state.date) ? this.state.date : null;
    let beach = (this.state.beach) ? this.state.beach : null;
    let reason = (this.state.reason) ? this.state.reason : null;
    let st = (this.state.st) ? this.state.st : null;
    let lat = (this.state.lat) ? this.state.lat : null;
    let lon = (this.state.lon) ? this.state.lon : null;
    let slope = (this.state.slope) ? this.state.slope : null;
    let nroName = (this.state.nroName) ? this.state.nroName : null;
    let nroDist = (this.state.nroDist) ? this.state.nroDist : null;
    let nroFlow = (this.state.nroFlow) ? this.state.nroFlow : null;
    let nroOut = (this.state.nroOut) ? this.state.nroOut : null;
    let aspect = (this.state.aspect) ? this.state.aspect : null;
    let weather = (this.state.weather) ? this.state.weather : null;
    let lastTide = (this.state.lastTide) ? this.state.lastTide : null;
    let nextTide = (this.state.nextTide) ? this.state.nextTide : null;
    let windDir = (this.state.windDir) ? this.state.windDir : null;
    let majorUse = (this.state.majorUse) ? this.state.majorUse : null;
    
    let comment = { leader: leader, surveyorNames: surveyorNames, contactInfo: contactInfo, date: date,
      beach: beach, reason: reason, st: st, lat:lat, lon:lon, slope:slope, nroName: nroName, nroDist: nroDist, 
      nroFlow: nroFlow, nroOut: nroOut, aspect: aspect, weather: weather, lastTide: lastTide, nextTide: nextTide,
      windDir: windDir, majorUse: majorUse };
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      leader: '',
      surveyorNames: '',
      contactInfo: '',
      date: '',
      beach: '',
      reason: '',
      st: '',
      lat: '',
      lon: '',
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
      
    })
  }
  deleteComment(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('deleted');
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
    this.setState({ slope: e.target.value });
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div style={ style.comment }>
      <h3>{this.props.leader}</h3>
      <span dangerouslySetInnerHTML={ this.rawMarkup() } />
      <a style={ style.updateLink } href='#' onClick={ this.updateComment }>update</a>
      <a style={ style.deleteLink } href='#' onClick={ this.deleteComment }>delete</a>
      { (this.state.toBeUpdated)
        ? (<form onSubmit={ this.handleCommentUpdate }>
          <input
          type='text'
          placeholder='Update Trip Leader'
          style={ style.commentFormText }
          value={ this.state.leader }
          onChange={ this.handleLeaderChange } />
          <input
          type='text'
          placeholder='Update Surveyor Name(s)'
          style={ style.commentFormText }
          value={ this.state.surveyorNames }
          onChange={ this.handleSurveyorNamesChange } />
          <input
          type='text'
          placeholder='Update Contact Information'
          style={ style.commentFormText }
          value={ this.state.contactInfo }
          onChange={ this.handleContactInfoChange } />
          <input
          type='text'
          placeholder='Update Date'
          style={ style.commentFormText }
          value={ this.state.date }
          onChange={ this.handleDateChange } />
          <input
          type='text'
          placeholder='Update Beach Name'
          style={ style.commentFormText }
          value={ this.state.beach }
          onChange={ this.handleBeachChange } />
          <input
          type='text'
          placeholder='Update Reason'
          style={ style.commentFormText }
          value={ this.state.reason }
          onChange={ this.handleReasonChange } />
          <input
          type='text'
          placeholder='Update Substrate Type'
          style={ style.commentFormText }
          value={ this.state.st }
          onChange={ this.handleSTChange } />
          <input
          type='text'
          placeholder='Update Latitude'
          style={ style.commentFormText }
          value={ this.state.lat }
          onChange={ this.handleLatChange } />
          <input
          type='text'
          placeholder='Update Longitude'
          style={ style.commentFormText }
          value={ this.state.lon }
          onChange={ this.handleLonChange } />
          <input
          type='text'
          placeholder='Update Slope'
          style={ style.commentFormText }
          value={ this.state.slope }
          onChange={ this.handleSlopeChange } />
          <input
          type='text'
          placeholder='Update Name of Nearest River Output'
          style={ style.commentFormText }
          value={ this.state.nroName }
          onChange={ this.handleNroNameChange } />
          <input
          type='text'
          placeholder='Update Dist of Nearest River Output'
          style={ style.commentFormText }
          value={ this.state.nroDist }
          onChange={ this.handleNroDistChange } />
          <input
          type='text'
          placeholder='Update Flow of Nearest River Output'
          style={ style.commentFormText }
          value={ this.state.nroFlow }
          onChange={ this.handleNroFlowChange } />
          <input
          type='text'
          placeholder='Update Output of Nearest River Output'
          style={ style.commentFormText }
          value={ this.state.nroOut }
          onChange={ this.handleNroOutChange } />
          <br />
          <input
          type='text'
          placeholder='Update Aspect'
          style={ style.commentFormText }
          value={ this.state.aspect }
          onChange={ this.handleAspectChange } />
          <input
          type='text'
          placeholder='Update Weather'
          style={ style.commentFormText }
          value={ this.state.weather }
          onChange={ this.handleWeatherChange } />
          <input
          type='text'
          placeholder='Update Last Tide / Height'
          style={ style.commentFormText }
          value={ this.state.lastTide }
          onChange={ this.handleLastTideChange } />
          <input
          type='text'
          placeholder='Update Next Tide / Height'
          style={ style.commentFormText }
          value={ this.state.nextTide }
          onChange={ this.handleNextTideChange } />
          <input
          type='text'
          placeholder='Update Wind Speed/Direction'
          style={ style.commentFormText }
          value={ this.state.windDir }
          onChange={ this.handleWindDirChange } />
          <input
          type='text'
          placeholder='Update Major Usage'
          style={ style.commentFormText }
          value={ this.state.majorUse }
          onChange={ this.handleMajorUseChange } />
          <br />
          <input
          type='submit'
          style={ style.commentFormPost }
          value='Update' />
          </form>)
          : null}
          </div>
          )
      }
    }

    export default Survey;
