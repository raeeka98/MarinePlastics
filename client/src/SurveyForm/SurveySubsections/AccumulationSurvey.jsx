import React, { Component } from 'react';

import {
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import AccumulationSurveyRow from '../TableRows/AccumulationSurveyRow';

import { getDebrisNameById, getDebrisMap } from '../debrisInfo';

import '../accordion-styles.css';

class AccumulationSurvey extends Component {

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
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Accumulation Survey</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
              <div className="uk-grid uk-child-width-1-3">
                  <div></div>
                  <div><h4>Fresh</h4></div>
                  <div><h4>Weathered</h4></div>
              </div>
              {tableRows}
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default AccumulationSurvey
