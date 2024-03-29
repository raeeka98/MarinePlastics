/**
 * SurveyArea.jsx
 * The survey area component for the survey. Used by ../SurveyForm.jsx.
 */
import React, { Component } from 'react';
import axios from 'axios';

import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

import BeachSearch from '../BeachSearch';

class SurveyArea extends Component {
  constructor(props) {
    super(props);
  }

  /**
  * Gets existing info on beach based on id, and updates the survey with this
  * info.
  * @param beachID
  */
  autofill = (beachID) => {
    axios.get(`/beaches/${beachID}/info`)
      .then(res => {
        const coordInfo =
          this.props.updateLatLonFront(res.data.lat, res.data.lon);
        this.props.updateBeachState(
          coordInfo,
          res.data.majorUse,
          res.data.reason,
          res.data.cmpsDir,
          res.data.nroName,
          res.data.nroDist
        );
        // check if need to show other
        if (res.data.majorUse.other) {
          this.setState({ showOtherUsage: true });
        }
        if (res.data.reason.other) {
          this.setState({ showOtherReason: true });
        }
      }).catch(err => {
        console.log(err);
      });
  };

  /**
   * If a beach from the database has been selected in the dropdown, this
   * displays the name of the beach. Otherwise, uses BeachSearch from
   * ../BeachSearch.jsx.
   * @param autoFilled
   * @return selected beach name if autoFilled is true, otherwise BeachSearch
   */
  beachNameInput = (autoFilled) => {
    if (autoFilled) {
      return (
        <input
          className="uk-input uk-margin"
          value={autoFilled.n}
          disabled>
        </input>);
    }
    return (
      <BeachSearch
        id="beachName"
        autofill={this.autofill}
        setSurveyData={this.props.setSurveyData}
        value={this.props.data.beachName} />
    );
  }

  /**
   * If a beach from the database has been selected in the dropdown, this
   * displays the names of the river nearest the beach. Otherwise, displays an
   * input textbox to enter the name of the river nearest to the beach.
   * @param autoFilled
   * @return name of river closest to selected beach if autoFilled is true,
   * otherwise input textbox
   */
  riverNameInput = (autoFilled) => {
    if (autoFilled) {
      return (
        <input
          value={autoFilled.nroName}
          className='uk-input uk-margin'
          disabled
        />
      );
    }
    return (
      <input
        type='string'
        placeholder='Nearest River Output Name'
        id='riverName'
        value={this.props.data.riverName}
        onChange={this.props.updateSurveyState}
        className='uk-input uk-margin'
      />
    )
  }

  /**
   * Converts inputted latitude and longitude from decimal to degrees, minutes,
   * and seconds. This differs from updateLatLonFront(lat, lon) in that this
   * only returns the degrees, minutes, seconds, and direction as a letter,
   * not as a sign.
   * @params lat, lon
   * @return object of two fields, lat and lon, which each contain their
   * respective degrees, minutes, seconds, and direction as a letter
   */
  latLongToDMS = (lat, lon) => {
    let latDeg = Math.floor(lat);
    let tempDecimal = (lat - latDeg) * 60;
    let latMin = Math.floor(tempDecimal);
    let latSec = (tempDecimal - latMin) * 60;
    latSec = (Math.trunc((latSec * 100)) / 100);
    let latDir = Math.sign(latDeg);
    latDeg = latDeg * latDir;

    let lonDeg = Math.floor(lon);
    tempDecimal = (lon - lonDeg) * 60;
    let lonMin = Math.floor(tempDecimal);
    let lonSec = (tempDecimal - lonMin) * 60;
    lonSec = (Math.trunc((latSec * 100)) / 100);
    let lonDir = Math.sign(lonDeg);
    lonDeg = lonDeg * lonDir;
    return {
      lat: {
        latDeg, latMin, latSec, latDir: (latDir === 1) ? 'N' : 'S'
      },
      lon: {
        lonDeg, lonMin, lonSec, lonDir: (lonDir === 1) ? 'E' : 'W'
      }
    }
  }

  /**
   * If a beach from the database has been selected in the dropdown, this
   * displays the coordinates of the beach in the input boxes. Otherwise,
   * displays input textboxes to enter the coordinates of the beach.
   * @param autoFilled
   * @return coordinates of the beach in the input boxes if autoFilled is true,
   * otherwise input textbox
   */
  coordsInput = (autoFilled) => {
    let latDivs, lonDivs;
    if (autoFilled) {
      let {lat,lon} = this.latLongToDMS(autoFilled.lat, autoFilled.lon);
      
      latDivs = (
        <React.Fragment>
          <div>
            <input
              value={lat.latDeg}
              className='uk-input uk-margin'
              disabled
            />
          </div>
          <div>
            <input
              value={lat.latMin}
              className='uk-input uk-margin'
              disabled
            />
          </div>
          <div>
            <input
              value={lat.latSec}
              className='uk-input uk-margin'
              disabled
            />
          </div>
          <div>
            <input
              value={lat.latDir}
              className='uk-input uk-margin'
              disabled
            >
            </input>
          </div>
        </React.Fragment>
      );
      lonDivs = (
        <React.Fragment>
          <div>
            <input
              value={lon.lonDeg}
              className='uk-input uk-margin'
              disabled
            />
          </div>
          <div>
            <input
              value={lon.lonMin}
              className='uk-input uk-margin'
              disabled
            />
          </div>
          <div>
            <input
              value={lon.lonSec}
              className='uk-input uk-margin'
              disabled
            />
          </div>
          <div>
            <input
              value={lon.lonDir}
              className='uk-input uk-margin'
              disabled
            >
            </input>
          </div>
        </React.Fragment>
      )
    } else {
      latDivs = (
        <React.Fragment>
          <div>
            <input
              type='number'
              placeholder='&#176;'
              id='latDeg'
              onChange={this.props.updateSurveyState}
              value={this.props.data.latDeg}
              className='uk-input uk-margin'
            />
          </div>
          <div>
            <input
              type='number'
              placeholder="'"
              id='latMin'
              onChange={this.props.updateSurveyState}
              value={this.props.data.latMin}
              className='uk-input uk-margin'
            />
          </div>
          <div>
            <input
              type='number'
              placeholder='"'
              id='latSec'
              onChange={this.props.updateSurveyState}
              value={this.props.data.latSec}
              className='uk-input uk-margin'
            />
          </div>
          <div>
            <select
              id='latDir'
              className='uk-select uk-margin'
              onChange={this.props.updateSurveyState}
              value={this.props.data.latDir}
            >
              {!this.props.data.latDir && <option></option>}
              <option value='1' >N</option>
              <option value="-1">S</option>
            </select>
          </div>
        </React.Fragment>
      );
      lonDivs = (
        <React.Fragment>
          <div>
            <input
              type='number'
              placeholder='&#176;'
              id='lonDeg'
              onChange={this.props.updateSurveyState}
              value={this.props.data.lonDeg}
              className='uk-input uk-margin'
            />
          </div>
          <div>
            <input
              type='number'
              placeholder="'"
              id='lonMin'
              onChange={this.props.updateSurveyState}
              value={this.props.data.lonMin}
              className='uk-input uk-margin'
            />
          </div>
          <div>
            <input
              type='number'
              placeholder='"'
              id='lonSec'
              onChange={this.props.updateSurveyState}
              value={this.props.data.lonSec}
              className='uk-input uk-margin'
            />
          </div>
          <div>
            <select
              id='lonDir'
              className='uk-select uk-margin'
              onChange={this.props.updateSurveyState}
              value={this.props.data.lonDir}
            >
              {!this.props.data.lonDir && <option></option>}
              <option value='1' >E</option>
              <option value="-1">W</option>
            </select>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div>
          <label>
            Coordinates (Latitude)<span className="uk-text-danger">*</span>
          </label>
          <div
            className="uk-grid uk-grid-collapse uk-margin uk-child-width-1-4">
          {latDivs}
          </div>
        </div>
        <div>
          <label>
            Coordinates (Longitude)<span className="uk-text-danger">*</span>
          </label>
          <div
            className="uk-grid uk-grid-collapse uk-margin uk-child-width-1-4">
          {lonDivs}
          </div>
        </div>
      </React.Fragment>
    )
  }

  majorUseInput = (autoFilled) => {
    if (autoFilled) {
      return (
        <React.Fragment>
          <div>
            <label>
              <input
                type='checkbox'
                id='usageRecreation'
                className='uk-checkbox'
                checked={autoFilled.majorUse.rec}
                disabled
              />
            </label> Recreational
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                id='usageCommercial'
                className='uk-checkbox'
                checked={autoFilled.majorUse.com}
                disabled
              />
            </label> Commercial
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                id='usageRemoteUnused'
                className='uk-checkbox'
                checked={autoFilled.majorUse.rem}
                disabled
              />
            </label> Remote/Unused
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                className='uk-checkbox'
                checked={autoFilled.majorUse.other}
                disabled
              />
            </label> Other
          </div>
          {autoFilled.majorUse.other &&
            (
              <div>
                <input
                  type='string'
                  id='usageOther'
                  className='uk-input'
                  value={autoFilled.majorUse.other}
                  disabled
                />
              </div>
            )
          }
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div>
          <label>
            <input
              type='checkbox'
              id='usageRecreation'
              className='uk-checkbox'
              checked={this.props.data.usageRecreation}
              onChange={this.props.updateCheckedState}
            />
          </label> Recreational
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              id='usageCommercial'
              className='uk-checkbox'
              checked={this.props.data.usageCommercial}
              onChange={this.props.updateCheckedState}
            />
          </label> Commercial
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              id='usageRemoteUnused'
              className='uk-checkbox'
              checked={this.props.data.usageRemoteUnused}
              onChange={this.props.updateCheckedState}
            />
          </label> Remote/Unused
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              id='showOtherUsage'
              className='uk-checkbox'
              checked={this.props.showOthers.showOtherUsage}
              onChange={this.props.updateShowOthers}
            />
          </label> Other
        </div>
        {this.props.showOthers.showOtherUsage &&
          (
            <div>
              <input
                type='string'
                id='usageOther'
                className='uk-input'
                value={this.props.data.usageOther}
                onChange={this.props.updateSurveyState}
              />
            </div>
          )
        }
      </React.Fragment>
    );
  }

  reasonInput = (autoFilled) => {
    if (autoFilled) {
      return (
        <React.Fragment>
          <div>
            <label>
              <input
                type='checkbox'
                id='locationChoiceProximity'
                className='uk-checkbox'
                checked={autoFilled.reason.prox}
                disabled
              />
            </label> Proximity/Convenience
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                id='locationChoiceDebris'
                className='uk-checkbox'
                checked={autoFilled.reason.debris}
                disabled
              />
            </label> Known for Debris
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                className='uk-checkbox'
                checked={autoFilled.reason.other}
                disabled
              />
            </label> Other
          </div>
          {autoFilled.reason.other &&
            (
              <div>
                <input
                  type='string'
                  id='locationChoiceOther'
                  className='uk-input'
                  value={autoFilled.reason.other}
                  disabled
                />
              </div>
            )
          }
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div>
          <label>
            <input
              type='checkbox'
              id='locationChoiceProximity'
              onChange={this.props.updateCheckedState}
              checked={this.props.data.locationChoiceProximity}
              className='uk-checkbox'
            />
          </label> Proximity/Convenience
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              id='locationChoiceDebris'
              onChange={this.props.updateCheckedState}
              checked={this.props.data.locationChoiceDebris}
              className='uk-checkbox'
            />
          </label> Known for Debris
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              id='showOtherReason'
              className='uk-checkbox'
              checked={this.props.showOthers.showOtherReason}
              onChange={this.props.updateShowOthers}
            />
          </label> Other
        </div>
        {this.props.showOthers.showOtherReason &&
          (
            <div>
              <input
                type='string'
                id='locationChoiceOther'
                className='uk-input'
                value={this.props.data.locationChoiceOther}
                onChange={this.props.updateSurveyState}
              />
            </div>
          )
        }
      </React.Fragment>
    );
  }

  compassDirectionInput = (autoFilled) => {
    if (autoFilled) {
      return (
        <input
          type='number'
          id='compassDegrees'
          className='uk-input uk-margin'
          value={autoFilled.cmpsDir}
          disabled
        />
      );
    }
    return (
      <input
        type='number'
        placeholder='Degrees'
        id='compassDegrees'
        value={this.props.data.compassDegrees}
        onChange={this.props.updateSurveyState}
        className='uk-input uk-margin'
      />
    );
  }

  /**
  * If a beach from the database has been selected in the dropdown, this
  * displays the distance from the river nearest the beach to the start of the
  * spine. Otherwise, displays an input textbox to enter the distance.
  * @param autoFilled
  * @return distance from river closest to selected beach to the start of the
  * spine if autoFilled is true, otherwise input textbox
  */
  riverDistInput = (autoFilled) => {
    if (autoFilled) {
      return (
        <input
          value={autoFilled.nroDist}
          className='uk-input uk-margin'
          disabled
        />
      );
    }
    return (
      <input
        type='number'
        placeholder='Nearest River Output Distance'
        id='riverDistance'
        value={this.props.data.riverDistance}
        onChange={this.props.updateSurveyState}
        className='uk-input uk-margin'
      />
    );
  }

  /**
  * JSX code for the survey area section. In a dropdown box.
  * @return the JSX code
  */
  render() {
    let autoFilledData = this.props.autoFilledBeachData;
    return (
      <AccordionItem className="accordion__item">
        <AccordionItemTitle
          className="accordion__title accordion__title--animated">
          <h2>Survey Area<span className="uk-text-danger">*</span></h2>
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
        <AccordionItemBody className="accordion__body">
          <div>
            <h4>Beach Info</h4>
          </div>

          <div className="uk-grid uk-child-width-1-3">
            <div>
              <label>
                Beach Name<span className="uk-text-danger">*</span>
              </label>
              {this.beachNameInput(autoFilledData)}
            </div>
            {this.coordsInput(autoFilledData)}
          </div>

          <div className="uk-grid uk-child-width-1-3">
            <div>
              <label>
                Major Usage<span className="uk-text-danger">*</span>
              </label>
              {this.majorUseInput(autoFilledData)}
            </div>

            <div>
              <label>
                Reason for Location Choice
                <span className="uk-text-danger">*</span>
              </label>
              {this.reasonInput(autoFilledData)}
            </div>
            <div>
              <label>
                Compass Direction (When Facing the Water)
                <span className="uk-text-danger">*</span>
              </label>
              {this.compassDirectionInput(autoFilledData)}
            </div>
          </div>

          <hr></hr>

          <div>
            <h4>Nearest River Output</h4>
          </div>

          <div className="uk-grid uk-child-width-1-2">
            <div>
              <label>
                River Name<span className="uk-text-danger">*</span>
              </label>
              {this.riverNameInput(autoFilledData)}
            </div>
            <div>
              <label>
                Approximate Distance from "zero" on the Spine (mi)
                <span className="uk-text-danger">*</span>
              </label>
              {this.riverDistInput(autoFilledData)}
            </div>
          </div>

          <hr></hr>

          <div className="uk-grid uk-child-width-1-2">
            <h4>Last Tide Before Clean Up</h4>
            <h4>Next Tide After Clean Up</h4>
          </div>

          <div className="uk-grid uk-child-width-1-2">
            <div>
              <label>Type<span className="uk-text-danger">*</span></label>
              <select
                id='tideTypeB'
                className='uk-select uk-margin'
                onChange={this.props.updateSurveyState}
                value={this.props.data.tideTypeB}
              >
                {!this.props.data.tideTypeB && <option>Please Select</option>}
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label>Type<span className="uk-text-danger">*</span></label>
              <select
                id='tideTypeA'
                className='uk-select uk-margin'
                onChange={this.props.updateSurveyState}
                value={this.props.data.tideTypeA}
              >
                {!this.props.data.tideTypeA && <option>Please Select</option>}
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="uk-grid uk-child-width-1-4">
            <div>
              <label>
                Height (ft)<span className="uk-text-danger">*</span>
              </label>
              <input
                type="number"
                placeholder="Height"
                id='tideHeightB'
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
                value={this.props.data.tideHeightB}
              />
            </div>
            <div>
              <label>Time<span className="uk-text-danger">*</span></label>
              <input
                type="time"
                id='tideTimeB'
                onChange={this.props.updateSurveyState}
                value={this.props.data.tideTimeB}
                className='uk-input uk-margin'

              />
            </div>
            <div>
              <label>
                Height (ft)<span className="uk-text-danger">*</span>
              </label>
              <input
                type="number"
                placeholder="Height"
                id='tideHeightA'
                onChange={this.props.updateSurveyState}
                value={this.props.data.tideHeightA}
                className='uk-input uk-margin'
              />
            </div>
            <div>
              <label>Time<span className="uk-text-danger">*</span></label>
              <input
                type="time"
                id='tideTimeA'
                onChange={this.props.updateSurveyState}
                value={this.props.data.tideTimeA}
                className='uk-input uk-margin'
              />
            </div>
          </div>

          <hr></hr>

          <div className="uk-grid uk-child-width-1-3">
            <div>
              <h4>Wind</h4>
              <label>
                Speed (knots)<span className="uk-text-danger">*</span>
              </label>
              <input
                type="number"
                placeholder="Speed (knots)"
                id='windSpeed'
                onChange={this.props.updateSurveyState}
                value={this.props.data.windSpeed}
                className='uk-input uk-margin'
              />

              <label>Direction<span className="uk-text-danger">*</span></label>
              <select
                id='windDir'
                onChange={this.props.updateSurveyState}
                value={this.props.data.windDir}
                className='uk-input uk-margin'
              >
                {(!this.props.data.windDir) && <option>Please Select</option>}
                <option value="n">North</option>
                <option value="ne">Northeast</option>
                <option value="e">East</option>
                <option value="se">Southeast</option>
                <option value="s">South</option>
                <option value="sw">Southwest</option>
                <option value="w">West</option>
                <option value="nw">Northwest</option>
              </select>

              <label>COMMENTS</label>
              <input
                type="string"
                id='windComments'
                onChange={this.props.updateSurveyState}
                value={this.props.data.windComments}
                className='uk-input uk-margin'
              />
            </div>
            <div>
              <h4>Slope</h4>
              <label>Slope<span className="uk-text-danger">*</span></label>
              <select
                id='slope'
                className='uk-select uk-margin'
                onChange={this.props.updateSurveyState}
                value={this.props.data.slope}
              >
                {(!this.props.data.slope) && <option>Please Select</option>}
                <option value="winter">Winter Profile</option>
                <option value="summer">Summer Profile</option>
              </select>
            </div>
            <div>
              <h4>Substrate Type<span className="uk-text-danger">*</span></h4>
              <div className="uk-margin">
                <label>
                  <input
                    type='checkbox'
                    id='substrateTypeSand'
                    onChange={this.props.updateCheckedState}
                    checked={this.props.data.substrateTypeSand}
                    className='uk-checkbox'
                  />
                </label> Sand
              </div>
              <div className="uk-margin">
                <label>
                  <input
                    type='checkbox'
                    id='substrateTypePebble'
                    onChange={this.props.updateCheckedState}
                    checked={this.props.data.substrateTypePebble}
                    className='uk-checkbox'
                  />
                </label> Pebble
              </div>
              <div className="uk-margin">
                <label>
                  <input
                    type='checkbox'
                    id='substrateTypeRipRap'
                    onChange={this.props.updateCheckedState}
                    checked={this.props.data.substrateTypeRipRap}
                    className='uk-checkbox'
                  />
                </label> Rip Rap (large boulders)
              </div>
              <div className="uk-margin">
                <label>
                  <input
                    type='checkbox'
                    id='substrateTypeSeaweed'
                    onChange={this.props.updateCheckedState}
                    checked={this.props.data.substrateTypeSeaweed}
                    className='uk-checkbox'
                  />
                </label> Seaweed
              </div>
              <div>
                <label>
                  <input
                    type='checkbox'
                    id='showOtherSubstrate'
                    className='uk-checkbox'
                    checked={this.props.showOthers.showOtherSubstrate}
                    onChange={this.props.updateShowOthers}
                  />
                </label> Other
              </div>
              {this.props.showOthers.showOtherSubstrate &&
                (
                  <div>
                    <input
                      type='string'
                      id='substrateTypeOther'
                      className='uk-input'
                      value={this.props.data.substrateTypeOther}
                      onChange={this.props.updateSurveyState}
                    />
                  </div>
                )
              }
            </div>
          </div>

          <div
            className="uk-padding-large uk-padding-remove-botom uk-width-1-1">
            <div
              className="uk-text uk-text-small uk-text-center uk-text-muted">
              <span className="uk-text-danger">
                *
              </span> = Indicates required field.
            </div>
          </div>

        </AccordionItemBody>
      </AccordionItem>
    )
  }
}

export default SurveyArea
