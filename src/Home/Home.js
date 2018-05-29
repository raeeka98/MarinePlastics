import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { locationSort, locationFind, debrisFind } from '../_helpers/SortHelper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rawData: [],
      searchResult: [],
      filter: 'beach',
    };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
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
          rawData: res.data,
          searchResult: sorted
        });
      });
  }

  handleSearchTypeChange(e){
    this.setState({ filter: e.target.value });
  }

  handleSearch(e) {
    if (this.state.filter === 'beach'){
      if (e.target.value.length > 0) {
        const result = locationFind(this.state.data, e.target.value);
        this.setState({ searchResult: result });
      } else {
        const allLocations = this.state.data;
        this.setState({ searchResult: allLocations });
      }
    } else if (this.state.filter === 'debris') {
      if (e.target.value.length > 0){
        const result = debrisFind(this.state.rawData, e.target.value);
      }
    } else {
      const allLocations = this.state.data;
      this.setState({ searchResult: allLocations });
    }
  }

  // once the component is on the page, checks the server for comments
  componentDidMount() {
    this.loadCommentsFromServer();
  }

  render() {
    // returns HTML for every entry in the sorted array of locations
    let locationNodes = this.state.searchResult.map((location, i) => {
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
        <select className="uk-select uk-margin" id='type' onChange = { this.handleSearchTypeChange }>
          <option value="beach">By Beach</option>
          <option value="debris">By Debris</option>
        </select>
        <input
          className="uk-search-input uk-margin uk-text-large uk-padding uk-margin-large-top"
          id="searchBar"
          type="search"
          onChange={ this.handleSearch } 
          placeholder="Search..."
        />
        <div id="locations">
          { locationNodes }
          { this.state.data.length < 1
            ? <div>No Entries</div> : null
          }
        </div>
      </form>
    );
  }
}

export default Home;