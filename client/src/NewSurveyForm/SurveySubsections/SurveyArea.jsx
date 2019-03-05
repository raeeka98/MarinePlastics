import React, { Component } from 'react';

import {
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class SurveyArea extends Component {

  render() {
    return(
      <AccordionItem className="accordion__item">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Survey Area</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
              <div>
                <h4>Beach Info:</h4>
              </div>

              <div className="uk-grid uk-child-width-1-3">
                <div>
                  <label>Name<span className="uk-text-danger">*</span></label>
                  <input
                    type='string'
                    placeholder='Name of Beach'
                    id='beachName'
                    className='uk-input uk-margin'
                    onChange={this.props.updateSurveyState}
                    required
                    />
                </div>
                <div>
                  <label>Coordinates (Latitude):<span className="uk-text-danger">*</span></label>
                  <input
                    type='string'
                    placeholder='Latitude of Beach'
                    id='latitude'
                    onChange={this.props.updateSurveyState}
                    className='uk-input uk-margin'
                    required
                    />
                </div>
                <div>
                  <label>Coordinates (Longitude):<span className="uk-text-danger">*</span></label>
                    <input
                      type='string'
                      placeholder='Longitude of Beach'
                      id='longitude'
                      onChange={this.props.updateSurveyState}
                      className='uk-input uk-margin'
                      required
                      />
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
                          onChange={this.props.updateCheckedState}
                          required
                          />
                      </label> Recreational
                    </div>
                    <div>
                      <label>
                        <input
                          type='checkbox'
                          id='usageCommercial'
                          className='uk-checkbox'
                          onChange={this.props.updateCheckedState}
                          required
                          />
                      </label> Commercial
                    </div>
                    <div>
                      <label>Other</label>
                        <input
                          type='string'
                          id='usageOther'
                          className='uk-input'
                          onChange={this.props.updateSurveyState}
                          required
                          />
                    </div>
                  </div>

                  <div>
                    <label>Reason for Location Choice<span className="uk-text-danger">*</span></label>
                    <div>
                      <label>
                        <input
                          type='checkbox'
                          id='locationChoiceProximity'
                          onChange={this.props.updateCheckedState}
                          className='uk-checkbox'
                          required
                          />
                      </label> Proximity/Convenience
                    </div>
                    <div>
                      <label>
                        <input
                          type='checkbox'
                          id='locationChoiceDebris'
                          onClick={this.props.updateCheckedState}
                          className='uk-checkbox'
                          required
                          />
                      </label> Known for Debris
                    </div>
                    <div>
                      <label> Other</label>
                        <input
                          type='string'
                          id='locationChoiceOther'
                          onChange={this.props.updateSurveyState}
                          className='uk-input'
                          required
                          />
                    </div>
                  </div>
                  <div>
                    <label>Compass Direction (When Facing the Water):<span className="uk-text-danger">*</span></label>
                    <div className="uk-grid">
                      <div className="uk-width-1-2">
                        <input
                          type='string'
                          placeholder='Degrees'
                          id='compassDegrees'
                          onChange={this.props.updateSurveyState}
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      {/*<div className="uk-width-1-4">
                          <span>&#176;</span>
                          </div>*/}
                          <div className="uk-width-1-2">
                            <select
                              id='compassCardinal'
                              onChange={this.props.updateSurveyState}
                              className='uk-input uk-margin'
                              required
                              >
                            <option>North</option>
                            <option>Northeast</option>
                            <option>East</option>
                            <option>Southeast</option>
                            <option>South</option>
                            <option>Southwest</option>
                            <option>West</option>
                            <option>Northwest</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr></hr>

                    <div>
                      <h4>Nearest River Output:</h4>
                    </div>

                    <div className="uk-grid uk-child-width-1-2">
                      <div>
                        <label>Name<span className="uk-text-danger">*</span></label>
                        <input
                          type='string'
                          placeholder='Nearest River Output Name'
                          id='riverName'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      <div>
                        <label>Approximate Distance<span className="uk-text-danger">*</span></label>
                        <input
                          type='string'
                          placeholder='Nearest River Output Distance'
                          id='riverDistance'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                    </div>

                    <hr></hr>

                    <div className="uk-grid uk-child-width-1-2">
                      <h4>Last Tide Before Clean Up:</h4>
                      <h4>Next Tide After Clean Up:</h4>
                    </div>

                    <div className="uk-grid uk-child-width-1-2">
                      <div>
                        <label>Type:<span className="uk-text-danger"></span></label>
                        <select
                          id='tideTypeB'
                          className='uk-select uk-margin'
                          required
                          >
                          <option>Low</option>
                          <option>High</option>
                        </select>
                      </div>
                      <div>
                        <label>Type:<span className="uk-text-danger"></span></label>
                        <select
                          id='tideTypeA'
                          className='uk-select uk-margin'
                          required
                          >
                          <option>Low</option>
                          <option>High</option>
                        </select>
                      </div>
                    </div>

                    <div className="uk-grid uk-child-width-1-2">
                      <div>
                        <label>Height (ft):<span className="uk-text-danger"></span></label>
                        <input
                          type="string"
                          placeholder="Height"
                          id='tideHeightB'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      <div>
                        <label>Height (ft):<span className="uk-text-danger"></span></label>
                        <input
                          type="string"
                          placeholder="Height"
                          id='tideHeightA'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                    </div>

                    <div className="uk-grid uk-child-width-1-2">
                      <div>
                        <label>Time:<span className="uk-text-danger"></span></label>
                        <input
                          type="time"
                          id='tideTimeB'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      <div>
                        <label>Time:<span className="uk-text-danger"></span></label>
                        <input
                          type="time"
                          id='tideTimeA'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                    </div>

                    <hr></hr>

                    <div className="uk-grid uk-child-width-1-3">
                      <div>
                        <h4>Wind</h4>
                        <label>Speed:<span className="uk-text-danger"></span></label>
                        <input
                          type="string"
                          placeholder="Height"
                          id='windSpeed'
                          onChange={this.props.updateSurveyState}
                          className='uk-input uk-margin'
                          required
                          />

                        <label>Direction:<span className="uk-text-danger"></span></label>
                        <select
                          id='windDir'
                          onChange={this.props.updateSurveyState}
                          className='uk-input uk-margin'
                          required
                          >
                        <option>North</option>
                        <option>Northeast</option>
                        <option>East</option>
                        <option>Southeast</option>
                        <option>South</option>
                        <option>Southwest</option>
                        <option>West</option>
                        <option>Northwest</option>
                        </select>
                      </div>
                      <div>
                        <h4>Slope</h4>
                        <select
                          id='slope'
                          className='uk-select uk-margin'
                          onChange={this.props.updateSurveyState}
                          required
                          >
                          <option>Winter Profile</option>
                          <option>Summer Profile</option>
                        </select>
                      </div>
                      <div>
                        <h4>Substrate Type</h4>
                        <div className="uk-margin">
                          <label>
                            <input
                              type='checkbox'
                              id='substrateTypeSand'
                              onChange={this.props.updateCheckedState}
                              className='uk-checkbox'
                              required
                              />
                          </label> Sand
                        </div>
                        <div className="uk-margin">
                          <label>
                            <input
                              type='checkbox'
                              id='substrateTypePebble'
                              onChange={this.props.updateCheckedState}
                              className='uk-checkbox'
                              required
                              />
                          </label> Pebble
                        </div>
                        <div className="uk-margin">
                          <label>
                            <input
                              type='checkbox'
                              id='substrateTypeRipRap'
                              onChange={this.props.updateCheckedState}
                              className='uk-checkbox'
                              required
                              />
                          </label> Rip Rap
                        </div>
                        <div className="uk-margin">
                          <label>
                            <input
                              type='checkbox'
                              id='substrateTypeSeaweed'
                              onChange={this.props.updateCheckedState}
                              className='uk-checkbox'
                              required
                              />
                          </label> Seaweed
                        </div>
                        <div className="uk-margin">
                          <label>Other</label>
                            <input
                              type='string'
                              id='substrateTypeOther'
                              onChange={this.props.updateSurveyState}
                              className='uk-input'
                              required
                              />
                        </div>
                      </div>
                    </div>

          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default SurveyArea
