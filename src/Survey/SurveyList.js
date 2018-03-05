import React, { Component } from 'react';
import axios from 'axios';

import Survey from './Survey';
import style from '../style';

class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.pollInterval = null;
  }

  loadCommentsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  handleCommentDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Comment deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    } 
  }

  //when incorporating into another project
  //(with react-router for instance),
  //this will prevent error messages every 2 seconds
  //once the SurveyBox is unmounted
  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    let surveyNodes = this.state.data.map(comment => {
      return (
        <Survey
          comment={ comment }
          onCommentDelete={ this.onCommentDelete }
          key={ comment._id }>
        </Survey>
        )
      });
      return (
      <div style={ style.commentList }>
        { surveyNodes }
      </div>
      );
    }
  }

  export default SurveyList;
