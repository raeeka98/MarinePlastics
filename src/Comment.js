import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      beach: '',
      reason: '',
      st: '',
      lat: '',
      lon: ''
    };
    //binding all our functions to this class
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleBeachChange = this.handleBeachChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleSTChange = this.handleSTChange.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
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
    let beach = (this.state.beach) ? this.state.beach : null;
    let reason = (this.state.reason) ? this.state.reason : null;
    let st = (this.state.st) ? this.state.st : null;
    let lat = (this.state.lat) ? this.state.lat : null;
    let lon = (this.state.lon) ? this.state.lon : null;
    let comment = { beach: beach, reason: reason, st: st, lat:lat, lon:lon};
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      beach: '',
      reason: '',
      st: '',
      lat: '',
      lon: ''
    })
  }
  deleteComment(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('deleted');
  }
  handleReasonChange(e) {
    this.setState({ reason: e.target.value });
  }
  handleBeachChange(e) {
    this.setState({ beach: e.target.value });
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
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div style={ style.comment }>
        <h3>{this.props.beach}</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
        <a style={ style.updateLink } href='#' onClick={ this.updateComment }>update</a>
        <a style={ style.deleteLink } href='#' onClick={ this.deleteComment }>delete</a>
        { (this.state.toBeUpdated)
          ? (<form onSubmit={ this.handleCommentUpdate }>
              <input
                type='reason'
                placeholder='Update Beach Name'
                style={ style.commentFormText }
                value={ this.state.beach }
                onChange={ this.handleBeachChange } />
              <input
                type='reason'
                placeholder='Update Reason'
                style={ style.commentFormText }
                value={ this.state.reason }
                onChange={ this.handleReasonChange } />
                <input
                type='reason'
                placeholder='Update Substrate Type'
                style={ style.commentFormText }
                value={ this.state.st }
                onChange={ this.handleSTChange } />
                <input
                type='reason'
                placeholder='Update Latitude'
                style={ style.commentFormText }
                value={ this.state.lat }
                onChange={ this.handleLatChange } />
                <input
                type='reason'
                placeholder='Update Longitude'
                style={ style.commentFormText }
                value={ this.state.lon }
                onChange={ this.handleLonChange } />
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

export default Comment;
