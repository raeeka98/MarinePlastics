import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Survey from './Survey';

class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
  }

  loadCommentsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
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
      console.log(comment);
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

  //         <Survey
//   comment={ comment }
//   key={ comment._id }>
// </Survey>