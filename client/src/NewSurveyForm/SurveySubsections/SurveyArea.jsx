import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

import BeachSearch from '../BeachSearch';

class SurveyArea extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <AccordionItem className="accordion__item">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Survey Area</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
            <form>
              <div>
                <h4>Beach Info:</h4>
              </div>

              <div className="uk-grid uk-child-width-1-3">
                <div>
                  <BeachSearch/>
                </div>
                <div>
                  <label>Coordinates (Latitude):<span className="uk-text-danger">*</span></label>
                  <input
                    type='string'
                    placeholder='Latitude of Beach'
                    id='latitude'
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
                          id='usage-recreation'
                          className='uk-checkbox'
                          required
                          />
                      </label> Recreational
                    </div>
                    <div>
                      <label>
                        <input
                          type='checkbox'
                          id='usage-commercial'
                          className='uk-checkbox'
                          required
                          />
                      </label> Commercial
                    </div>
                    <div>
                      <label>
                        <input
                          type='checkbox'
                          id='usage-other'
                          className='uk-checkbox'
                          required
                          />
                      </label> Other
                    </div>
                  </div>

                  <div>
                    <label>Reason for Location Choice<span className="uk-text-danger">*</span></label>
                    <div>
                      <label>
                        <input
                          type='checkbox'
                          id='location-choice-proximity'
                          className='uk-checkbox'
                          required
                          />
                      </label> Proximity/Convenience
                    </div>
                    <div>
                      <label>
                        <input
                          type='checkbox'
                          id='location-choice-debris'
                          className='uk-checkbox'
                          required
                          />
                      </label> Known for Debris
                    </div>
                    <div>
                      <label>
                        <input
                          type='checkbox'
                          id='location-choice-other'
                          className='uk-checkbox'
                          required
                          />
                      </label> Other
                    </div>
                  </div>
                  <div>
                    <label>Compass Direction (When Facing the Water):<span className="uk-text-danger">*</span></label>
                    <div className="uk-grid">
                      <div className="uk-width-1-2">
                        <input
                          type='string'
                          placeholder='Degrees'
                          id='compass-direction-degrees'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      {/*<div className="uk-width-1-4">
                          <span>&#176;</span>
                          </div>*/}
                          <div className="uk-width-1-2">
                            <input
                              type='string'
                              placeholder='Direction'
                              id='latitude'
                              className='uk-input uk-margin'
                              required
                              />
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
                          id='river-name'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      <div>
                        <label>Approximate Distance<span className="uk-text-danger">*</span></label>
                        <input
                          type='string'
                          placeholder='Nearest River Output Distance'
                          id='river-distance'
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
                          id='tide-type-before'
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
                          id='tide-type-after'
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
                          id='tide-height-before'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      <div>
                        <label>Height (ft):<span className="uk-text-danger"></span></label>
                        <input
                          type="string"
                          placeholder="Height"
                          id='tide-height-after'
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
                          id='tide-time-before'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      <div>
                        <label>Time:<span className="uk-text-danger"></span></label>
                        <input
                          type="time"
                          id='tide-time-before'
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
                          id='wind-speed'
                          className='uk-input uk-margin'
                          required
                          />

                        <label>Direction:<span className="uk-text-danger"></span></label>
                        <input
                          type="string"
                          placeholder="Height"
                          id='wind-direction'
                          className='uk-input uk-margin'
                          required
                          />
                      </div>
                      <div>
                        <h4>Slope</h4>
                        <select
                          id='slope'
                          className='uk-select uk-margin'
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
                              id='substrate-type-sand'
                              className='uk-checkbox'
                              required
                              />
                          </label> Sand
                        </div>
                        <div className="uk-margin">
                          <label>
                            <input
                              type='checkbox'
                              id='substrate-type-pebble'
                              className='uk-checkbox'
                              required
                              />
                          </label> Pebble
                        </div>
                        <div className="uk-margin">
                          <label>
                            <input
                              type='checkbox'
                              id='substrate-type-rip-rap'
                              className='uk-checkbox'
                              required
                              />
                          </label> Rip Rap
                        </div>
                        <div className="uk-margin">
                          <label>
                            <input
                              type='checkbox'
                              id='substrate-type-seaweed'
                              className='uk-checkbox'
                              required
                              />
                          </label> Seaweed
                        </div>
                        <div className="uk-margin">
                          <label>
                            <input
                              type='checkbox'
                              id='substrate-type-other'
                              className='uk-checkbox'
                              required
                              />
                          </label> Other
                        </div>
                      </div>
                    </div>
              </form>

          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default SurveyArea
