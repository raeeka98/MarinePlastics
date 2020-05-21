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
          <h2>Totals</h2>
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
        <AccordionItemBody className="accordion__body">
          <div className="uk-grid uk-child-width-1-2">
            <div>
              <label>Total Number of People:</label>
              <input
                type="number"
                min="0"
                id="numPeople"
                className="uk-input uk-margin"
                defaultValue={this.props.data.numPeople}
                onChange={this.props.updateSurveyState}
              />
            </div>
            <div>
              <label>Total Weight of all Trash Pieces (lb):</label>
              <input
                type='string'
                placeholder='Total Weight'
                id='weight'
                onChange={this.props.updateSurveyState}
                defaultValue={this.props.data.weight}
                className='uk-input uk-margin'
              />
            </div>
          </div>
        </AccordionItemBody>
      </AccordionItem>
    )
  }
}

export default Totals