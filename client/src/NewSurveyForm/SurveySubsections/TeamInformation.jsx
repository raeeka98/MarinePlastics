import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class TeamInformation extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <AccordionItem className="accordion__item" expanded="true">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Team Information</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
              <form>

                  <div>
                    <label>First Name<span className="uk-text-danger">*</span></label>
                    <input
                      type='string'
                      placeholder='First Name'
                      id='first-name'
                      className='uk-input uk-margin'
                      required
                      />

                    <label>Last Name<span className="uk-text-danger">*</span></label>
                    <input
                      type='string'
                      placeholder='last-name'
                      id='organization'
                      className='uk-input uk-margin'
                      required
                      />
                </div>

                <div>
                    <label>Organization Name<span className="uk-text-danger">*</span></label>
                    <input
                      type='string'
                      placeholder='Organization Name'
                      id='organization'
                      className='uk-input uk-margin'
                      required
                      />

                    <label>Organization Location<span className="uk-text-danger">*</span></label>
                    <input
                      type='string'
                      placeholder='Organization Name'
                      id='organization'
                      className='uk-input uk-margin'
                      required
                      />
                </div>



              </form>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default TeamInformation
