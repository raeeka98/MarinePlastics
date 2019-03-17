import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LocationBar from './LocationBar';
import Map from '../Map/Map'

import { locationSort, locationFind, debrisFind, userFind, orgFind } from '../_helpers/SortHelper';
import { getTotalPounds } from '../_helpers/ChartHelpers';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rawData: [],
      searchResult: [],
      filter: 'beach',
      loaded: false,
      error: false,

      beaches: [],
      surveys: [],
      view: 'split'
    };
    this.styleMain = this.styleMain.bind(this);
    this.loadBeaches = this.loadBeaches.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    this.getTotalDebris = this.getTotalDebris.bind(this);
    this.handleViewTypeChange = this.handleViewTypeChange.bind(this);
    this.url = '/beaches';
  }

  // Load the beach info
  loadBeaches() {
    axios.get(this.url)
      .then(res => {
        this.setState({
          beaches: res.data,
          loaded: true
        });
        //console.log(this.state.beaches);
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          loaded: true,
          error: true
        });
      })
  }

  handleSearchTypeChange(e) {
    this.setState({ filter: e.target.value });
    this.handleSearch(document.getElementById("searchBar").value, e.target.value);
  }

  handleSearchChange(e) {
    this.handleSearch(e.target.value, this.state.filter);
  }

  async handleViewTypeChange(e) {
    await this.setState({ view: e.target.value });
    let container = document.getElementById("mainContainer");

    // Add/Remove styling classes when view is changed
    if (this.state.view === "list") {
      console.log("state = list");
      container.classList.add("list-view");
      container.classList.remove("map-view");
      container.classList.remove("split-view");
    }

    if (this.state.view === "map") {
      console.log("state = map")
      container.classList.add("map-view");
      container.classList.remove("list-view");
      container.classList.remove("split-view");
    }

    if (this.state.view === "split") {
      console.log("state = split");
      container.classList.add("split-view");
      container.classList.remove("list-view");
      container.classList.remove("split-view");
    }
  }


  filterFunctions = {
    beach: locationFind,
    debris: debrisFind,
    user: userFind,
    org: orgFind
  };

  handleSearch(value, filter) {
    axios.get("/beaches/search", { params: { q: value } })
      .then(res => {
        console.log(res.data);
        this.setState({ beaches: res.data });
      }).catch(err => {
        console.log(err);
      });
  }

  getTotalDebris(){
    axios.get(this.url + "/allstats")
      .then((res) => {
        let dataArray = res.data;
        var dataTotals = 0;
        for(let i = 0; i < dataArray.length; i++){
          let rawStats = dataArray[i].stats.TODF;
          for(const trash in rawStats){
            dataTotals += rawStats[trash];
          }
        }
        this.setState({totalWeight : dataTotals});
      })
  }


  showEntries = (locationNodes) => {
    let errStr = "Something went wrong!"
    let { loaded, error } = this.state;
    if (loaded && !error) {
      return locationNodes.length < 1 ? <div>No Entries</div> : locationNodes
    }
    return (
      <span className={error ? "err" : "loader"}>
        <span>{error ? errStr : ""}</span>
        <span></span><span></span>
      </span>
    );
  }

  styleMain () {
    let main = document.getElementById("mainContainer");
    let mainOffset = main.offsetTop;
    // console.log("mainOffset = " + mainOffset);
    // console.log("available space = " + (document.documentElement.clientHeight - mainOffset));
    let availSpace = document.documentElement.clientHeight - mainOffset;
    main.style.height = availSpace + "px";
  }

  // once the component is on the page, checks the server for comments
  componentDidMount() {
    this.styleMain();
    this.loadBeaches();
    this.getTotalDebris();
    //this.loadCommentsFromServer();
  }

  render() {
    //console.log(this.props.userProfile)
    // returns HTML for every entry in the sorted array of locations
    let locationNodes = this.state.beaches.map((location, i) => {

      let path = location.n.replace(" ", "");
      let entryString = location.numOfSurveys > 1 ? 'Entries' : 'Entry';
      // console.log(location.numOfSurveys);

      return <LocationBar
        key={i}
        location={location}
        path={path}
        entryString={entryString}
        userProfile={this.props.userProfile}
        //getUserProfile={this.props.getUserProfile}
        //sisAuth={this.props.isAuth}
      />
    });

    // console.log(this.state.rawData);
    let totalWeight = this.state.totalWeight;

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
                <select className="uk-select uk-form" id='type' onChange={this.handleSearchTypeChange}>
                  <option value="beach">By Beach</option>
                  <option value="debris">By Debris</option>
                  <option value="user">By Team Leader</option>
                  <option value="org">By Organization</option>
                </select>
              </div>

              <div className="uk-width-1-5">
                <select className="uk-select uk-form" id="view-type" onChange={this.handleViewTypeChange}>
                  <option value="split">List and Map</option>
                  <option value="list">List</option>
                  <option value="map">Map</option>

                </select>
              </div>
            </form>
          </div>

          <div id="mainContainer" className="split-view uk-align-center">
            {this.state.view === 'list'
              ? <div id="locations" className="uk-background-muted uk-padding" style={locationNodes.length > 1 ? { overflowY: 'scroll' } : null}>
                  {this.showEntries(locationNodes)}
                </div>
              : null
            }

            { this.state.view === 'map'
              ? <Map userProfile={this.props.userProfile}/>
              : null
            }

            { this.state.view === 'split'
              ? <div className="uk-flex uk-flex-row">
                  <div className="uk-width-1-3">
                    <div id="locations"
                          className="uk-background-muted uk-padding uk-height-expand"
                          data-uk-height-viewport="offset-top: true"
                          style={locationNodes.length > 1 ? { overflowY: 'scroll' } : null}>
                      {this.showEntries(locationNodes)}
                    </div>
                  </div>
                  <div className="uk-width-2-3">
                    <Map userProfile={this.props.userProfile}/>
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
