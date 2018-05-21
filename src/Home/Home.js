import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { locationSort } from '../_helpers/SortHelper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
  }

  // gets the entries from the server, saves them in the state
  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
        res.data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.setState({ data: res.data });
      });
  }

  // once the component is on the page, checks the server for comments every 2000 milliseconds? some sort of interval
  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    }
  }

  // stops checking the server when the component isn't loaded
  componentWillUnmount() {
    // eslint-disable-next-line
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    // locations is an array of sorted server entries based on location
    const locations = locationSort(this.state.data);
    // returns HTML for every entry in the sorted array of locations
    let locationNodes = locations.map((location, i) => {
      let path = location.name.replace(/\s/g, '');
      return (
        <li key={i}>
          {/* state attr passes data to the location page */}
          <Link to={{
            pathname: `/location/${path}`,
            state: { data: location }
          }}>
            {location.name}: {location.entries.length} Entries
          </Link>
        </li>
      );
    });
    // returns a list with all the sorted locations
    return (
      <ul>
        { locationNodes }
      </ul>
    );
  }
}

export default Home;
