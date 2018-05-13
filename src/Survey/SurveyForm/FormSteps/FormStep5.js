import React, { Component } from 'react';

class FormStep4 extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    let classNames = this.props.isHidden ? 'uk-hidden' : '';
    return (
      <div className={classNames}>
        <form>
          {/* <h3>Basic Cleanup</h3> */}
          <label>Total Weight (in pounds)</label>
          <input
            type='number'
            placeholder='total weight of trash (in pounds)'
            id='weight'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
            min="0"
          />
          <label>Number of People</label>
          <input
            type='number'
            placeholder='Number of people picking up trash'
            id='NumberOfPeople'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
            min="0"
          />
        </form>
      </div>

    );
  }
}

export default FormStep4;
