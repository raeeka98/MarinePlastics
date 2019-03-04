import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import AccumulationSurveyRow from '../TableRows/AccumulationSurveyRow';

import '../accordion-styles.css';

class AccumulationSurvey extends Component {
  constructor(props){
    super(props)
  }

  render() {
    let testCategories = this.props.trash;

    let tableRows = testCategories.map(category => {
        return(
            <AccumulationSurveyRow
              key={category.trash_id}
              id={category.trash_id}
              name={category.name}
              updateSurveyState={this.props.updateSurveyState}
            />
        );
    });
    return(
      <AccordionItem className="accordion__item">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Accumulation Survey</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
              <div className="uk-grid uk-child-width-1-4">
                  <div></div>
                  <div><h4>Fresh</h4></div>
                  <div><h4>Weathered</h4></div>
                  <div><h4>Total</h4></div>
              </div>
              {tableRows}
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default AccumulationSurvey
