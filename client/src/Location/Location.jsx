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

    this.state = {
      beachData,
      pieChartData: {},
      surveys: {}
    }
  }

  getStats = () => {
    console.log(this.state.beachData._id)
    axios.get(`/beaches/${this.state.beachData._id}`)
      .then(res => {
        
        this.setState({ surveyIDs: res.data, pieChartData: sumDebrisTypes(res.data) });
      })
      .then( () => {
        let trueSurveys = [];
        for(var i = 0; i < this.state.surveyIDs.length; i++){
          console.log(this.state.surveyIDs[i].survey);
          axios.get(`/beaches/surveys/${this.state.surveyIDs[i].survey}`)
            .then(res => {
              trueSurveys.push(res.data);
              this.setState({surveys: trueSurveys, pieChartData: sumDebrisTypes(trueSurveys)})
            });
        }
      });
  }

  componentDidMount() {
    this.getStats();
  }


  render() {
    let { lat, lon, name: beachName } = this.state.beachData;

    let surveys = [];
    // for every entry, returns a link to the entry page
    // text is the date cleanup happened
    let subDate;
    for (const submitDate in this.state.surveys) {
      const entry = this.state.surveys[submitDate];
      subDate = new Date(entry.survDate);
      surveys.push(
        <li key={entry._id}>
          <Link to={{ pathname: `/entry/${entry._id}` }}>
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
