/**
 * SurveyForm.jsx
 * Code for the page to add surveys.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AccumulationSurvey from './SurveySubsections/AccumulationSurvey';
import MicroDebrisSurvey from './SurveySubsections/MicroDebrisSurvey';
import SurfaceRibScan from './SurveySubsections/SurfaceRibScan';
import SurveyArea from './SurveySubsections/SurveyArea';
import TeamInformation from './SurveySubsections/TeamInformation';
import Review from './SurveySubsections/Review';

import {
  Accordion,
} from 'react-accessible-accordion';

import './accordion-styles.css';
import './SurveyForm.css';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.url = '/surveys'
    this.auth = this.props.auth;

    this.state = {
      surveyData: {
        // fields (id's) :
        // TI: userFirst, userLast,
        //     orgName, orgLoc,
        //     email, cleanUpTime, cleanUpDate
        // SA: beachName, latitude, longitude,
        //     {usageRecreation, usageCommercial, usageRemoteUnused,
        //     usageOther}
        //     {locationChoiceProximity, locationChoiceDebris,
        //     locationChoiceOther}
        //     compassDegrees, riverName, riverDistance,
        //     {tideTypeB, tideHeightB, tideTimeB},
        //     {tideTypeA, tideHeightA, tideTimeA},
        //     windSpeed, windDir, windComment
        //     {substrateTypeSand, substrateTypePebble, substrateTypeRipRap,
        //     substrateTypeSeaweed, substrateTypeOther}
        //
        // SRS: rib1Start, rib2Start, rib3Start, rib4Start,
        //      rib1End, rib2End, rib3End, rib4End
      },
      SRSData: {
        // format for debris is:
        //   trash_id + ("FreshRib" | "WeatheredRib") + ribNumber
      },
      ASData: {
        // format for debris is:
        //   trash_id + "accumulation" + ("Fresh | Weathered | Total")
      },
      MDSData: {},
      displayStrings: {
        usage: "",
        locChoice: "",
        subType: "",
        incompleteSurvey: "",
      },
      checkboxAnswers: {
        usage: {},
        locChoice: {},
        subType: {},
        incompleteSurvey: {},
      },
      isInputting: true,
      isReviewing: false,
      isSubmitted: false,
      user: this.auth.userProfile.name,
      email: this.auth.userProfile.email,
      userID: this.auth.userProfile.sub.split("|")[1],
      invalidForm: false,
      invalidSRS: false,
      invalidAS: false,
      invalidMDS: false,
      autoFilledBeachData: null
    }
    this.moveToInput = this.moveToInput.bind(this);
    this.moveToReview = this.moveToReview.bind(this);
    this.moveToSubmit = this.moveToSubmit.bind(this);
    this.prepareForm = this.prepareForm.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.updateAS = this.updateAS.bind(this);
    this.updateCheckedState = this.updateCheckedState.bind(this);
    this.updateLatLonFront = this.updateLatLonFront.bind(this);
    this.updateMDS = this.updateMDS.bind(this);
    this.updateSRS = this.updateSRS.bind(this);
    this.updateSurveyState = this.updateSurveyState.bind(this);
  }

  /**
   * Runs when this component is mounted. Checks that the user is signed in,
   * even though guest users shouldn't be able to get to this page. Then
   * retrieves beach information to autofill.
   */
  componentDidMount() {
    // check if user is authenticated (redirect if not)
    if (!this.auth.isAuthenticated()) {
      window.alert('Please sign in to continue');
      window.location.replace('/');
    }

    if (this.props.location.state) {
      let { beachID } = this.props.location.state;
      if (beachID) {
        axios.get(`/beaches/${beachID}/info`)
          .then(res => {
            this.setState({
              surveyData: { beachID, beachName: res.data.n },
              autoFilledBeachData: res.data
            });
            const coordInfo =
              this.updateLatLonFront(res.data.lat, res.data.lon);
            this.updateBeachState(
              coordInfo,
              res.data.majorUse,
              res.data.reason,
              res.data.cmpsDir,
              res.data.nroName,
              res.data.nroDist
            );
          }).catch(err => {
            console.log(err);
          });
      }
    }
  }

  /**
   * Calculates the total fresh and weathered trash in each type of debris for
   * the accumulation survey.
   * @return array of arrays, where the first item in each array is the type of
   * debris, and the second item in each array is an object of the total fresh
   * and weathered debris.
   */
  calcTotalsAS() {
    let totals = {};
    let totalsArray = [];

    const data = this.state.ASData;

    for (const id in data) {
      const noAcc = id.replace(/__accumulation/i, '');
      const trash_id = noAcc.replace(/__\w+/, '');
      const type = noAcc.replace(/\w+__/, '');
      if (!totals[trash_id]) {
        totals[trash_id] = {
          fresh: 0,
          weathered: 0
        }
      }
      if (type === "weathered") {
        totals[trash_id].weathered = totals[trash_id].weathered +
          parseInt(data[id]);
        if (isNaN(totals[trash_id].weathered)) {
          totals[trash_id].weathered = 0;
        }
      } else {
        totals[trash_id].fresh = totals[trash_id].fresh + parseInt(data[id]);
        if (isNaN(totals[trash_id].fresh)) {
          totals[trash_id].fresh = 0;
        }
      }
    }
    for (const id in totals) {
      totalsArray.push([
        id,
        { fresh: totals[id].fresh, weathered: totals[id].weathered }
      ]);
    }
    return totalsArray;
  }

  /**
   * Calculates the total fresh and weathered trash in each type of debris for
   * the micro debris surveys.
   * @return array of arrays, where the first item in each array is the type of
   * debris, and the second item in each array is an object of the total fresh
   * and weathered debris.
   */
  calcTotalsMDS() {
    let totals = {};
    let totalsArray = [];

    const data = this.state.MDSData;

    for (const id in data) {
      // remove "micro", "TotalRib" and rib number
      const type = id.replace(/micro|TotalRib|1|2|3|4/g, '');
      const trash_id = "microDebris";
      if (!totals[trash_id]) {
        totals[trash_id] = {
          fresh: 0,
          weathered: 0
        }
      }
      if (type === "Weathered") {
        totals[trash_id].weathered = totals[trash_id].weathered +
          parseInt(data[id]);
        if (isNaN(totals[trash_id].weathered)) {
          totals[trash_id].weathered = 0;
        }
      } else {
        totals[trash_id].fresh = totals[trash_id].fresh + parseInt(data[id]);
        if (isNaN(totals[trash_id].fresh)) {
          totals[trash_id].fresh = 0;
        }
      }
    }
    for (const id in totals) {
      totalsArray.push([
        id,
        { fresh: totals[id].fresh, weathered: totals[id].weathered }
      ]);
    }
    return totalsArray;
  }

  /**
   * Calculates the total fresh and weathered trash in each type of debris for
   * the surface rib scan.
   * @return array of arrays, where the first item in each array is the type of
   * debris, and the second item in each array is an object of the total fresh
   * and weathered debris.
   */
  calcTotalsSRS() {
    let totals = {};
    let totalsArray = [];

    const data = this.state.SRSData;

    for (const id in data) {
      const noNum = id.replace(/__[1-4]/, '');
      const trash_id = noNum.replace(/__\w+/, '');
      const type = noNum.replace(/\w+__/, '');
      if (!totals[trash_id]) {
        totals[trash_id] = {
          fresh: 0,
          weathered: 0
        }
      }
      if (type === "weathered") {
        totals[trash_id].weathered = totals[trash_id].weathered +
          parseInt(data[id]);
        if (isNaN(totals[trash_id].weathered)) {
          totals[trash_id].weathered = 0;
        }
      } else {
        totals[trash_id].fresh = totals[trash_id].fresh + parseInt(data[id]);
        if (isNaN(totals[trash_id].fresh)) {
          totals[trash_id].fresh = 0;
        }
      }
    }
    for (const id in totals) {
      totalsArray.push([
        id,
        { fresh: totals[id].fresh, weathered: totals[id].weathered }
      ]);
    }
    return totalsArray;
  }

  /**
   * Converts given degrees (d), minutes (min), and seconds (sec) to decimal,
   * and adds the appropriate sign based on the direction (dir).
   * @param {any} d
   * @param {any} min
   * @param {any} sec
   * @param {any} dir
   * @return decimal number
   */
  convertToDecimalDegrees(d, min, sec, dir) {
    return parseFloat(dir) * (parseFloat(d) + (parseFloat(min) / 60.0) +
      (parseFloat(sec) / 3600.0));
  }

  /**
   * Gets structure of beach data
   * @return beach data
   */
  getBeachData() {
    if (this.state.autoFilledBeachData) {
      return this.state.autoFilledBeachData;
    }
    const data = this.state.surveyData;
    return {
      n: data.beachName.replace(/\s/g, "_"),
      nroName: data.riverName.replace(/\s/g, "_"),
      lat: this.convertToDecimalDegrees(data.latDeg, data.latMin,
        data.latSec, data.latDir),
      lon: this.convertToDecimalDegrees(data.lonDeg, data.lonMin,
        data.lonSec, data.lonDir),
      majorUse: data.majorUse,
      reason: data.reason,
      cmpsDir: data.cmpsDir,
      nroDist: data.riverDistance
    };
  }

  /*
   * Switches to the input state.
   */
  moveToInput() {
    this.setState({
      isInputting: true,
      isReviewing: false,
      isSubmitted: false
    })
  }

  /*
   * Switches to the review state, checks to see if the required entries have
   * been input by the user.
   */
  moveToReview() {
    const invalidInput = this.validateSurveyData();
    const SRSDataIsValid = this.validateSRSData();
    const ASDataIsValid = this.validateASData();
    const MDSDataIsValid = this.validateMDSData();

    // gives invalid input in first two sections highest priority
    if (invalidInput && invalidInput.length) {
      this.setState({
        invalidForm: true,
        invalidSRS: false,
        invalidAS: false,
        invalidMDS: false
      });
    }
    else if (SRSDataIsValid === false) {
      this.setState({
        invalidForm: true,
        invalidSRS: true,
        invalidAS: false,
        invalidMDS: false
      });
    }
    else if (ASDataIsValid === false) {
      this.setState({
        invalidForm: true,
        invalidSRS: false,
        invalidAS: true,
        invalidMDS: false
      });
    }
    else if (MDSDataIsValid === false) {
      this.setState({
        invalidForm: true,
        invalidSRS: false,
        invalidAS: false,
        invalidMDS: true
      });
    }
    else {
      this.updateDisplayStringsAndCheckboxAnswers();
      this.setState({
        invalidForm: false,
        isInputting: false,
        isReviewing: true,
        isSubmitted: false,
      });
    }
  }

  /*
   * Successfully submits the form if the validation in the backend passes.
   * Shows the submit page.
   */
  moveToSubmit() {
    const form = this.prepareForm();

    axios.post("beaches/surveys", form)
      .then(res => {
        if (res.data.survID) {
          this.setState({
            isInputting: false,
            isReviewing: false,
            isSubmitted: true,
            survID: res.data.survID
          })
        }
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.error);
      })
  }

  /**
   * Alerts the user that they need to fill out a mandatory part of the form.
   * @param {any} ids
   */
  navToID(ids) {
    alert("Please fill out the following: " + ids)
  }

  /**
   * Removes the other option user entered if the other checkbox is unchecked,
   * so that the option doesn't get submitted to the database.
   * @param {any} category
   */
  removeOther = (category) => {
    if (category === 'usage') {
      this.setState(prevState => {
        prevState.surveyData.usageOther = undefined;
        return prevState;
      });
    } else if (category === 'reason') {
      this.setState(prevState => {
        prevState.surveyData.locationChoiceOther = undefined;
        return prevState;
      });
    } else if (category === 'substrate') {
      this.setState(prevState => {
        prevState.surveyData.substrateTypeOther = undefined;
        return prevState;
      });
    } else if (category === 'incomplete') {
      this.setState(prevState => {
        prevState.surveyData.incompleteSurveyOther = undefined;
        return prevState;
      });
    }
  }

  /**
   * For that visual AESTHETIC.
   * @return the form that is to be submitted to the database
   */
  prepareForm() {
    const data = this.state.surveyData;
    const show = this.state.checkboxAnswers;

    const form = {
      survData: {
        user: {
          f: (data.userFirst ? data.userFirst : undefined),
          l: (data.userLast ? data.userLast : undefined)
        },
        email: data.email,
        userID: this.state.userID,
        org: (data.orgName ? data.orgName : undefined),
        survDate: new Date(data.cleanUpDate + "T00:00"),
        survStartTime: data.cleanUpStartTime,
        survEndTime: data.cleanUpEndTime,
        st: (show.subType ? show.subType : undefined),
        slope: (data.slope ? data.slope : undefined),
        lastTide: {
          type: (data.tideTypeB ? data.tideTypeB : undefined),
          time: (data.tideTimeB ? data.tideTimeB : undefined),
          height: (data.tideHeightB ? data.tideHeightB : undefined)
        },
        nextTide: {
          type: (data.tideTypeA ? data.tideTypeA : undefined),
          time: (data.tideTimeA ? data.tideTimeA : undefined),
          height: (data.tideHeightA ? data.tideHeightA : undefined)
        },
        wind: {
          dir: (data.windDir ? data.windDir : undefined),
          spd: (data.windSpeed ? data.windSpeed : undefined),
          comment: (data.windComments ? data.windComments : undefined)
        },
        incompleteSurvey: (show.incompleteSurvey ? show.incompleteSurvey :
          undefined),
        /* SRSDebris: [
            [cigaretteButts, {
                fresh (total):
                weathered (total):
            }],
            ...
        ]
        */
        numOfP: 0,
        SRSDebris: this.calcTotalsSRS(),
        ASDebris: this.calcTotalsAS(),
        MicroDebris: this.calcTotalsMDS()
      },
      bID: data.beachID ? data.beachID : undefined,
      beachData: data.beachID ? undefined : {
        n: data.beachName.replace(/\s/g, "_"),
        lat: this.convertToDecimalDegrees(data.latDeg, data.latMin,
          data.latSec, data.latDir),
        lon: this.convertToDecimalDegrees(data.lonDeg, data.lonMin,
          data.lonSec, data.lonDir),
        majorUse: (show.usage ? show.usage : undefined),
        reason: (show.locChoice ? show.locChoice : undefined),
        cmpsDir: (data.compassDegrees ? data.compassDegrees : undefined),
        nroName: data.riverName.replace(/\s/g, "_"),
        nroDist: data.riverDistance
      }
    }

    return form;
  }

  /**
   * Sets a key in survey data to val.
   * @params {any} key, {any} val
   */
  setSurveyData = (key, val) => {
    this.setState(prevState => {
      prevState.surveyData[key] = val;
      return prevState;
    });
  }

  /**
   * Explains to user what errors they need to correct in order to submit the
   * survey.
   */
  showAlert() {
    if (this.state.invalidSRS) {
      return (
        <div className="uk-alert-danger uk-padding-small">
          <p>
            Whoops! Looks like some of the entries in the Surface Rib Scan
            section are invalid. Please make sure they are only positive
            integers or zero.
          </p>
        </div>
      )
    }
    else if (this.state.invalidAS) {
      return (
        <div className="uk-alert-danger uk-padding-small">
          <p>
            Whoops! Looks like some of the entries in the Accumulation Survey
            section are invalid. Please make sure they are only positive
            integers or zero.
          </p>
        </div>
      )
    }
    else if (this.state.invalidMDS) {
      return (
        <div className="uk-alert-danger uk-padding-small">
          <p>
            Whoops! Looks like some of the entries in the Micro Debris Survey
            section are invalid. Please make sure they are only positive
            integers or zero.
          </p>
        </div>
      )
    }
    else {
      return (
        <div className="uk-alert-danger uk-padding-small">
          <p>
            Whoops! Looks like you didn't fill out some required fields. Please
            go back and fill them out.
        </p>
        </div>
      )
    }
  }

  /**
   * Shows the page where user inputs survey data.
   * @return JSX code to display input page
   */
  showInputPage = () => {
    return (
      <div>
        {this.state.invalidForm ? this.showAlert() : null}
        <form id="surveyForm">
          <Accordion>
            <TeamInformation
              data={this.state.surveyData}
              updateSurveyState={this.updateSurveyState}
            />
            <SurveyArea
              data={this.state.surveyData}
              autoFilledBeachData={this.state.autoFilledBeachData}
              setSurveyData={this.setSurveyData}
              updateSurveyState={this.updateSurveyState}
              updateCheckedState={this.updateCheckedState}
              updateBeachState={this.updateBeachState}
              updateLatLonFront={this.updateLatLonFront}
              removeOther={this.removeOther}
            />
            <SurfaceRibScan
              data={this.state.surveyData}
              SRSData={this.state.SRSData}
              updateSurveyState={this.updateSurveyState}
              updateSRS={this.updateSRS}
            />
            <AccumulationSurvey
              data={this.state.ASData}
              updateSurveyState={this.updateSurveyState}
              updateCheckedState={this.updateCheckedState}
              updateAS={this.updateAS}
              removeOther={this.removeOther}
            />
            <MicroDebrisSurvey
              data={this.state.MDSData}
              updateMDS={this.updateMDS}
            />
          </Accordion>
        </form>
        <div className="submit-button-container" >
          <button
            className="uk-button uk-button-secondary"
            onClick={this.moveToReview}>
            Review
          </button>
          <p id="instructions">
            Click the Review button to review your submitted data. Then click
            the Submit button at the bottom of the review page to submit and
            save your data.
          </p>
        </div>
      </div>
    );
  }

  /**
   * Shows the page where the user can review the information entered before
   * submitting the survey.
   * @return JSX code that displays the review page
   */
  showReviewPage = () => {
    return (
      <div>
        <button
          className="uk-button uk-button-secondary"
          onClick={this.moveToInput}>
          Back to Input
        </button>
        <Review
          data={this.state.surveyData}
          email={this.state.email}
          SRSData={this.state.SRSData}
          ASData={this.state.ASData}
          MDSData={this.state.MDSData}
          displayStrings={this.state.displayStrings}
        />
        <button
          className="uk-button uk-button-disabled"
          onClick={this.moveToSubmit}>
          Submit
        </button>
      </div>
    );
  }

  /**
   * Shows the page that confirms the survey has been correctly submitted.
   * @return JSX code that displays the submit page
   */
  showSubmitPage = () => {
    const beachData = this.getBeachData();

    return (
      <div>
        <h1>Your survey was successfully submitted!</h1>
        <h3>Click <Link to={{
            pathname: `surveys/${this.state.survID.replace(' ', '-')}`,
            state: {
              beachName: beachData.n,
              surveyID: this.state.survID,
              info: beachData,
              userProfile: this.auth.userProfile
            }
          }}>
            here
          </Link> to view your survey.</h3>
        <h3>Click <Link to={"home/"} > here</Link> to return to the home page.</h3>
        <div className="submit-button-container">
          <button
            className="uk-button uk-button-secondary"
            onClick={this.moveToReview} >
            Back to Review
          </button>
        </div>
      </div>
    );
  }

  /**
   * Capitalizes the first letter of word and lower cases the rest of the
   * letters.
   * @param {any} word
   * @return word with the first letter capitalized and the other letters lower
   * case
   */
  toTitleCase(word) {
    return word.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  /**
   * Updates data on accumulation survey.
   * @param {any} e
   */
  updateAS(e) {
    const key = e.target.id;
    const val = e.target.value;
    this.setState(prevState => {
      prevState.ASData[key] = val;
      return prevState;
    })
  }

  /**
   * Updates survey state when the user checks or unchecks a checkbox.
   * @param {any} e
   */
  updateCheckedState(e) {
    const key = e.target.id;
    const val = e.target.checked;
    this.setState(prevState => {
      prevState.surveyData[key] = val;
      return prevState;
    })
  }

  /**
   * Updates information to be autofilled, coordinates and info on nearest
   * river.
   * @params {any} coordInfo, {any} riverName, {any} riverDist
   */
  updateBeachState = (coordInfo, majorUse, reason, cmpsDir, riverName, riverDist) => {
    this.setState(prevState => {
      for (const key in coordInfo) {
        prevState.surveyData[key] = coordInfo[key];
      }
      if (majorUse.rec) {
        prevState.surveyData.usageRecreation = true;
      }
      else {
        prevState.surveyData.usageRecreation = false;
      }
      if (majorUse.com) {
        prevState.surveyData.usageCommercial = true;
      }
      else {
        prevState.surveyData.usageCommercial = false;
      }
      if (majorUse.rem) {
        prevState.surveyData.usageRemoteUnused = true;
      }
      else {
        prevState.surveyData.usageRemoteUnused = false;
      }
      if (majorUse.other) {
        prevState.surveyData.usageOther = majorUse.other;
      }
      else {
        prevState.surveyData.usageOther = "";
      }
      if (reason.prox) {
        prevState.surveyData.locationChoiceProximity = true;
      }
      else {
        prevState.surveyData.locationChoiceProximity = false;
      }
      if (reason.debris) {
        prevState.surveyData.locationChoiceDebris = true;
      }
      else {
        prevState.surveyData.locationChoiceDebris = false;
      }
      if (reason.other) {
        prevState.surveyData.locationChoiceOther = reason.other;
      }
      else {
        prevState.surveyData.locationChoiceOther = "";
      }
      prevState.surveyData.compassDegrees = cmpsDir;
      prevState.surveyData.riverName = riverName;
      prevState.surveyData.riverDistance = riverDist;

      return prevState;
    });
  }

  /**
   * Using data submitted by the user checking checkboxes, updates
   * displayStrings and checkboxAnswers to have appropriate information to put
   * on the Review page and to send to the database, respectively.
   */
  updateDisplayStringsAndCheckboxAnswers() {
    const data = this.state.surveyData;

    // if id exists, set to the correct string, otherwise set to false
    let usage = {
      rec: data.usageRecreation ? "Recreation" : undefined,
      com: data.usageCommercial ? "Commercial" : undefined,
      rem: data.usageRemoteUnused ? "Remote/Unused" : undefined,
      // this field in data is what the user enters when selects other
      other: data.usageOther ? data.usageOther : undefined
    }

    let locChoice = {
      prox: data.locationChoiceProximity ? "Proximity/Convenience" : undefined,
      debris: data.locationChoiceDebris ? "Known for Debris" : undefined,
      other: data.locationChoiceOther ? data.locationChoiceOther : undefined
    }

    let subType = {
      s: data.substrateTypeSand ? "Sand" : undefined,
      p: data.substrateTypePebble ? "Pebble" : undefined,
      rr: data.substrateTypeRipRap ? "Rip Rap" : undefined,
      sea: data.substrateTypeSeaweed ? "Seaweed" : undefined,
      other: data.substrateTypeOther ? data.substrateTypeOther : undefined
    }

    let incompleteSurvey = {
      time: data.incompleteSurveyTime ? "Not enough time" : undefined,
      people: data.incompleteSurveyPeople ? "Not enough people" : undefined,
      area: data.incompleteSurveyArea ? "Too much area" : undefined,
      trash: data.incompleteSurveyTrash ? "Too much trash" : undefined,
      other:
        data.incompleteSurveyOther ? data.incompleteSurveyOther : undefined
    }

    // creates string for each of the above objects
    function objectToString(obj) {
      var newString = "";
      // this is so only add comma after first option
      var firstOptionFound = false;

      // for each field in object
      for (var option in obj) {
        if (obj[option] && !firstOptionFound) {
          newString = obj[option];
          firstOptionFound = true;
        }
        else if (obj[option]) {
          newString = newString + ", " + obj[option];
        }
      }

      return newString;
    }

    function changeOptionsToBools(obj) {
      var newObj = {};

      for (var option in obj) {
        if (obj[option] && option !== "other") {
          newObj[option] = true;
        }
        else {
          newObj[option] = obj[option];
        }
      }
      return newObj;
    }

    var usageString = objectToString(usage);
    var locChoiceString = objectToString(locChoice);
    var subTypeString = objectToString(subType);
    var incompleteSurveyString = objectToString(incompleteSurvey);

    var usageCheckboxAnswer = changeOptionsToBools(usage);
    var locChoiceCheckboxAnswer = changeOptionsToBools(locChoice);
    var subTypeCheckboxAnswer = changeOptionsToBools(subType);
    var incompleteSurveyCheckboxAnswer =
      changeOptionsToBools(incompleteSurvey);

    // set displayStrings to the new strings
    this.setState({
      displayStrings: {
        usage: usageString,
        locChoice: locChoiceString,
        subType: subTypeString,
        incompleteSurvey: incompleteSurveyString
      },
      checkboxAnswers: {
        usage: usageCheckboxAnswer,
        locChoice: locChoiceCheckboxAnswer,
        subType: subTypeCheckboxAnswer,
        incompleteSurvey: incompleteSurveyCheckboxAnswer
      }
    });

    // for testing
    if (process.env.NODE_ENV === "test") {
      return {
        usage: usageString,
        locChoice: locChoiceString,
        subType: subTypeString,
        incompleteSurvey: incompleteSurveyString
      };
    }
  }
  
  /**
   * Takes in latitude and longitude as decimals and converts them to degrees,
   * minutes, and seconds.
   * @params lat, lon
   * @return object of two fields, latitude and longitude, which each contain
   * lat and lon, as well as their respective degrees, minutes, seconds, and
   * direction
   */
  updateLatLonFront(lat, lon) {
    let latDeg = Math.floor(lat);
    let tempDecimal = (lat - latDeg) * 60;
    const latMin = Math.floor(tempDecimal);
    const latSec = (tempDecimal - latMin) * 60;
    const latDir = Math.sign(latDeg);
    latDeg = latDeg * latDir;

    let lonDeg = Math.floor(lon);
    tempDecimal = (lon - lonDeg) * 60;
    const lonMin = Math.floor(tempDecimal);
    const lonSec = (tempDecimal - lonMin) * 60;
    const lonDir = Math.sign(lonDeg);
    lonDeg = lonDeg * lonDir;

    return {
      latitude: lat, latDeg, latMin, latSec, latDir,
      longitude: lon, lonDeg, lonMin, lonSec, lonDir
    }
  }

  /**
   * Updates data on surface rib scan.
   * @param {any} e
   */
  updateMDS(e) {
    const key = e.target.id;
    const val = e.target.value;

    // if testing, set state directly to avoid any delays
    if (process.env.NODE_ENV === "test") {
      this.state.MDSData[key] = val;
    } else {
      this.setState(prevState => {
        prevState.MDSData[key] = val;
        return prevState;
      });
    }
  }

  /**
   * Updates data on surface rib scan.
   * @param {any} e
   */
  updateSRS(e) {
    const key = e.target.id;
    const val = e.target.value;
    this.setState(prevState => {
      prevState.SRSData[key] = val;
      return prevState;
    });
  }

  /**
   * Updates survey state when the user changes or adds info in the survey.
   * @param {any} e
   */
  updateSurveyState(e) {
    const key = e.target.id;
    const val = e.target.value;

    this.setState(prevState => {
      prevState.surveyData[key] = val
      return prevState;
    })

    // Removeinvalid input styling if they are coming back from review step.
    let element = document.getElementById(key);
    if (val && element.classList.contains('invalidInput')) {
      if (element) { element.classList.remove('invalidInput'); }
    }
  }

  /**
   * Validates that all the entries for the accumulation survey are valid.
   * @return false if at least one entry is invalid, true otherwise
   */
  validateASData() {
    // check each item in ASData using validateEntry(entry)
    for (var entry in this.state.ASData) {
      if (!this.validateEntry(this.state.ASData[entry])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Validates that entry is a positive integer.
   * @param {any} entry
   * @return true if entry is a positive integer, false otherwise
   */
  validateEntry(entry) {
    // first check if empty string, which happens if non-number entered
    if (entry === "") {
      return false;
    }

    // number is invalid if not a number, is negative, or is a decimal
    var entryNumber = Number(entry);
    if (isNaN(entryNumber) || entryNumber < 0 ||
      Math.trunc(entryNumber) !== entryNumber) {
      return false;
    }
    return true;
  }

  /**
   * Validates that all the entries for the micro debris survey are valid.
   * @return false if at least one entry is invalid, true otherwise
   */
  validateMDSData() {
    // check each item in MDSData using validateEntry(entry)
    for (var entry in this.state.MDSData) {
      if (!this.validateEntry(this.state.MDSData[entry])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Validates that all the entries for the surface rib scan are valid.
   * @return false if at least one entry is invalid, true otherwise
   */
  validateSRSData() {
    // check each item in SRSData using validateEntry(entry)
    for (var entry in this.state.SRSData) {
      if (!this.validateEntry(this.state.SRSData[entry])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Determines if the current data entered by the user is valid for
   * submission.
   * @return ID's of invalid elements if invalid, if not, returns empty array;
   */
  validateSurveyData() {
    let invalid = [];

    const displayIDs = {
      userFirst: "First name",
      userLast: "Last name",
      orgName: "Organization Name",
      orgLoc: "Organization Location",
      email: "Email Address",
      cleanUpStartTime: "Clean Up Start Time",
      cleanUpEndTime: "Clean Up End Time",
      beachName: "Name of Beach",
      latDir: "Latitude Direction",
      lonDir: "Longitude Direction",
      latDeg: "Latitude Degrees",
      lonDeg: "Longitude Degrees",
      latMin: "Latitude Minutes",
      lonMin: "Longitude Minutes",
      latSec: "Latitude Seconds",
      lonSec: "Longitude Seconds",
      compassDegrees: "Compass Degrees",
      riverName: "River Name",
      riverDistance: "Nearest River Output Distance",
      usage: "Usage",
      locChoice: "Reason for Location Choice",
      subType: "Substrate Type",
      slope: "Slope",
      tideHeightA: "Next Tide Height",
      tideTimeA: "Next Tide Time",
      tideTypeA: "Next Tide Type",
      tideHeightB: "Last Tide Height",
      tideTypeB: "Last Tide Type",
      tideTimeB: "Last Tide Time",
      windComments: "Comments",
      windDir: "Wind Direction",
      windSpeed: "Wind Speed"
    }

    const requiredIDs = ['userFirst', 'userLast', 'email', 'cleanUpStartTime',
      'cleanUpEndTime', 'cleanUpDate', 'beachName', 'latDeg', 'latMin',
      'latSec', 'latDir', 'lonDeg', 'lonMin', 'lonSec', 'lonDir',
      'compassDegrees', 'riverName', 'riverDistance', 'slope', 'tideHeightA',
      'tideHeightB', 'tideTimeA', 'tideTimeB', 'tideTypeA', 'tideTypeB',
      'windDir', 'windSpeed'
    ];

    // check for fields that need just a single entry
    for (const id of requiredIDs) {
      if (this.state.surveyData[id] === undefined
        || this.state.surveyData[id] === "") {
        invalid.push(displayIDs[id]);
        if (document.getElementById(id))
          document.getElementById(id).classList.add('invalidInput');
      }
    }

    // check for usage
    if (!this.state.surveyData.usageRecreation
      && !this.state.surveyData.usageCommercial
      && !this.state.surveyData.usageRemoteUnused
      && !this.state.surveyData.usageOther)
      invalid.push(displayIDs.usage);

    // check if the user filled out the reason for location choice
    if (!this.state.surveyData.locationChoiceDebris
      && !this.state.surveyData.locationChoiceProximity
      && !this.state.surveyData.locationChoiceOther)
      invalid.push(displayIDs.locChoice);

    // check if the user filled out the substrate type
    if (!this.state.surveyData.substrateTypeSand
      && !this.state.surveyData.substrateTypePebble
      && !this.state.surveyData.substrateTypeRipRap
      && !this.state.surveyData.substrateTypeSeaweed
      && !this.state.surveyData.substrateTypeOther)
      invalid.push(displayIDs.subType);

    return invalid;
  }

  /**
   * Shows either the input, review, or submit page, based on which one is most
   * appropriate.
   * @return JSX code to show the survey page
   */
  render() {
    return (
      <div className="centering-container" >
        {(this.state.isInputting && this.showInputPage()) ||
          (this.state.isReviewing && this.showReviewPage()) ||
          (this.state.isSubmitted && this.showSubmitPage())}
      </div>
    );
  }
}

export default SurveyForm;
