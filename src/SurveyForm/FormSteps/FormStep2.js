
import React, { Component } from 'react';

class FormStep2 extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    let classNames = this.props.isHidden ? 'uk-hidden' : '';
    const directions = ['North', 'South', 'East', 'West', 'North East', 'North West', 'South East', 'South West'];
    // makes options for all the directions
    const dirSelects = directions.map((dir, i) => {
      return (
        <option key={i}>{dir}</option>
      );
    });
    return (
      <div className={classNames}>
        <form>
          <label>GPS Coordinates (Starting Point)</label>
            <br/>
          <input
            type='number'
            placeholder='Latitude'
            id='lat'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin uk-width-1-2@s'
          />
          <input
            type='number'
            placeholder='Longitude'
            id='lon'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin uk-width-1-2@s'
          />
          <label>Substrate Type</label>
          <select
            className="uk-select uk-margin"
            id='st'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
          >
            <option>Sand</option>
            <option>Pebble</option>
            <option>Rip Rap (large boulders)</option>
            <option>Seaweed</option>
            <option>Other</option>
          </select>
          <label>Slope</label>
          <select
            className="uk-select uk-margin"
            id='slope'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
          >
            <option>Steep</option>
            <option>Gradual</option>
            <option>Gentle</option>
            <option>Other</option>
          </select>
          <label>Nearest River Output</label>
          <br />
          <input
            type='text'
            placeholder='Name'
            id='nroName'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin  uk-width-1-2@s'
          />
          <input
            type='number'
            placeholder='Distance (m)'
            id='nroDist'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin  uk-width-1-2@s'
          />
          <label>Aspect</label>
          <input
            type='number'
            placeholder='(Compass direction facing water in degrees, perpendicular to spine)'
            id='aspect'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin'
          />
          <label>Last Tide</label>
          <br/>
          <select
            className="uk-select uk-margin uk-width-1-3@s" 
            id='lastTide'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
          >
            <option>Low</option>
            <option>High</option>
          </select>
      
          <input
            type='number'
            placeholder=' Height'
            id='lastTide'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin  uk-width-1-3@s'
          />
          <input
            type='time'
            placeholder=' Time'
            id='lastTide'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin  uk-width-1-3@s'
          />
          <label>Next Tide</label>
          <br/>
          <select
            className="uk-select uk-margin uk-width-1-3@s next-tide"
            id='type'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
          >
            <option>Low</option>
            <option>High</option>
          </select>
      
          <input
            type='number'
            placeholder=' Height'
            id='height'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin  uk-width-1-3@s next-tide'
          />
          <input
            type='time'
            placeholder=' Time'
            id='time'
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin  uk-width-1-3@s next-tide'
          />
      

          <label>Wind Direction</label>
          <select
            className="uk-select uk-margin"
            id="windDir"
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
          >
            { dirSelects }
          </select>
          
          <label>Wind Speed</label>
          <input
            className="uk-input uk-margin"
            type="number"
            id="windSpeed"
            onBlur={ this.props.handleValidation }
            onChange={ this.props.handleInputChange }
          />
        </form>
      </div>
    )

  }
}

export default FormStep2;
