/**
 * Location.jsx
 * Code for the location page. Includes histogram, pie chart, and list of
 * surveys made on the beach, given by the survey date. Also shows map of the
 * beach location.
 */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { ColumnChart, PieChart } from "./Charts";
import axios from 'axios';
import { getAllDebrisMap } from '../NewSurveyForm/debrisInfo';
// to get the pin styles
import '../Map/Map.css';

const debrisInfo = getAllDebrisMap();

class Location extends Component {
  constructor(props) {
    super(props);
    // data is passed from ../Home/Home.js from the link to this page
    let beachData = this.props.location.state.data;
    let userProfile = this.props.location.state.userProfile;
    let auth = this.props.auth;

    this.state = {
      beachData,
      pieChartData: {},
      surveys: null,
      userProfile,
      deletedComment: false
      // getUserProfile,
      // isAuth
    }
    this.getLatLon = this.getLatLon.bind(this);
  }

  /**
   * Requests to delete beach, and tells user if beach was successfully
   * deleted or not.
   */
  deleteBeach = () => {
    axios.delete(`/beaches/${this.state.beachData._id}`,
      {
        params:
        {
          userRoles: this.state.userProfile ?
            this.state.userProfile['https://marineplastics.com/roles'] : []
        },
        headers: {
          Authorization: `Bearer ${this.props.auth.getAccessToken()}`
        }
      })
      .then(res => {
        if (res.data.res === "fail") {
          alert("Beach deleted failed.");
        }
        else {
          this.setState({
            deletedComment: true
          });
          let closeModal = document.getElementById('closeModalButton');
          closeModal.click();
          setTimeout(() => alert("Beach deleted successfully."), 1000);
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  deleteBtn = () => {
    return (
      <React.Fragment>
        {
          <button
            className="uk-button button-active uk-margin-top"
            data-uk-toggle="target: #modal"
          >
            Delete Beach
          </button>
        }
        
        {/* The modal that is opened by clicking on the delete buttons */}
        <div id="modal" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body">
            <div>
              <h2>Are you sure you want to delete this beach?</h2>
              <p>
                This action cannot be undone. All surveys on this beach
                will also be deleted, along with all their data.
              </p>
            </div>

            <p className="uk-text-right">
              <div>
                <button
                  className="uk-button uk-button-danger uk-margin-left"
                  onClick={this.deleteBeach}
                >
                  Delete
                </button>
                <button
                  className="uk-button uk-button-default uk-modal-close"
                >
                  Cancel
                </button>
              </div>
            </p>

            <button
              id="closeModalButton"
              className="uk-modal-close-default"
              data-uk-close
            >
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }

  /**
   * Gets all the survey IDs using the given location's ID. Once it gets the
   * survey IDs, it will then loop through each ID to obtain the actual survey
   * contents that are stored in the database. These will be used for
   * displaying the chart data as well as provide the data when the user clicks
   * the links on the side of the page. Stores array of survey information in
   * state.
   */
  getStats = () => {
    axios.get(`/beaches/${this.state.beachData._id}`)
      .then(res => {
        this.setState({ surveyIDs: res.data });
      })
      .then(() => {
        // make a promise so that we'll get the surveys in order
        let promise = [];
        let trueSurveys = [];
        for (var i = 0; i < this.state.surveyIDs.length; i++) {
          promise.push(
            axios.get(`/beaches/surveys/${this.state.surveyIDs[i].survey}`));

        }
        // take that promise and fill the surveys field in the correct order
        axios.all(promise)
          .then((response) => {
            response.map(res => {
              trueSurveys.push(res.data.survData)

            })
          })
          .then(() => this.setState({ surveys: trueSurveys }));
      });
    // then, grab the stats for the beach
    axios.get(`/beaches/${this.state.beachData._id}/stats`)
      .then(res => {
        var categories = res.data.typesOfDebrisFound;
        var total = 0;
        var cleanCategories = {};
        for (const trash in categories) {
          total += categories[trash];
        }
        for (const trash in categories) {
          if (trash !== 'microDebris' && debrisInfo[trash]) {
            categories[trash] /= total;
            let infoEntry = debrisInfo[trash];
            if (infoEntry === "Fishing Line / Polypropylene Rope")
              infoEntry = "Fishing Line";
            if (infoEntry === "Plastic Bottles / Plastic Caps")
              infoEntry = "Plastic Bottles";
            cleanCategories[infoEntry] = Math.round(categories[trash] * 100);
          }
        }
        this.setState({ beachStats: cleanCategories });
      });

  }

  /**
   * Gets the latitude and longitude for the beach.
   */
  getLatLon() {
    axios.get(`/beaches/${this.state.beachData._id}/coords`)
      .then(res => {
        var bData = this.state.beachData;
        bData.lon = res.data.lon;
        bData.lat = res.data.lat;
        this.setState({ beachData: bData });
      })

  }

  /**
   * When the component mounts, calls getStats() getLatLon(), if needed.
   */
  componentDidMount() {
    this.getStats();
    // There's no latitude or longitude, we need to fetch it from the server
    if (!this.state.beachData.lat && !this.state.beachData.lon) {
      this.getLatLon();
    }

  }

  /**
   * Creates JSX code to render the location page.
   * @return JSX code
   */
  render() {
    // redirect if data change actions are being taken
    if (this.state.deletedComment) return <Redirect to="/home" />

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
                beachName: this.state.beachData.n,
                surveyID: entry._id,
                info: this.state.beachData,
                userProfile: this.state.userProfile
                /**
                 * getUserProfile: this.state.getUserProfile, 
                 * isAuth:this.state.isAuth
                 */
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
    const CustomMarker = ({ name }) =>
      <div className="custom-marker"><p>{name}</p></div>;

    // gets userRoles to determine if should show delete button or not
    let userRoles = this.state.userProfile ?
      this.state.userProfile['https://marineplastics.com/roles'] : []
    return (
      <div className="uk-container">
        <h1 className="uk-text-primary uk-heading-primary">
          {this.state.beachData.n}
        </h1>
        <div className="uk-grid uk-grid-match">
          <ColumnChart chartData={this.state.surveys} />
          <div className="uk-width-1-4">
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Entries</h3>
              <ul>
                {surveys}{/** List all surveys under beach */}
                {/**If they are logged in let them add survey from beach */}
                {this.state.userProfile ? <li className="uk-link-muted">
                  <Link to={{
                    pathname: `/survey`, state: {
                      beachID:this.state.beachData._id
                    }
                  }} >
                    + Add Survey
                  </Link>
                </li> : null}
              </ul>
            </div>
          </div>
          <div className='uk-grid-margin uk-width-1-3'>
            {
              lat && lon && checkRange(lat, true) && checkRange(lon, false) ?
                (
                  <div
                    style={{ height: '550px', width: '500px' }}
                    className="uk-card uk-card-default uk-card-body"
                  >
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
                  </div>
                ) : null
            }
          </div>
          <div className="uk-grid-margin uk-width-2-3">
            <PieChart chartData={this.state.beachStats} />
          </div>
        </div>
        <div>
          {
            userRoles.includes('Admin') ? this.deleteBtn() : null
          }
        </div>
      </div>
    );
  }
}

export default Location;
