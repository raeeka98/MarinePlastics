import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { ColumnChart, PieChart } from "./Charts";
import axios from 'axios';
// to get the pin styles
import '../Map/Map.css';
import { sumDebrisTypes } from '../_helpers/ChartHelpers';



class Location extends Component {
  constructor(props) {
    super(props);
    // the data is passed from ../Home/Home.js from the Link
    // this.props.location.state is where the Link passes the state to
    let beachData = this.props.location.state.data;
    console.log(beachData);

    this.state = {
      beachData,
      pieChartData: {},
      surveys: {}
    }
  }

  getStats = () => {
    axios.get(`/beaches/${this.state.beachData._id}`)
      .then(res => {
        console.log(res.data);

        this.setState({ surveys: res.data.surveys, pieChartData: sumDebrisTypes(res.data.surveys) });
      })
  }

  componentDidMount() {
    this.getStats();
  }


  render() {
    let { lat, lon, name: beachName } = this.state.beachData;

    let surveys = [];
    // for every entry, returns a link to the entry page
    // text is the date cleanup happened
    let subDate = new Date(0);
    for (const submitDate in this.state.beachData.surveys) {
      const entry = this.state.beachData.surveys[submitDate];
      subDate.setMilliseconds(submitDate);
      surveys.push(
        <li key={entry}>
          <Link to={{ pathname: `/entry/${entry}` }}>
            {subDate.toLocaleDateString()}
          </Link>
        </li>
      );
    }
    let checkRange = (num, isLat) => {
      let isInRange = false;
      if (isLat && num < 91 && num > -91) isInRange = true;
      else if (!isLat && num < 181 && num > -181) isInRange = true;
      return isInRange;
    }
    // the marker for the location on the map
    const CustomMarker = ({ name }) => <div className="custom-marker"><p>{name}</p></div>;
    return (
      <div>
        <h1 className="uk-text-primary uk-heading-primary">{beachName}</h1>
        <div className="uk-grid uk-grid-match">
          {console.log(this.state.surveys)}
          <ColumnChart chartData={this.state.surveys} />
          <div className="uk-width-1-4">
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Entries</h3>
              <ul>
                {surveys}
              </ul>
            </div>
          </div>
          {
            lat && lon && checkRange(lat, true) && checkRange(lon, false) ?
              (<div style={{ height: '500px', width: '500px' }} className="uk-card uk-card-default uk-card-body">
                <GoogleMapReact
                  defaultCenter={{
                    lat: lat,
                    lng: lon,
                  }}
                  defaultZoom={13}
                  bootstrapURLKeys={{
                    key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA']
                  }}
                >
                  <CustomMarker
                    lat={lat}
                    lng={lon}
                    name={beachName}
                  />
                </GoogleMapReact>
              </div>) : null
          }
          <PieChart chartData={this.state.pieChartData} />
        </div>
      </div>
    );
  }
}

export default Location;
