import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { ColumnChart, PieChart } from "./Charts";
import axios from 'axios';
import { getAllDebris } from '../NewSurveyForm/debrisInfo'
// to get the pin styles
import '../Map/Map.css';

const debrisInfo = getAllDebris();

class Location extends Component {
  constructor(props) {
    super(props);
    // the data is passed from ../Home/Home.js from the Link
    // this.props.location.state is where the Link passes the state to
    let beachData = this.props.location.state.data;
    let userProfile = this.props.location.state.userProfile;

    this.state = {
      beachData,
      pieChartData: {},
      surveys: null,
      userProfile,
      // getUserProfile,
      // isAuth
    }
    this.getLatLon = this.getLatLon.bind(this);
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
        this.setState({ surveyIDs: res.data });
      })
      .then(() => {
        //Here, we're gonna need to make a promise so that we'll get the surveys in order
        let promise = [];
        let trueSurveys = [];
        for (var i = 0; i < this.state.surveyIDs.length; i++) {
          promise.push(axios.get(`/beaches/surveys/${this.state.surveyIDs[i].survey}`));

        }
        // Then, take that promise and fill the surveys field in the correct order
        axios.all(promise)
          .then((response) => {
            response.map(res => {
              trueSurveys.push(res.data.survData)

            })
          })
          .then(() => this.setState({ surveys: trueSurveys }));
      });
    // Then, grab the stats for the beach
    axios.get(`/beaches/${this.state.beachData._id}/stats`)
      .then(res => {
        var categories = res.data.typesOfDebrisFound;
        var total = 0;
        var cleanCategories = {};
        for (const trash in categories) {
          total += categories[trash];
        }
        for (const trash in categories) {
          categories[trash] /= total;
          let infoEntry = debrisInfo[trash];
          if (infoEntry === "Fishing Line / Polypropylene Rope")
            infoEntry = "Fishing Line";
          if (infoEntry === "Plastic Bottles / Plastic Caps")
            infoEntry = "Plastic Bottles";
          cleanCategories[infoEntry] = Math.round(categories[trash] * 100);
        }
        this.setState({ beachStats: cleanCategories });
      });

  }

  getLatLon() {
    axios.get(`/beaches/${this.state.beachData._id}/coords`)
      .then(res => {
        var bData = this.state.beachData;
        bData.lon = res.data.lon;
        bData.lat = res.data.lat;
        this.setState({ beachData: bData });
      })

  }

  componentDidMount() {
    this.getStats();
    // There's no latitude or longitude, we need to fetch it from the server
    if (!this.state.beachData.lat && !this.state.beachData.lon) {
      this.getLatLon();
    }

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
          <Link className="uk-link-muted"
            to={{
              pathname: `/surveys/${entry._id.replace(' ', '-')}`,
              state: {
                beachName: this.state.beachData.n, surveyID: entry._id, info: this.state.beachData,
                userProfile: this.state.userProfile/*, getUserProfile: this.state.getUserProfile, isAuth:this.state.isAuth*/
              }
            }}>

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
      <div className="uk-container">
        <h1 className="uk-text-primary uk-heading-primary">{this.state.beachData.n}</h1>
        <div className="uk-grid uk-grid-match">
          <ColumnChart chartData={this.state.surveys} />
          <div className="uk-width-1-4">
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Entries</h3>
              <ul>
                {surveys}
                {this.state.userProfile ? <li className="uk-link-muted">
                  <Link to={{
                    pathname: `/survey`, state: {
                      beachID:this.state.beachData._id
                    }
                  }} >
                    + Create Survey
                  </Link>
                </li> : null}
              </ul>
            </div>
          </div>
          <div className='uk-grid-margin uk-width-1-3'>
            {
              lat && lon && checkRange(lat, true) && checkRange(lon, false) ?
                (<div style={{ height: '550px', width: '500px' }} className="uk-card uk-card-default uk-card-body">
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
            <PieChart chartData={this.state.beachStats} />
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
