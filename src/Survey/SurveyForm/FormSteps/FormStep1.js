import React, { Component } from 'react';

class FormStep1 extends Component {
  render() {
    return (
      <div>
        <form>
          <h2>Clean Up Info</h2>
          <label>Organization</label>
          <input
            type='string'
            placeholder='Organization'
            id='org'
            // value={ this.props.initialValues.org }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
          />
          <label>Name of Beach</label>
          <input
            type='text'
            placeholder='Name of Beach'
            id='beach'
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
          />
          <label>Date</label>
          <input
            type='date'
            placeholder='Date'
            id='date'
            // value={ this.props.initialValues.date }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
            required
          />
          <label>Reason for Location Choice</label>
          <input
            type='text'
            placeholder='Reason for Location Choice (ex. Proximity, Problem Spot, etc.)'
            id='reason'
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
          />
          <label>Major Usage</label>
          <input
            type='text'
            placeholder='(ex. Recreational, Commercial, Remote/Unused, Private, etc.)'
            id='majorUse'
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
          />
        </form>
      </div>

    );
  }
}

export default FormStep1;
