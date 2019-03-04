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
                <div>
                  <label>Name<span className="uk-text-danger">*</span></label>
                  <input
                    type='string'
                    placeholder='First/Last Name'
                    id='name'
                    className='uk-input uk-margin'
                    defaultValue={this.props.data.name}
                    onChange={this.props.updateSurveyState}
                    required
                    />
                </div>

                <div className="uk-child-width-1-2 uk-grid">
                  <div>
                    <label>Organization Name</label>
                    <input
                      type='string'
                      placeholder='Organization Name'
                      defaultValue={this.props.data.orgName}
                      onChange={this.props.updateSurveyState}
                      id='orgName'
                      className='uk-input uk-margin'
                      required
                      />
                  </div>
                  <div>
                    <label>Organization Location (City, Country)<span className="uk-text-danger">*</span></label>
                    <input
                      type='string'
                      placeholder='Organization Location'
                      defaultValue={this.props.data.orgLoc}
                      onChange={this.props.updateSurveyState}
                      id='orgLoc'
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
                        placeholder='Email Address'
                        defaultValue={this.props.data.email}
                        onChange={this.props.updateSurveyState}
                        id='email'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div className="uk-width-1-4">
                      <label>Clean Up Date<span className="uk-text-danger">*</span></label>
                      <input
                        type='date'
                        defaultValue={this.props.data.date}
                        onChange={this.props.updateSurveyState}
                        id='cleanUpDate'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div className="uk-width-1-4">
                      <label>Clean Up Start Time<span className="uk-text-danger">*</span></label>
                      <input
                        type='time'
                        defaultValue={this.props.data.cleanUpTime}
                        onChange={this.props.updateSurveyState}
                        id='cleanUpTime'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                </div>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default TeamInformation
