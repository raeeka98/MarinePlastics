import React, { Component } from 'react';

import {
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class Totals extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
        <AccordionItem>
          <AccordionItemTitle>
              <h2>Totals</h2>
          </AccordionItemTitle>
          <AccordionItemBody>
              <p>Totals body</p>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default Totals
