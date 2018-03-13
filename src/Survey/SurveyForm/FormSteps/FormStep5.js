import React, { Component } from 'react';

class FormStep4 extends Component {
  render() {
    return (
      <div>
        <form>
          <h2>Basic Cleanup</h2>
          <label>Total Weight (in pounds)</label>
          <input
            type='number'
            placeholder='total weight of trash (in pounds)'
            id='weight'
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
          />
          <label>Number of People</label>
          <input
            type='number'
            placeholder='Number of people picking up trash'
            id='NumberOfPeople'
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
          />
        </form>
      </div>

    );
  }
}

export default FormStep4;
