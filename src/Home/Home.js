import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { locationSort, locationFind } from '../_helpers/SortHelper';

class Home extends Component {
  constructor(props) {
    super(props);
    // data state doesn't change, so when search - can go back to all entries easily
    // locations change w/ what user searches
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
        // initializes data and locations states (data won't change)
        this.setState({
          data: sorted,
          locations: sorted
        });
      });
  }

  handleSearch(e) { 
    if (e.target.value.length > 0) {
      // get arr of matches, set locations state (which is used to load list)
      const result = locationFind(this.state.data, e.target.value);
      this.setState({ locations: result });
    } else {
      // if nothing in input, put all entries back in locations state
      const allLocations = this.state.data;
      this.setState({ locations: allLocations });
    }
  }

  // once the component is on the page, checks the server for comments
  componentDidMount() {
    this.loadCommentsFromServer();
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

    return (
      <div className="uk-width-1-2 uk-align-center">
        <form className="uk-search uk-search-default uk-width-1-1">
          <input
            className="uk-search-input uk-margin uk-text-large uk-padding uk-margin-medium-top"
            id="searchBar"
            type="search"
            onChange={ this.handleSearch } 
            placeholder="Search entries..."
          />
        </form>
        <div id="locations" className="uk-height-large uk-background-muted uk-padding" style={{ overflowY: 'scroll' }}>
          { locationNodes }
          { this.state.data.length < 1
            ? <div>No Entries</div> : null
          }
        </div>
      </div>
    );
  }
}

export default Home;
