/**
 * SurfaceRibScan.jsx
 * The survey area component for the survey. Used by ../SurveyForm.jsx.
 */
import React, { Component } from 'react';

import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import RibScanRow from '../TableRows/RibScanRow';

import { getDebrisNameById, getDebrisMap } from '../debrisInfo';


import '../accordion-styles.css';
import './SurveySubsections.css';

class SurfaceRibScan extends Component {
  /**
   * JSX code for the surface rib scan section. In a dropdown box.
   * @return the JSX code
   */
  render() {

    let tableRows = [];
    for(const id in getDebrisMap()) {
      tableRows.push(
        <RibScanRow
          key={id}
          id={id}
          name={getDebrisNameById(id)}
          data={this.props.SRSData}
          updateSRS={this.props.updateSRS}
        />
      )
    }

    return(
      <AccordionItem className="accordion__item">
        <AccordionItemTitle
          className="accordion__title accordion__title--animated">
          <h2>Surface Rib Scan</h2>
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
        <AccordionItemBody className="accordion__body">
          <div className="uk-grid uk-child-width-1-5">
            <div></div>
            <div><h4>Rib #1</h4></div>
            <div><h4>Rib #2</h4></div>
            <div><h4>Rib #3</h4></div>
            <div><h4>Rib #4</h4></div>
          </div>

          <div className="uk-grid uk-child-width-1-5">
            <div><h5>SPINE Start Point (0-100 m)</h5></div>
            <div>
              <input
                type='string'
                placeholder='Rib #1 Start'
                id='rib1Start'
                value={this.props.data.rib1Start}
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
              />
            </div>
            <div>
              <input
                type='string'
                placeholder='Rib #2 Start'
                id='rib2Start'
                value={this.props.data.rib2Start}
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
              />
            </div>
            <div>
              <input
                type='string'
                placeholder='Rib #3 Start'
                id='rib3Start'
                value={this.props.data.rib3Start}
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
              />
            </div>
            <div>
              <input
                type='string'
                placeholder='Rib #4 Start'
                id='rib4Start'
                value={this.props.data.rib4Start}
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
              />
            </div>
          </div>

          <div className="uk-grid uk-child-width-1-5">
            <div><h5>RIB LENGTH (m)</h5></div>
            <div>
              <input
                type='string'
                placeholder='Rib #1 Length'
                id='rib1End'
                value={this.props.data.rib1End}
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
              />
            </div>
            <div>
              <input
                type='string'
                placeholder='Rib #2 Length'
                id='rib2End'
                value={this.props.data.rib2End}
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
              />
            </div>
            <div>
              <input
                type='string'
                placeholder='Rib #3 Length'
                id='rib3End'
                value={this.props.data.rib3End}
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
              />
            </div>
            <div>
              <input
                type='string'
                placeholder='Rib #4 Length'
                id='rib4End'
                value={this.props.data.rib4End}
                className='uk-input uk-margin'
                onChange={this.props.updateSurveyState}
              />
            </div>
          </div>

          <hr></hr>

          <div id="trash-header" className="uk-grid">
            <div className="uk-width-1-5"></div>
            <div className="uk-width-1-5">
              <div className="uk-grid">
                <div className="uk-width-1-2">
                  <center><label>Rib #1 Fresh</label></center>
                </div>
                <div className="uk-width-1-2">
                  <center><label>Rib #1 Weathered</label></center>
                </div>
              </div>
            </div>
            <div className="uk-width-1-5">
              <div className="uk-grid">
                <div className="uk-width-1-2">
                  <center><label>Rib #2 Fresh</label></center>
                </div>
                <div className="uk-width-1-2">
                  <center><label>Rib #2 Weathered</label></center>
                </div>
              </div>
            </div>
            <div className="uk-width-1-5">
              <div className="uk-grid">
                <div className="uk-width-1-2">
                  <center><label>Rib #3 Fresh</label></center>
                </div>
                <div className="uk-width-1-2">
                  <center><label>Rib #3 Weathered</label></center>
                </div>
              </div>
            </div>
            <div className="uk-width-1-5">
              <div className="uk-grid">
                <div className="uk-width-1-2">
                  <center><label>Rib #4 Fresh</label></center>
                </div>
                <div className="uk-width-1-2">
                  <center><label>Rib #4 Weathered</label></center>
                </div>
              </div>
            </div>
          </div>

          {tableRows}

        </AccordionItemBody>
      </AccordionItem>
    )
  }
}

export default SurfaceRibScan
