/**
 * AccumulationSurvey.jsx
 * The accumulation survey component for the survey. Used by ../SurveyForm.jsx.
 */
import React, { Component } from 'react';

import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import AccumulationSurveyRow from '../TableRows/AccumulationSurveyRow';

import { getDebrisNameById, getDebrisMap } from '../debrisInfo';

import '../accordion-styles.css';
import './SurveySubsections.css';

class AccumulationSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOtherIncompleteSurvey: false
    }
  }

  /**
   * JSX code for the accumulation survey section. In a dropdown box.
   * @return the JSX code
   */
  render() {

    let tableRows = [];
    for(const id in getDebrisMap()) {
      tableRows.push(
        <AccumulationSurveyRow
          key={id}
          id={id}
          name={getDebrisNameById(id)}
          updateAS={this.props.updateAS}
          data={this.props.data}
        />
      )
    }

    return(
      <AccordionItem className="accordion__item">
        <AccordionItemTitle
          className="accordion__title accordion__title--animated">
          <h2>Accumulation Survey</h2>
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
        <AccordionItemBody className="accordion__body">
          <div>
            <label>
              If unable to complete an accumulation survey, check box as to why
            </label>
            <div>
              <label>
                <input
                  type='checkbox'
                  id='incompleteSurveyTime'
                  className='uk-checkbox'
                  defaultValue={this.props.data.incompleteSurveyTime}
                  onChange={this.props.updateCheckedState}
                />
              </label> Not enough time
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  id='incompleteSurveyPeople'
                  className='uk-checkbox'
                  defaultValue={this.props.data.incompleteSurveyPeople}
                  onChange={this.props.updateCheckedState}
                />
              </label> Not enough people
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  id='incompleteSurveyArea'
                  className='uk-checkbox'
                  defaultValue={this.props.data.incompleteSurveyArea}
                  onChange={this.props.updateCheckedState}
                />
              </label> Too much area
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  id='incompleteSurveyTrash'
                  className='uk-checkbox'
                  defaultValue={this.props.data.incompleteSurveyTrash}
                  onChange={this.props.updateCheckedState}
                />
              </label> Too much trash
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  className='uk-checkbox'
                  onClick={e => {
                    this.setState({
                      showOtherIncompleteSurvey: e.target.checked
                    });
                    if (!e.target.checked) {
                      this.props.removeOther('incomplete');
                    }
                  }}
                />
              </label> Other
            </div>
            {this.state.showOtherIncompleteSurvey &&
              (
                <div>
                  <input
                    type='string'
                    id='incompleteSurveyOther'
                    className='uk-input'
                    defaultValue={this.props.data.incompleteSurveyOther}
                    onChange={this.props.updateSurveyState}
                  />
                </div>
              )
            }
          </div>
          <div id="trash-header" className="uk-grid uk-child-width-1-3">
            <div></div>
            <div><h4>Pieces Fresh</h4></div>
            <div><h4>Pieces Weathered</h4></div>
          </div>
          {tableRows}
        </AccordionItemBody>
      </AccordionItem>
    )
  }
}

export default AccumulationSurvey
