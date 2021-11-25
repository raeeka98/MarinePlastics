/**
 * Totals.jsx
 * Section of survey for entering number of people and total weight of trash.
 * Not currently being used.
 */
import React, { Component } from 'react';

import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class Totals extends Component {
  /**
   * JSX code for Totals section.
   * @return JSX code
   */
  render() {
    return(
      <AccordionItem className="accordion__item">
        <AccordionItemTitle
          className="accordion__title accordion__title--animated">
          <h2>Totals<span className="uk-text-danger">*</span></h2>
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
        <AccordionItemBody className="accordion__body">
          <div className="uk-grid uk-child-width-1-2">
            <div>
              <label>Total Number of People:</label>
              <input
                type="number"
                placeholder="Number of People"
                min="0"
                id="numPeople"
                className="uk-input uk-margin"
                value={this.props.data.numPeople}
                onChange={this.props.updateSurveyState}
              />
            </div>
            <div>
              <label>Total Weight of all Trash Pieces (lb):</label>
              <input
                type="number"
                placeholder="Total Weight"
                min="0"
                id="weight"
                onChange={this.props.updateSurveyState}
                value={this.props.data.weight}
                className="uk-input uk-margin"
              />
            </div>
          </div>
        </AccordionItemBody>
      </AccordionItem>
    )
  }
}

export default Totals