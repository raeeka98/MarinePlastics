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
              <form>

                  <div className="uk-grid uk-child-width-1-6">
                    <div></div>
                    <div><h4>Rib #1</h4></div>
                    <div><h4>Rib #2</h4></div>
                    <div><h4>Rib #3</h4></div>
                    <div><h4>Rib #4</h4></div>
                    <div></div>
                  </div>

              </form>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default AccumulationSurvey
