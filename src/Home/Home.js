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
    this.handleSearchChange = this.handleSearchChange.bind(this);
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
          searchResult: sorted,
        });
      });
  }

  handleSearchTypeChange(e){
    this.setState({ filter: e.target.value });
    console.log(document.getElementById("searchBar").value);
    this.handleSearch(document.getElementById("searchBar").value, e.target.value);
  }

  handleSearchChange(e) {
    this.handleSearch(e.target.value, this.state.filter);
  }

  handleSearch(value, filter) {
    if (value.length > 0) {
      if (filter === 'beach') {
        const result = locationFind(this.state.data, value);
        this.setState({ searchResult: result });
      } else if (filter === 'debris') {
        const result = debrisFind(this.state.rawData, value);
        this.setState({ searchResult: result });
      } else {
        const allLocations = this.state.data;
        this.setState({ searchResult: allLocations });
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

    return (
      <div className="uk-width-2-3 uk-align-center uk-margin-large-top">
        <form className="uk-grid uk-grid-small uk-margin-small-bottom">
          <div className="uk-width-2-3">
            <input
              className="uk-input uk-form-large"
              id="searchBar"
              type="search"
              onChange={ this.handleSearchChange } 
              placeholder="Search..."
            />
          </div>
          <div className="uk-width-1-3">
            <select className="uk-select uk-form-large" id='type' onChange={ this.handleSearchTypeChange }>
              <option value="beach">By Beach</option>
              <option value="debris">By Debris</option>
            </select>
          </div>
        </form>
        <div id="locations" className="uk-background-muted uk-padding uk-height-large" style={{ overflowY: 'scroll' }}>
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
