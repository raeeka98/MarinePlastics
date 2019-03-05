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
      view: 'list'
    };
    //this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.loadBeaches = this.loadBeaches.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    this.getTotalDebris = this.getTotalDebris.bind(this);
    this.handleViewTypeChange = this.handleViewTypeChange.bind(this);
    //this.getSurveysFromBeach = this.getSurveysFromBeach.bind(this, );
    this.url = '/beaches';
  }

  // gets the entries from the server, saves them in the state
  // loadCommentsFromServer() {
  //   axios.get(this.url)
  //     .then(res => {
  //       res.data.sort((a, b) => {
  //         return new Date(b.date).getTime() - new Date(a.date).getTime();
  //       });
  //       // sorts data into locations
  //       // const sorted = locationSort(res.data);
  //       this.setState({
  //         data: res.data,
  //         rawData: res.data,
  //         loaded: true
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //       this.setState({
  //         loaded: true,
  //         error: true
  //       });
  //     })
  // }

  // Load the beach names
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

  handleViewTypeChange(e) {
    this.setState({ view: e.target.value });
    
    let container = document.getElementById("mainContainer");
    //console.log(container.classList);

    if (container.classList.contains('listView')) {
      container.classList.add("mapView");
      container.classList.remove("listView");
      console.log(container.classList);
    }

    else if (container.classList.contains('mapView')) {
      container.classList.add("listView");
      container.classList.remove("mapView");
      console.log(container.classList);
    }

    // Add/Remove styling classes as 
    // if (this.state.view === "list") {
    //   console.log("state = list");
    //   container.classList.add("listView");
    //   container.classList.remove("mapView")
    // }

    // if (this.state.view === "map") {
    //   console.log("state = map")
    //   container.classList.add("mapView");
    //   container.classList.remove("listView");
    // }
  }


  filterFunctions = {
    beach: locationFind,
    debris: debrisFind,
    user: userFind,
    org: orgFind
  };

  handleSearch(value, filter) {
    let result = this.state.data;
    if (value.length > 0) {
      if (this.filterFunctions.hasOwnProperty(filter)) {
        result = this.filterFunctions[filter](this.state.data, value);
      }
    }
    this.setState({ searchResult: result });
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

  handleAccordionClick = (e) => {

    
    let accordionWrapper = e.target.parentElement;
    let accordionContent = e.target.nextSibling;
    if (e.target.classList.contains('uk-text-muted')) {
      accordionWrapper = e.target.parentElement.parentElement;
      accordionContent = e.target.parentElement.nextSibling;
    }

    if (accordionWrapper.classList.contains('uk-open')) {
      accordionWrapper.classList.remove('uk-open');
      accordionContent.style.display = 'none';
    } else {
      accordionWrapper.classList.add('uk-open');
      accordionContent.style.display = 'block';
    }
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

  // once the component is on the page, checks the server for comments
  componentDidMount() {
    this.loadBeaches();
    this.getTotalDebris();
    //this.loadCommentsFromServer();
  }

  render() {

    // returns HTML for every entry in the sorted array of locations
    let locationNodes = this.state.beaches.map((location, i) => {
      console.log(location);

      let path = location.n.replace(" ", "");
      let entryString = location.numOfSurveys > 1 ? 'Entries' : 'Entry';
      // an array of HTML elements with paths to each survey page
      let entryNodes = [];
      let subDate = new Date(0);



      for (const date in location.surveys) {
        const entryID = location.surveys[date];
        console.log(date);
        subDate.setUTCMilliseconds(date);
        entryNodes.push(
          <li key={`entry-${entryID}`}>
            <Link className="uk-link-muted"
              to={{ pathname: `/${location.name.replace(' ', '-')}/${entryID}` }}
              >
              {subDate.toLocaleDateString()}
            </Link>
          </li>
        );
      }
      return <LocationBar
        key={i}
        getSurveysFromBeach={this.getSurveysFromBeach}
        location={location}
        //entryNodes={entryNodes}
        path={path}
        entryString={entryString}
      />
    });

    console.log(this.state.rawData);
    let totalWeight = this.state.totalWeight;

    return (
      <div className="uk-align-center">
        <div className="uk-align-center">
          <form className="uk-grid uk-grid-small uk-margin-small-bottom uk-width-4-5">
            <div className="uk-width-2-5">
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
                <option value="list">List</option>
                <option value="map">Map</option>
                <option value="listmap">List and Map</option>
              </select>
            </div>
          </form>

          <div id="mainContainer" className="listView">
            {this.state.view === 'list' 
              ? <div id="locations" className="uk-background-muted uk-padding" style={locationNodes.length > 1 ? { overflowY: 'scroll' } : null}>
                  {this.showEntries(locationNodes)}
                </div> 
              : null
            }

            { this.state.view === 'map' 
              ? <Map/>
              : null
            }

          </div>
          {/* <div className="uk-section uk-section-primary uk-margin-top">
            <div className="uk-container">
              <h2 className="uk-text-center uk-heading">{totalWeight} pieces of marine debris picked up so far!</h2>
            </div>
          </div> */}
        </div>
      </div>
    );
  }

}

export default Home;
