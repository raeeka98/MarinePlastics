import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class SurfaceRibScan extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <AccordionItem>
          <AccordionItemTitle>
              <h2>Surface Rib Scan</h2>
          </AccordionItemTitle>
          <AccordionItemBody>

          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default SurfaceRibScan
