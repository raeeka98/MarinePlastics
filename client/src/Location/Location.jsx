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

  /* 
   * getStats(): 
   *  This function gets all the survey IDs using the given location's ID.
   *  Once it gets the survey IDs, it will then loop through each ID to obtain the actual
   *  survey contents that are stored in the database. These will be used for displaying the
   *  chart data as well as provide the data when the use clicks the links on the side of
   *  the page.
   * 
   *  Arguments: none (retrieves beach IDs stored in state)
   *  
   *  Returns: No return values, but it will store an array of survey information in this.state.surveys
   * 
   *  Raises: none
  */
  getStats = () => {
    axios.get(`/beaches/${this.state.beachData._id}`)
      .then(res => {
        this.setState({ surveyIDs: res.data, pieChartData: sumDebrisTypes(res.data) });
      })
      .then( () => {
        let trueSurveys = [];
        for(var i = 0; i < this.state.surveyIDs.length; i++){
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
          <div className='uk-grid-margin uk-width-1-3'>
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
          </div>
          <div className="uk-grid-margin uk-width-2-3">
            <PieChart chartData={this.state.pieChartData} />
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
