/**
 * Home.jsx
 * Code for the home page, which has a list of beaches on the left side, a map
 * of the locations of the beaches on the right side, and the option to hide
 * one of these displays.
 */
import React, { Component } from 'react';
import axios from 'axios';
import LocationBar from './LocationBar';
import Map from '../Map/Map'
import { lastModFilter, beachNameFilter } from '../_helpers/SortHelper';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rawData: [],
      searchResult: [],
      filter: 'mod',
      loaded: false,
      error: false,

      timeout: null,
      beaches: [],
      surveys: [],
      view: 'split'
    };
    this.styleMain = this.styleMain.bind(this);
    this.loadBeaches = this.loadBeaches.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getTotalDebris = this.getTotalDebris.bind(this);
    this.handleViewTypeChange = this.handleViewTypeChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.url = '/beaches';
  }

  /**
   * Loads the beach info.
   */
  loadBeaches() {
    axios.get(this.url)
      .then(res => {
        this.setState({
          beaches: res.data,
          loaded: true
        });
      })
      .catch(err => {
        this.setState({
          loaded: true,
          error: true
        });
      });
  }

  /**
   * Changes whether to show both the list and the map or just one of the two
   * based on e.
   * @param {any} e
   */
  async handleViewTypeChange(e) {
    await this.setState({ view: e.target.value });
    let container = document.getElementById("mainContainer");

    // change the state to display the list only
    if (this.state.view === "list") {
      container.classList.add("list-view");
      container.classList.remove("map-view");
      container.classList.remove("split-view");
    }

    // display the map only
    if (this.state.view === "map") {
      container.classList.add("map-view");
      container.classList.remove("list-view");
      container.classList.remove("split-view");
    }

    // display the split view
    if (this.state.view === "split") {
      container.classList.remove("list-view");
      container.classList.remove("split-view");
      container.classList.add("split-view");
    }
  }

  /**
   * Upon initial load, beach data is loaded by last modification (from the
   * backend). Called when filter type is changed, then calls changeFilter() to
   * reorder entries.
   * @param {any} e
   */
  async handleFilterChange(e) {
    let filterName = e.target.value;
    await this.setState({ filter: filterName });
    this.changeFilter();
  }

  /**
   * Changes how the beaches are filtered, which is either by last date
   * modified or by beach name.
   */
  async changeFilter() {
    let filterName = this.state.filter;
    if (filterName === 'mod') {
      let sortedBeachList = await lastModFilter(this.state.beaches);
      this.setState({ beaches: sortedBeachList });
    }
    else if (filterName === 'beach') {
      let sortedBeachList = await beachNameFilter(this.state.beaches);
      this.setState({ beaches: sortedBeachList });
    }
  }

  /**
   * Calls handleSearch(value) with a timeout of 250ms.
   * @param {any} e
   */
  handleSearchChange(e) {
    clearTimeout(this.state.timeout);
    let that = this;
    let query = e.target.value;
    this.setState({
      timeout: setTimeout(
        () => that.handleSearch(query, that.state.filter), 250)
    });
  }

  /**
   * Queries the database for beaches that match the substring that the user
   * inputted.
   * @param {any} value
   */
  handleSearch(value) {
    axios.get("/beaches/search", { params: { q: value } })
      .then(res => {
        this.setState({ beaches: res.data });
        this.changeFilter();
      }).catch(err => {
        console.log(err);
      });
  }

  /**
   * Gets the total debris for all beaches.
   */
  getTotalDebris() {
    axios.get(this.url + "/allstats")
      .then((res) => {
        let dataArray = res.data;
        var dataTotals = 0;
        for (let i = 0; i < dataArray.length; i++) {
          let rawStats = dataArray[i].stats.TODF;
          for (const trash in rawStats) {
            dataTotals += rawStats[trash];
          }
        }
        this.setState({ totalWeight: dataTotals });
      });
  }

  /**
   * Uses JSX code to show list of beaches and their surveys by date. If there
   * is an error, states so.
   * @param {any} locationNodes
   * @return JSX code
   */
  showEntries = (locationNodes) => {
    let errStr = "Something went wrong!"
    let { loaded, error } = this.state;
    if (loaded && !error) {
      return locationNodes.length < 1 ? <div>No Entries</div> : locationNodes;
    }
    return (
      <span className={error ? "err" : "loader"}>
        <span>{error ? errStr : ""}</span>
        <span></span><span></span>
      </span>
    );
  }

  /**
   * Styles the page based on the client's webpage size.
   */
  styleMain() {
    let main = document.getElementById("mainContainer");
    let mainOffset = main.offsetTop;
    let availSpace = document.documentElement.clientHeight - mainOffset;
    main.style.height = availSpace + "px";
  }

  /**
   * Once the component is on the page, checks the server for comments.
   */
  componentDidMount() {
    this.styleMain();
    this.loadBeaches();
    this.getTotalDebris();
  }

  /**
   * Returns JSX code for every entry in the sorted array of locations.
   * @return JSX code
   */
  render() {
    let locationNodes = this.state.beaches.map((location, i) => {
      let path = location.n.replace(" ", "");
      let entryString = location.numOfSurveys > 1 ? 'Entries' : 'Entry';

      return <LocationBar
        key={i}
        location={location}
        path={path}
        entryString={entryString}
        userProfile={this.props.userProfile}
      />
    });

    return (
      <div className="uk-align-center">
        <div className="uk-align-center uk-width-4-5">
          <form className="uk-grid uk-grid-small">
            <div className="uk-width-3-5">
              <input
                className="uk-input uk-form"
                id="searchBar"
                type="search"
                onChange={this.handleSearchChange}
                placeholder="Search..."
              />
            </div>

            <div className="uk-width-1-5">
              <select
                className="uk-select uk-form"
                id='type'
                onChange={this.handleFilterChange}
              >
                <option value="mod">Last Modified</option>
                <option value="beach">Beach Name</option>
              </select>
            </div>

            <div className="uk-width-1-5">
              <select
                className="uk-select uk-form"
                id="view-type"
                onChange={this.handleViewTypeChange}
              >
                <option value="split">List and Map</option>
                <option value="list">List</option>
                <option value="map">Map</option>
              </select>
            </div>
          </form>
        </div>

        <div id="mainContainer" className="split-view uk-align-center">
          {this.state.view === 'list'
            ?
            <div
              id="locations"
              className="uk-background-muted uk-padding"
              style={locationNodes.length > 1 ? { overflowY: 'scroll' } : null}
            >
              {this.showEntries(locationNodes)}
            </div>
            : null
          }

          {this.state.view === 'map'
            ? <Map userProfile={this.props.userProfile} />
            : null
          }

          {this.state.view === 'split'
            ? <div className="uk-flex uk-flex-row uk-margin">
              <div className="uk-width-1-3">
                <div id="locations"
                  className="uk-background-muted uk-padding uk-height-expand"
                  data-uk-height-viewport="offset-top: true"
                  style={locationNodes.length > 1 ? { overflowY: 'scroll' }
                    : null}>
                  {this.showEntries(locationNodes)}
                </div>
              </div>
              <div className="uk-width-2-3">
                <Map userProfile={this.props.userProfile} />
              </div>
            </div>
            : null
          }
        </div>
        {/* <div className="uk-section uk-section-primary uk-margin-top">
            <div className="uk-container">
              <h2 className="uk-text-center uk-heading">{totalWeight} pieces of marine debris picked up so far!</h2>
            </div>
          </div> */}
      </div>
    );
  }

}

export default Home;
