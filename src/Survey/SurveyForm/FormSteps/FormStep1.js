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
          <select className="uk-select uk-margin "   id='reason' onChange={ this.props.handleInputChange }>
            <option>Proximity</option>
            <option>Known for debris</option>
            <option>Other</option>
          </select>
        
          <label>Major Usage</label>
          <select className="uk-select uk-margin "   id='majorUse' onChange={ this.props.handleInputChange }>
            <option>Recreational</option>
            <option>Commercial</option>
            <option>Remote/Unused</option>
            <option>Other</option>
          </select>
        </form>
      </div>

    );
  }
}

export default FormStep1;
