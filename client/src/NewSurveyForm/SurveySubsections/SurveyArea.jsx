import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class SurveyArea extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <AccordionItem>
          <AccordionItemTitle>
              <h2>Survey Area</h2>
          </AccordionItemTitle>
          <AccordionItemBody>

          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default SurveyArea
