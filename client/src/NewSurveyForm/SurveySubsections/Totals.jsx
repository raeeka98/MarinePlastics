import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class Totals extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <li>
          <AccordionItemTitle>
          </AccordionItemTitle>
          <div class="uk-accordion-content">
              <p>Totals</p>
          </div>
      </li>
    )
  }

}

export default Totals
