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
        </form>
      </div>

    );
  }
}

export default FormStep1;
