/**
 * TeamInformation.jsx
 * The team information component for the survey. Used by ../SurveyForm.jsx.
 */
import React, { Component } from 'react';

import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class TeamInformation extends Component {
  /**
   * JSX code for the team information section. In a dropdown box.
   * @return the JSX code
   */
  render() {
    return (
      <AccordionItem className="accordion__item" expanded="true">
        <AccordionItemTitle 
          className="accordion__title accordion__title--animated">
          <h2>Team Information<span className="uk-text-danger">*</span></h2>
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
        <AccordionItemBody className="accordion__body">
          <div className="uk-child-width-1-2 uk-grid">
            <div>
              <label>
                Surveyor's First Name <span className="uk-text-danger">*</span>
              </label>
              <input
                type='string'
                placeholder='First Name'
                id='userFirst'
                className='uk-input uk-margin'
                defaultValue={this.props.data.userFirst}
                onChange={this.props.updateSurveyState}
                required
              />
            </div>
            <div>
              <label>
                Surveyor's Last Name<span className="uk-text-danger">*</span>
              </label>
              <input
                type='string'
                placeholder='Last Name'
                id='userLast'
                className='uk-input uk-margin'
                defaultValue={this.props.data.userLast}
                onChange={this.props.updateSurveyState}
                required
              />
            </div>
          </div>

          <div className="uk-child-width-1-2 uk-grid">
            <div>
              <label>
                Organization Name (if applicable)
                <span className="uk-text-danger">*</span>
              </label>
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
              <label>
                Organization Location (City, Country)
                <span className="uk-text-danger">*</span>
              </label>
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

          <div className="uk-grid uk-child-width-1-4">
            <div>
              <label>
                Email Address<span className="uk-text-danger">*</span>
              </label>
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
            <div>
              <label>
                Clean Up Date<span className="uk-text-danger">*</span>
              </label>
              <input
                type='date'
                defaultValue={this.props.data.cleanUpDate}
                onChange={this.props.updateSurveyState}
                id='cleanUpDate'
                className='uk-input uk-margin'
                required
              />
            </div>
            <div>
              <label>
                Clean Up Start Time<span className="uk-text-danger">*</span>
              </label>
              <input
                type='time'
                defaultValue={this.props.data.cleanUpStartTime}
                onChange={this.props.updateSurveyState}
                id='cleanUpStartTime'
                className='uk-input uk-margin'
                required
              />
            </div>
            <div>
              <label>
                Clean Up End Time<span className="uk-text-danger">*</span>
              </label>
              <input
                type='time'
                defaultValue={this.props.data.cleanUpEndTime}
                onChange={this.props.updateSurveyState}
                id='cleanUpEndTime'
                className='uk-input uk-margin'
                required
              />
            </div>
          </div>

          <div
            className="uk-padding-small uk-padding-remove-botom uk-width-1-1">
            <div
              className="uk-text uk-text-small uk-text-center uk-text-muted">
              <span className="uk-text-danger">
                *
              </span> = Indicates required field.
            </div>
          </div>
        </AccordionItemBody>
      </AccordionItem>
    );
  }
}

export default TeamInformation
