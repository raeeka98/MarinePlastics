/**
 * MicroDebrisSurvey.jsx
 * The micro debris survey component for the survey. Used by ../SurveyForm.jsx.
 */
import React, { Component } from 'react';

import {
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class MicroDebrisSurvey extends Component {
  /**
   * JSX code for the micro debris survey section. In a dropdown box.
   * @return the JSX code
   */
  render() {
    return(
      <AccordionItem className="accordion__item">
        <AccordionItemTitle
          className="accordion__title accordion__title--animated">
          <h2>Micro Debris Survey</h2>
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
        <AccordionItemBody className="accordion__body">
          <div className="uk-grid uk-child-width-1-3">
            <div></div>
            <div><h4>Fresh Total</h4></div>
            <div><h4>Weathered Total</h4></div>
          </div>
          <div className="uk-grid uk-child-width-1-3">
            <div><h4>Rib #1</h4></div>
            <div>
              <input
                type="number"
                min="0"
                id={"microFreshTotalRib1"}
                defaultValue={this.props.data.microFreshTotalRib1 || 0}
                className="uk-input"
                onChange={this.props.updateMDS}
              />
            </div>
            <div>
              <input
                type="number"
                min="0"
                id="microWeatheredTotalRib1"
                className="uk-input"
                defaultValue={this.props.data.microWeatheredTotalRib1 || 0}
                onChange={this.props.updateMDS}
              />
            </div>
          </div>

          <div className="uk-grid uk-child-width-1-3">
            <div><h4>Rib #2</h4></div>
            <div>
              <input
                type="number"
                min="0"
                id={"microFreshTotalRib2"}
                defaultValue={this.props.data.microFreshTotalRib2 || 0}
                className="uk-input"
                onChange={this.props.updateMDS}
              />
            </div>
            <div>
              <input
                type="number"
                min="0"
                id="microWeatheredTotalRib2"
                className="uk-input"
                defaultValue={this.props.data.microWeatheredTotalRib2 || 0}
                onChange={this.props.updateMDS}
              />
            </div>
          </div>

          <div className="uk-grid uk-child-width-1-3">
            <div><h4>Rib #3</h4></div>
            <div>
              <input
                type="number"
                min="0"
                id={"microFreshTotalRib3"}
                defaultValue={this.props.data.microFreshTotalRib3 || 0}
                className="uk-input"
                onChange={this.props.updateMDS}
              />
            </div>
            <div>
              <input
                type="number"
                min="0"
                id="microWeatheredTotalRib3"
                className="uk-input"
                defaultValue={this.props.data.microWeatheredTotalRib3 || 0}
                onChange={this.props.updateMDS}
              />
            </div>
          </div>

          <div className="uk-grid uk-child-width-1-3">
            <div><h4>Rib #4</h4></div>
            <div>
              <input
                type="number"
                min="0"
                id={"microFreshTotalRib4"}
                defaultValue={this.props.data.microFreshTotalRib4 || 0}
                className="uk-input"
                onChange={this.props.updateMDS}
              />
            </div>
            <div>
              <input
                type="number"
                min="0"
                id="microWeatheredTotalRib4"
                className="uk-input"
                defaultValue={this.props.data.microWeatheredTotalRib4 || 0}
                onChange={this.props.updateMDS}
              />
            </div>
          </div>
        </AccordionItemBody>
      </AccordionItem>
    )
  }
}

export default MicroDebrisSurvey