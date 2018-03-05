import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
    this.url = 'http://localhost:3001/api/comments';
  }

  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
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
        <li key={comment._id}>
          <Link to={{
            pathname: `/entry/${comment._id}`,
            state: { comment: comment  }
          }}>
            {comment.date}: {comment.beach}
          </Link>
        </li>
      );
    });
    return (
      <ul>
        { surveyNodes }
      </ul>
    );
  }
}

  export default SurveyList;
