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
    this.state = {
      showOtherUsage: false,
      showOtherReason: false,
      showOtherSubstrate: false
    }
  }


  updateLatLonFront = (lat, lon) => {

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

        return {latitude : lat, latDeg, latMin, latSec, latDir, longitude : lon, lonDeg, lonMin, lonSec, lonDir}

  }

  // ID to attribute


  autofill = (beachID) => {
    axios.get("/beaches/" + beachID + "/info")
      .then(res => {
        const coordInfo = this.updateLatLonFront(res.data.lat, res.data.lon);
        this.props.updateCoordState(coordInfo, res.data.nroName, res.data.nroDist);
      }).catch(err => {
        console.log(err);
      });
  };


  render() {
    return (
      <AccordionItem className="accordion__item">
        <AccordionItemTitle className="accordion__title accordion__title--animated">
          <h2>Survey Area<span className="uk-text-danger">*</span></h2>
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
        <AccordionItemBody className="accordion__body">
          <div>
            <h4>Beach Info</h4>
          </div>

          <div className="uk-grid uk-child-width-1-3">
            <div>
              <BeachSearch id="beachName" autofill={this.autofill} setSurveyData={this.props.setSurveyData} />
            </div>
            <div>
              <label>Coordinates (Latitude)<span className="uk-text-danger">*</span></label>
              <div className="uk-grid uk-grid-collapse uk-margin uk-child-width-1-4">
                <div>
                  <input
                    type='number'
                    placeholder='&#176;'
                    id='latDeg'
                    onChange={this.props.updateSurveyState}
                    defaultValue={this.props.data.latDeg}
                    className='uk-input uk-margin'
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder="'"
                    id='latMin'
                    onChange={this.props.updateSurveyState}
                    defaultValue={this.props.data.latMin}
                    className='uk-input uk-margin'
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder='"'
                    id='latSec'
                    onChange={this.props.updateSurveyState}
                    defaultValue={this.props.data.latSec}
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

              </div>
            </div>
            <div>
              <label>Coordinates (Longitude):<span className="uk-text-danger">*</span></label>
              <div className="uk-grid uk-grid-collapse uk-margin uk-child-width-1-4">
                <div>
                  <input
                    type='number'
                    placeholder='&#176;'
                    id='lonDeg'
                    onChange={this.props.updateSurveyState}
                    defaultValue={this.props.data.lonDeg}
                    className='uk-input uk-margin'
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder="'"
                    id='lonMin'
                    onChange={this.props.updateSurveyState}
                    defaultValue={this.props.data.lonMin}
                    className='uk-input uk-margin'
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder='"'
                    id='lonSec'
                    onChange={this.props.updateSurveyState}
                    defaultValue={this.props.data.lonSec}
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
              </div>
            </div>
          </div>

          <div className="uk-grid uk-child-width-1-3">
            <div>
              <label>Major Usage<span className="uk-text-danger">*</span></label>
              <div>
                <label>
                  <input
                    type='checkbox'
                    id='usageRecreation'
                    className='uk-checkbox'
                    defaultValue={this.props.data.usageRecreation}
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
                    defaultValue={this.props.data.usageCommercial}
                    onChange={this.props.updateCheckedState}
                  />
                </label> Commercial
                    </div>
              <div>
                <label>
                  <input
                    type='checkbox'
                    className='uk-checkbox'
                    onClick={e => this.setState({ showOtherUsage: e.target.checked })}
                  />
                </label> Other
                    </div>
              {this.state.showOtherUsage &&
                (
                  <div>
                    <input
                      type='string'
                      id='usageOther'
                      className='uk-input'
                      defaultValue={this.props.data.usageOther}
                      onChange={this.props.updateSurveyState}
                    />
                  </div>
                )
              }


            </div>

            <div>
              <label>Reason for Location Choice<span className="uk-text-danger">*</span></label>
              <div>
                <label>
                  <input
                    type='checkbox'
                    id='locationChoiceProximity'
                    onChange={this.props.updateCheckedState}
                    defaultValue={this.props.data.locationChoiceDebris}
                    className='uk-checkbox'
                  />
                </label> Proximity/Convenience
                    </div>
              <div>
                <label>
                  <input
                    type='checkbox'
                    id='locationChoiceDebris'
                    onClick={this.props.updateCheckedState}
                    defaultValue={this.props.data.locationChoiceProximity}
                    className='uk-checkbox'
                  />
                </label> Known for Debris
              </div>
              <div>
                <label>
                  <input
                    type='checkbox'
                    className='uk-checkbox'
                    onClick={e => this.setState({ showOtherReason: e.target.checked })}
                  />
                </label> Other
                    </div>
              {this.state.showOtherReason &&
                (
                  <div>
                    <input
                      type='string'
                      id='locationChoiceOther'
                      className='uk-input'
                      defaultValue={this.props.data.locationChoiceOther}
                      onChange={this.props.updateSurveyState}
                    />
                  </div>
                )
              }
            </div>
            <div>
              <label>Compass Direction (When Facing the Water)<span className="uk-text-danger">*</span></label>
              <input
                type='number'
                placeholder='Degrees'
                id='compassDegrees'
                defaultValue={this.props.data.compassDegrees}
                onChange={this.props.updateSurveyState}
                className='uk-input uk-margin'
              />
            </div>
          </div>

          <hr></hr>

          <div>
            <h4>Nearest River Output</h4>
          </div>

          <div className="uk-grid uk-child-width-1-2">
            <div>
              <label>River Name<span className="uk-text-danger">*</span></label>
              <input
                type='string'
                placeholder='Nearest River Output Name'
                id='riverName'
                defaultValue={this.props.data.riverName}
                onChange={this.props.updateSurveyState}
                className='uk-input uk-margin'
              />
            </div>
            <div>
              <label>Approximate Distance (ft)<span className="uk-text-danger">*</span></label>
              <input
                type='number'
                placeholder='Nearest River Output Distance'
                id='riverDistance'
                defaultValue={this.props.data.riverDistance}
                onChange={this.props.updateSurveyState}
                className='uk-input uk-margin'
              />
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
                <option value="Low">Low</option>
                <option value="High">High</option>
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
                <option value="Low">Low</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="uk-grid uk-child-width-1-4">
            <div>
              <label>Height (ft)<span className="uk-text-danger">*</span></label>
              <input
                type="number"
                placeholder="Height"
                id='tideHeightB'
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
                defaultValue={this.props.data.tideHeightB}
              />
            </div>
            <div>
              <label>Time<span className="uk-text-danger">*</span></label>
              <input
                type="time"
                id='tideTimeB'
                onChange={this.props.updateSurveyState}
                defaultValue={this.props.data.tideTimeB}
                className='uk-input uk-margin'

              />
            </div>
            <div>
              <label>Height (ft)<span className="uk-text-danger">*</span></label>
              <input
                type="number"
                placeholder="Height"
                id='tideHeightA'
                onChange={this.props.updateSurveyState}
                defaultValue={this.props.data.tideHeightA}
                className='uk-input uk-margin'
              />
            </div>
            <div>
              <label>Time<span className="uk-text-danger">*</span></label>
              <input
                type="time"
                id='tideTimeA'
                onChange={this.props.updateSurveyState}
                defaultValue={this.props.data.tideTimeA}
                className='uk-input uk-margin'

              />
            </div>
          </div>

          <hr></hr>

          <div className="uk-grid uk-child-width-1-3">
            <div>
              <h4>Wind</h4>
              <label>Speed (knots)<span className="uk-text-danger">*</span></label>
              <input
                type="number"
                placeholder="Speed (knots)"
                id='windSpeed'
                onChange={this.props.updateSurveyState}
                defaultValue={this.props.data.windSpeed}
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
                <option value="N">North</option>
                <option value="NE">Northeast</option>
                <option value="E">East</option>
                <option value="SE">Southeast</option>
                <option value="S">South</option>
                <option value="SW">Southwest</option>
                <option value="W">West</option>
                <option value="NW">Northwest</option>
              </select>
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

                <option value="Winter">Winter Profile</option>
                <option value="Summer">Summer Profile</option>
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
                    defaultValue={this.props.data.substrateTypeSand}
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
                    defaultValue={this.props.data.substrateTypePebble}
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
                    defaultValue={this.props.data.substrateTypeRipRap}
                    className='uk-checkbox'
                  />
                </label> Rip Rap
              </div>
              <div className="uk-margin">
                <label>
                  <input
                    type='checkbox'
                    id='substrateTypeSeaweed'
                    onChange={this.props.updateCheckedState}
                    defaultValue={this.props.data.substrateTypeSeaweed}
                    className='uk-checkbox'
                  />
                </label> Seaweed
              </div>
              <div>
                <label>
                  <input
                    type='checkbox'
                    className='uk-checkbox'
                    onClick={e => this.setState({ showOtherSubstrate: e.target.checked })}
                  />
                </label> Other
              </div>
              {this.state.showOtherSubstrate &&
                (
                  <div>
                    <input
                      type='string'
                      id='substrateTypeOther'
                      className='uk-input'
                      defaultValue={this.props.data.substrateTypeOther}
                      onChange={this.props.updateSurveyState}
                    />
                  </div>
                )
              }
            </div>
          </div>

          <div className="uk-padding-large uk-padding-remove-botom uk-width-1-1">
            <div className="uk-text uk-text-small uk-text-center uk-text-muted"><span className="uk-text-danger">*</span> = Indicates required field.</div>
          </div>

        </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default SurveyArea
