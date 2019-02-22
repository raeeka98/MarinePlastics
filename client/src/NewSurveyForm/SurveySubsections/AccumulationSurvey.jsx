import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class AccumulationSurvey extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <AccordionItem className="accordion__item">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Accumulation Survey</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
              <p> this is the big body for the big accordion item body</p>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default AccumulationSurvey
