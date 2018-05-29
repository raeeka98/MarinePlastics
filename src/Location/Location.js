import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

// to get the pin styles
import '../Map/Map.css';

import '../Location/BarChart.js';

class Location extends Component {
  constructor(props) {
    super(props);
    // the data is passed from ../Home/Home.js from the Link
    // this.props.location.state is where the Link passes the state to
    this.state = {
      data: this.props.location.state.data || {},
    }
    var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
  
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
  
    var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  }

  render() {
    // for every entry, returns a link to the entry page
    // text is the date cleanup happened
    let entries = this.state.data.entries.map((entry) => {
      return(
        <li key={entry._id}>
          <Link to={{ pathname: `/entry/${entry._id}` }}>
            {entry.date}
          </Link>
        </li>
      );
    });

    // the marker for the location on the map
    const CustomMarker = ({ name }) => <div className="custom-marker"><p>{ name }</p></div>;
    return(
      <div>
        <h1>{ this.state.data.name }</h1>
        <div className="uk-grid">
          <div>
            <div style={{height: '500px', width: '500px'}} className="uk-card uk-card-default uk-card-body">
              <GoogleMapReact
                defaultCenter={{
                  lat: this.state.data.lat,
                  lng: this.state.data.lon,
                }}
                defaultZoom={13}
                bootstrapURLKeys={{
                  key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA']
                }}
              >
                <CustomMarker
                  lat={ this.state.data.lat }
                  lng={ this.state.data.lon }
                  name={ this.state.data.name }
                />
              </GoogleMapReact>
            </div>
          </div>
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Entries</h3>
              <ul>
                { entries }
              </ul>
            </div><br />
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Entries</h3>
              <ul>
                { entries }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
