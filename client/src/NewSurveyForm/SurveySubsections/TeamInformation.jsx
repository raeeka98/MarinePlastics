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

                  <div className="uk-child-width-1-2 uk-grid">
                    <div>
                      <label>First Name<span className="uk-text-danger">*</span></label>
                      <input
                        type='string'
                        placeholder='First Name'
                        id='first-name'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div>
                      <label>Last Name<span className="uk-text-danger">*</span></label>
                      <input
                        type='string'
                        placeholder='Last Name'
                        id='last-name'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                </div>

                <div className="uk-child-width-1-2 uk-grid">
                  <div>
                    <label>Organization Name<span className="uk-text-danger">*</span></label>
                    <input
                      type='string'
                      placeholder='Organization Name'
                      id='organization'
                      className='uk-input uk-margin'
                      required
                      />
                  </div>
                  <div>
                    <label>Organization Location<span className="uk-text-danger">*</span></label>
                    <input
                      type='string'
                      placeholder='Organization Name'
                      id='organization'
                      className='uk-input uk-margin'
                      required
                      />
                  </div>
                </div>

                <div className="uk-grid">
                    <div className="uk-width-1-2">
                      <label>Email Address<span className="uk-text-danger">*</span></label>
                      <input
                        type='string'
                        placeholder='Organization Name'
                        id='organization'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div className="uk-width-1-4">
                      <label>Clean Up Date<span className="uk-text-danger">*</span></label>
                      <input
                        type='date'
                        id='clean-up-date'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div className="uk-width-1-4">
                      <label>Clean Up Start Time<span className="uk-text-danger">*</span></label>
                      <input
                        type='time'
                        id='clean-up-time'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                </div>

              </form>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default TeamInformation
