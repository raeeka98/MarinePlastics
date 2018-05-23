import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { locationSort, locationFind } from '../_helpers/SortHelper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      locations: [],
    };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
        // sorts data into locations 
        const sorted = locationSort(res.data);
        this.setState({
          data: sorted,
          locations: sorted
        });
      });
  }

  handleSearch(e) {
    if (e.target.value.length > 0) {
      const result = locationFind(this.state.data, e.target.value);
      this.setState({ locations: result });
    } else {
      const allLocations = this.state.data;
      this.setState({ locations: allLocations });
    }
  }

  // once the component is on the page, checks the server for comments every 2000 milliseconds? some sort of interval
  componentDidMount() {
    this.loadCommentsFromServer();
    // if (!this.pollInterval) {
    //   this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    // }
  }

  // stops checking the server when the component isn't loaded
  componentWillUnmount() {
    // eslint-disable-next-line
    // this.pollInterval && clearInterval(this.pollInterval);
    // this.pollInterval = null;
  }

  render() {
    // returns HTML for every entry in the sorted array of locations
    let locationNodes = this.state.locations.map((location, i) => {
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
            <span className="uk-text-muted uk-text-small uk-position-center-right uk-padding">
              { location.entries.length } Entr{location.entries.length > 1 ? 'ies': 'y'}
            </span>
          </h3>
        </div>
      );
    });
    // returns a list with all the sorted locations
    return (
      <form className="uk-search uk-search-default uk-width-1-2 uk-align-center">
        <input
          className="uk-search-input uk-margin uk-text-large uk-padding uk-margin-large-top"
          id="searchBar"
          type="search"
          onChange={ this.handleSearch } 
          placeholder="Search..."
        />
        <div id="locations">
          { locationNodes }
          { this.state.data.length === 0
            ? <div>No Entries</div> : null
          }
        </div>
      </form>
    );
  }
}

export default Home;
