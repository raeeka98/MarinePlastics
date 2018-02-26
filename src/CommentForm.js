import React, { Component } from 'react';
import style from './style';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { beach: '', reason: '', st: '', lat: '', lon: '' };
    this.handleBeachChange = this.handleBeachChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleSTChange = this.handleSTChange.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
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
  handleSubmit(e) {
    e.preventDefault();
    let beach = this.state.beach.trim();
    let reason = this.state.reason.trim();
    let st = this.state.st.trim();
    let lat = this.state.lat.trim();
    let lon = this.state.lon.trim();
    if (!reason || !beach || !st || !lat || !lon) {
      return;
    }
    this.props.onCommentSubmit({ beach: beach, reason: reason, st: st, lat: lat, lon: lon });
    this.setState({ beach: '', reason: '', st: '', lat: '', lon: ''});
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
      <h2>Survey Area</h2>
        <input
          type='text'
          placeholder='Name of Beach'
          style={ style.commentFormText}
          value={ this.state.beach }
          onChange={ this.handleBeachChange } />
          <br></br>
        <input
          type='text'
          placeholder='Reason for Location Choice'
          style={ style.commentFormText}
          value={ this.state.reason }
          onChange={ this.handleReasonChange } />
          <br></br>

          <input
          type='text'
          placeholder='Substrate Type'
          style={ style.commentFormText}
          value={ this.state.st }
          onChange={ this.handleSTChange } />
          <br></br>

          <p>GPS Coordinates (Starting Point)</p>
          <input
          type='text'
          placeholder='Latitude'
          style={ style.commentFormText}
          value={ this.state.lat }
          onChange={ this.handleLatChange } />
          <br></br>
          <input
          type='text'
          placeholder='Longitude'
          style={ style.commentFormText}
          value={ this.state.lon }
          onChange={ this.handleLonChange } />
          <br></br>


        <input
          type='submit'
          style={ style.commentFormPost }
          value='Post'/>
      </form>
    )
  }
}

export default CommentForm;
