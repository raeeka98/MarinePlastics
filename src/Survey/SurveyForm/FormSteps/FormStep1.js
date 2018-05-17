import React, { Component } from 'react';

class FormStep1 extends Component {
  render() {
    let classNames = this.props.isHidden ? 'uk-hidden' : '';
    return (
      <div className={classNames}>
        <form>
          {/* <h3>Clean Up Information</h3> */}
          <label>Organization</label>
          <input
            type='string'
            placeholder='Organization'
            id='org'
            // value={ this.props.initialValues.org }
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
            required
          />
          <label>Name of Beach</label>
          <input
            type='text'
            placeholder='Name of Beach'
            id='beach'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
            required
          />
          <label>Date</label>
          <input
            type='date'
            placeholder='Date'
            id='date'
            // value={ this.props.initialValues.date }
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
            required
          />
          <label>Reason for Location Choice</label>
          <select
            className="uk-select uk-margin"
            id='reason'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
          >
            <option>Proximity</option>
            <option>Known for debris</option>
            <option>Other</option>
          </select>
        
          <label>Major Usage</label>
          <select
            className="uk-select uk-margin " 
            id='majorUse'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
          >
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
