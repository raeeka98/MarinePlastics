import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import marked from 'marked';
import Auth from '../Auth';
import axios from 'axios';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toRedirect: false,
      comment: this.props.location.state.comment || {},
      // formOwner: {},
    };
    // this.getLeader = this.getLeader.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.auth = new Auth();
    this.url = 'http://localhost:3001/api/comments';
  }

  // componentDidMount() {
  //   this.getLeader();
  // }

  // getLeader() {
  //   this.auth.getProfile(this.state.comment.user_id, (error, profile) => {
  //     this.setState({ formOwner: profile });
  //   });
  // }

  handleCommentDelete(id) {
    axios.delete(`${this.url}/${id}`)
      .then(res => {
        console.log('Comment deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteComment(e) {
    e.preventDefault();
    if (this.auth.getAccessToken() === this.state.comment.user_id) {
      let id = this.state.comment._id;
      this.handleCommentDelete(id);
      console.log('deleted');
      this.setState({ toRedirect: true  });
    } else {
      window.alert('Can only delete your own entries.');
    }
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      this.state.toRedirect
      ? <Redirect to='/' />
      : (
        <div>
          <h3>Team Information</h3>
          <p>
            <b>Team Leader: </b>
            {/* <i>{this.state.formOwner.name}</i> */}
          </p>
          <p>
            <b>Organization: </b>
            <i>{this.state.comment.org}</i>
          </p>
          <p>
            <b>Surveyor Names: </b>
            <i>{this.state.comment.surveyorNames}</i>
          </p>
          <p>
            <b>Contact Information: </b>
            {/* <i>{this.state.formOwner.email}</i> */}
          </p>
          <p>
            <b>Date: </b>
            <i>{this.state.comment.date}</i>
          </p>

          <h3>Survey Area</h3>
          <p>
            <b>Name of Beach: </b>
            <i>{this.state.comment.beach}</i>
          </p>
          <p>
            <b>Reason for Location: </b>
            <i>{this.state.comment.reason}</i>
          </p>
          <p>
            <b>Substrate Type: </b>
            <i>{this.state.comment.st}</i>
          </p>
          <p>
            <b>GPS Coordinates (Starting Point): </b>
            <i>{this.state.comment.lat}</i>, <i>{this.state.comment.lon}</i>
          </p>
          <p>
            <b>Slope: </b>
            <i>{this.state.comment.slope}</i>
          </p>
          <p>
            <b>Nearest River Output ~ Name: </b>
            <i>{this.state.comment.nroName}</i>
            <b> Distance: </b>
            <i>{this.state.comment.nroDist}m</i>
            <b>Direction of Flow: </b>
            <i>{this.state.comment.nroFlow}</i>
            <b>Direction to Output: </b>
            <i>{this.state.comment.nroOut}</i>
          </p>
          <p>
            <b>Aspect: </b>
            <i>{this.state.comment.aspect}</i>
          </p>
          <p>
            <b>Weather: </b>
            <i>{this.state.comment.weather}</i>
          </p>
          <p>
            <b>Last Tide and Height: </b>
            <i>{this.state.comment.lastTide}</i>
            <b> Next Tide and Height: </b>
            <i>{this.state.comment.nextTide}</i>
          </p>
          <p>
            <b>Wind Direction: </b>
            <i>{this.state.comment.windDir}</i>
          </p>
          <p>
            <b>Major Usage: </b>
            <i>{this.state.comment.majorUse}</i>
          </p>

          {/* <span dangerouslySetInnerHTML={ this.rawMarkup() } /> */}
          <Link to={{
            pathname: '/survey',
            state: { initialValues: this.state.comment },
          }}>
            update
          </Link>
          <button onClick={ this.deleteComment }>delete</button>
        </div>
      )
    );
  }
}

export default Survey;
