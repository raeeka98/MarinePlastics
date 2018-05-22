import React, { Component } from 'react';
import Auth from '../Auth';
import axios from 'axios';

import SurveyTableRow from './SurveyTableRow';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: {} };

    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    // this.deleteComment = this.deleteComment.bind(this);
    this.getComment = this.getComment.bind(this);
    this.auth = new Auth();
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
  }

  getComment() {
    // get the id of the comment by splitting the current path (which is stored in the props) by '/'
    let splitURL = (this.props.location.pathname).split('/');
    // the id is the last part of the path, so pop the last element of the splitURL array
    let entryID = splitURL.pop();
    // call DB to get all the entries
    console.log('id', entryID);
    axios.get(`${this.url}`, {
      params: { _id: entryID }
    })
    .then(res => {
      console.log(res);
      // search entries for the one that has the same ID as the path
      // for (let i = 0; i < res.data.length; i++) {
      //   if (res.data[i]._id === entryID) {
      //     store that comment in the state
      //     let comment = res.data[i];
      //     this.setState({ comment });
      //   }
      // }
    })
    .catch(err => {
      console.log(err);
    });
  }

  // once the component is on the page, gets the comment from the server
  componentDidMount() {
    this.getComment();
  }

  // not sure if this works, also no users have ability to delete data as of now.
  handleCommentDelete(id) {
    axios.delete(`${this.url}/${id}`)
      .then(res => {
        console.log('Comment deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  // // in theory, deletes comment
  // deleteComment(e) {
  //   e.preventDefault();
  //   if (this.auth.getAccessToken() === this.state.comment.user_id) {
  //     let id = this.state.comment._id;
  //     this.handleCommentDelete(id);
  //     console.log('deleted');
  //     this.setState({ toRedirect: true  });
  //   } else {
  //     window.alert('Can only delete your own entries.');
  //   }
  // }

  render() {
    // initializes to null because when component mounts, there is no data yet
    let SRSRows = null;
    let ASRows = null;

    // if there is data (which is once the component mounts)
    if (this.state.comment.SRSData) {
      // for every type of trash, return a surveyTableRow component with the data
      SRSRows = this.state.comment.SRSData.map(type => {
        return(
          <SurveyTableRow
            key={type._id}
            name={type.name}
            fresh={type.fresh}
            weathered={type.weathered}
          />
        );
      });

      // same as SRSData
      ASRows = this.state.comment.ASData.map(type => {
        return(
          <SurveyTableRow
            key={type._id}
            name={type.name}
            fresh={type.fresh}
            weathered={type.weathered}
          />
        );
      });
    }

    return (
      <div>
        <h3>Team Information</h3>
        <p>
          <b>Team Leader: </b>
          <i>{this.state.comment.user}</i>
        </p>
        <p>
          <b>Organization: </b>
          <i>{this.state.comment.org}</i>
        </p>
        <p>
          <b>Email: </b>
          <i>{this.state.comment.email}</i>
        </p>
        <p>
          <b>Date Conducted: </b>
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
        </p>
        <p>
          <b>Aspect: </b>
          <i>{this.state.comment.aspect}</i>
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

        <h3> Basic Cleanup </h3>
        <p><b> Total Weight (in pounds): </b><i>{this.state.comment.weight}</i></p>
        <p><b> Number of People: </b><i>{this.state.comment.NumberOfPeople}</i></p>

        <h3>Surface Rib Scan Survey</h3>
        <table className="uk-table uk-table-striped">
          <thead>
            <tr>
              <th>Debris Type</th>
              <th>Amount Fresh</th>
              <th>Amount Weathered</th>
            </tr>
          </thead>
          <tbody>
            { SRSRows }
          </tbody>
        </table>

        <h3>Accumulation Survey</h3>
        <table className="uk-table uk-table-striped">
          <thead>
            <tr>
              <th>Debris Type</th>
              <th>Amount Fresh</th>
              <th>Amount Weathered</th>
            </tr>
          </thead>
          <tbody>
            { ASRows }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Survey;
