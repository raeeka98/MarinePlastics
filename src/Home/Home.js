import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { locationSort } from '../_helpers/SortHelper';
import { locationFilter } from '../_helpers/SortHelper';

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
        <div className="uk-card uk-card-default uk-card-body uk-margin" key={i}>
          {/* state attr passes data to the location page */}
          <h3 className="uk-card-title">
            <Link to={{
              pathname: `/location/${path}`,
              state: { data: location }
            }}>
              { location.name }
            </Link>
          </h3>
          <p>{ location.entries.length } Entries</p>
        </div>
      );
    });
    // returns a list with all the sorted locations
    return (
      <form className="uk-search uk-search-default uk-width-1-2 uk-align-center">
        <input className="uk-search-input" id="searchBar" type="search" onKeyPress={ locationFilter({ locations }) } placeholder="Search..."/>
        <div id="locations">
          { locationNodes }
        </div>
      </form>
    );
  }
}

export default Home;
