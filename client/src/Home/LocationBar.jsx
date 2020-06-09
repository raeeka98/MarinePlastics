/**
 * LocationBar.jsx
 * Displays one item in the list on the home page. Shows a beach and its
 * coordinates in a box, where if the user click on a box, it shows a list of
 * the dates for each survey that has been conducted on the beach. If the user
 * clicks on the name of the beach, it links to the location page for the]
 * beach and if the user clicks on a date for a survey, it links to the survey
 * page for that survey.
 */
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class LocationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      loading: false,
      lat: [0,0,0,0],
      lon: [0, 0, 0, 0],
      // prevents user from spamming click button & loading surveys mult. times
      clicked: false 
    }
    this.getSurveysFromBeach = this.getSurveysFromBeach.bind(this);
    this.createHTMLForEntries = this.createHTMLForEntries.bind(this);
    this.getLatLon = this.getLatLon.bind(this);
  };
 
  /**
   * Called when a user expands the accordion for a beach. Fetches surveys
   * listed under the beach that is clicked.
   */
  getSurveysFromBeach() {
    this.setState({ clicked: true, loading: true });
    let beachID = this.props.location._id;

    axios.get('/beaches/' + beachID)
      .then(res => {
        this.setState({ loading: false });
        // for each month returned by request, creates link to survey page
        for (let month of Object.keys(res.data)) {
          let survey = res.data[month];
          // appends HTML to surveysHTML array, which is then updated to state
          this.createHTMLForEntries(month, survey);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Returns HTML for every entry in the sorted array of locations. Should
   * display date and contain a link to specific survey page.
   * @params {any} month, {any} survey
   */
  createHTMLForEntries(month, survey) {
    let surveyID = survey.survey;
    let promise = [];
    let surveyDay;
    // use a promise here because surveys should display in order by date
    promise.push(axios.get(`/beaches/surveys/${surveyID}/date`));

    axios.all(promise)
      .then(response => {
        response.map(res => surveyDay = new Date(res.data));
      })
      .then(() => {
        let surveysHTML = this.state.surveys;
        surveysHTML.push(
          <li key={`entry-${surveyID}`}>
            <Link className="uk-link-muted"
              to={{
                pathname: `/surveys/${surveyID.replace(' ', '-')}`,
                state: {
                  beachName: this.props.location.n,
                  surveyID: surveyID,
                  info: this.props.location,
                  userProfile: this.props.userProfile
                }
              }}>
              {surveyDay.toLocaleDateString()}
            </Link>
          </li>
        );
        this.setState({ surveys: surveysHTML });
      });
  }

  /**
   * Gets the latitude and longitude for a beach, and updates state.
   */
  getLatLon() {
    let beachID = this.props.location._id;
    axios.get(`/beaches/${beachID}/coords`)
      .then(res => {
        let lat = res.data.lat;
        let latDeg = Math.floor(lat);
        let tempDecimal = (lat - latDeg) * 60;
        let latMin = Math.floor(tempDecimal);
        let latSec = (tempDecimal - latMin) * 60;
        latSec = (Math.trunc((latSec * 100)) / 100);
        let latDir = Math.sign(latDeg);
        latDeg = latDeg * latDir;

        let lon = res.data.lon;
        let lonDeg = Math.floor(lon);
        tempDecimal = (lon - lonDeg) * 60;
        let lonMin = Math.floor(tempDecimal);
        let lonSec = (tempDecimal - lonMin) * 60;
        lonSec = (Math.trunc((latSec * 100)) / 100);
        let lonDir = Math.sign(lonDeg);
        lonDeg = lonDeg * lonDir;

        this.setState({
          lat: [latDeg, latMin, latSec, latDir],
          lon: [lonDeg, lonMin, lonSec, lonDir]
        });
      });
  }

  /**
   * Expands or collapses accordion when clicked.
   * @param {any} e
   */
  handleAccordionClick = (e) => {
    if(this.state.surveys.length === 0 && !this.state.clicked)
      this.getSurveysFromBeach();

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

  /**
   * When component mounts, calls getLatLon().
   */
  componentDidMount() {
    this.getLatLon();
  }

  /**
   * Renders the JSX code to display an item in the list of beaches on the home
   * page.
   * @return JSX code
   */
  render() {
    let lat = this.state.lat;
    let lon = this.state.lon;
    return (
      <div className="uk-card uk-card-default uk-card-body uk-margin">
        <div>
          <ul className="uk-accordion uk-margin-remove-bottom">
            <li>
              <span
                className=
                "survey-bar uk-accordion-title uk-margin-remove-bottom"
                onClick={this.handleAccordionClick}
              >
                <Link
                  to={{
                    pathname: `/location/${this.props.path}`,
                      state: {
                        data: this.props.location,
                        userProfile: this.props.userProfile
                      }
                  }}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {this.props.location.n}
                </Link>
                <div
                  className=
                  "uk-text-muted uk-text-small uk-margin-remove-bottom"
                >
                  {lat[0]}&deg;{lat[1]}'{lat[2]}''{(lat[3] === 1) ? 'N' : 'S'}
                  {lon[0]}&deg;{lon[1]}'{lon[2]}''{(lon[3] === 1) ? 'E' : 'W'}
                </div>
              </span>
              <div
                className="uk-accordion-content"
                style={{ display: 'none' }}
              >
                <p>
                  <Link
                    to={{
                      pathname: `/location/${this.props.path}`,
                      state: {
                        data: this.props.location,
                        userProfile: this.props.userProfile
                      }
                    }}
                  >
                    Go to location page
                  </Link>
                </p>
                <ul className="uk-list uk-list-bullet uk-padding-remove-left">
                  {this.state.loading ? "Loading surveys..." :
                    this.state.surveys}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default LocationBar;