import React, { Component } from 'react';
import style from '../style';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { beach: '', reason: '', st: '', lat: '', lon: '' , slope: ''};
    this.handleBeachChange = this.handleBeachChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleSTChange = this.handleSTChange.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleSlopeChange = this.handleSlopeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit(e) {
    e.preventDefault();
    let beach = this.state.beach.trim();
    let reason = this.state.reason.trim();
    let st = this.state.st.trim();
    let lat = this.state.lat.trim();
    let lon = this.state.lon.trim();
    let slope = this.state.slope.trim();
    if (!reason || !beach || !st || !lat || !lon || !slope) {
      return;
    }
    this.props.onCommentSubmit({ beach: beach, reason: reason, st: st, lat: lat, lon: lon, slope: slope });
    this.setState({ beach: '', reason: '', st: '', lat: '', lon: '', slope: ''});
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
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

          
        <input
          type='submit'
          style={ style.commentFormPost }
          value='Post'/>
      </form>
    )
  }
}

export default SurveyForm;
