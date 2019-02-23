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
    let testCategories = [
        {name: 'Cigarette Butts', id: 'cigaretteButts'},
        {name: 'Fishing Line / Polypropylene Rope', id: 'fishingLineRope'},
        {name: 'Plastic Cups', id: 'plasticCups'}
    ];

    let tableRows = testCategories.map(category => {
        return(
            <AccumulationSurveyRow key={category.id }id={category.id} name={category.name}/>
        );
    });
    return(
      <AccordionItem className="accordion__item">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Accumulation Survey</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
              <form>
                <div className="uk-grid uk-child-width-1-4">
                    <div></div>
                    <div><h4>Fresh</h4></div>
                    <div><h4>Weathered</h4></div>
                    <div><h4>Total</h4></div>
                </div>
                {tableRows}
              </form>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default AccumulationSurvey
