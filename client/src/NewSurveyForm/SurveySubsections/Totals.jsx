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
        <AccordionItem className="accordion__item">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Totals</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
            <label>Total Weight of all Trash Pieces (lb):<span className="uk-text-danger">*</span></label>
            <input
              type='string'
              placeholder='Total Weight'
              id='total-weight'
              onChange={this.props.updateSurveyState}
              className='uk-input uk-margin'
              required
              />
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default Totals
