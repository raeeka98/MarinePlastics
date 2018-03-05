import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import marked from 'marked';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = { toBeUpdated: false, };
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('deleted');
  }
  
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div>
        <h3>Team Information</h3>
        <p>
          <b>Team Leader: </b>
          <i>{this.props.comment.leader}</i>
        </p>
        <p>
          <b>Surveyor Names: </b>
          <i>{this.props.comment.surveyorNames}</i>
        </p>
        <p>
          <b>Contact Information: </b>
          <i>{this.props.comment.contactInfo}</i>
        </p>
        <p>
          <b>Date: </b>
          <i>{this.props.comment.date}</i>
        </p>

        <h3>Survey Area</h3>
        <p>
          <b>Name of Beach: </b>
          <i>{this.props.comment.beach}</i>
        </p>
        <p>
          <b>Reason for Location: </b>
          <i>{this.props.comment.reason}</i>
        </p>
        <p>
          <b>Substrate Type: </b>
          <i>{this.props.comment.st}</i>
        </p>
        <p>
          <b>GPS Coordinates (Starting Point): </b>
          <i>{this.props.comment.lat}</i>, <i>{this.props.comment.lon}</i>
        </p>
        <p>
          <b>Slope: </b>
          <i>{this.props.comment.slope}</i>
        </p>
        <p>
          <b>Nearest River Output ~ Name: </b>
          <i>{this.props.comment.nroName}</i>
          <b> Distance: </b>
          <i>{this.props.comment.nroDist}m</i>
          <b>Direction of Flow: </b>
          <i>{this.props.comment.nroFlow}</i>
          <b>Direction to Output: </b>
          <i>{this.props.comment.nroOut}</i>
        </p>
        <p>
          <b>Aspect: </b>
          <i>{this.props.comment.aspect}</i>
        </p>
        <p>
          <b>Weather: </b>
          <i>{this.props.comment.weather}</i>
        </p>
        <p>
          <b>Last Tide and Height: </b>
          <i>{this.props.comment.lastTide}</i>
          <b> Next Tide and Height: </b>
          <i>{this.props.comment.nextTide}</i>
        </p>
        <p>
          <b>Wind Direction: </b>
          <i>{this.props.comment.windDir}</i>
        </p>
        <p>
          <b>Major Usage: </b>
          <i>{this.props.comment.majorUse}</i>
        </p>

        {/* <span dangerouslySetInnerHTML={ this.rawMarkup() } /> */}
        <Link to={{
          pathname: '/survey',
          state: { initialValues: this.props.comment }
        }}>
          update
        </Link>
        <button onClick={ this.deleteComment }>delete</button>
      </div>
    );
  }
}

export default Survey;
