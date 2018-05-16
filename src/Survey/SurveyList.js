import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { locationSort } from '../SortHelper.js';

class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
  }

  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
        res.data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
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
    // eslint-disable-next-line
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    const locations = locationSort(this.state.data);
    let locationNodes = locations.map((location, i) => {
      let path = location.name.replace(/\s/g, '');
      return (
        <li key={i}>
          <Link to={{
            pathname: `/location/${path}`,
            state: { data: location }
          }}>
            {location.name}: {location.entries.length} Entries
          </Link>
        </li>
      );
    });
    return (
      <ul>
        { locationNodes }
      </ul>
    );
  }
}

export default SurveyList;
