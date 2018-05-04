import React, { Component } from 'react';

class FormStep2 extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    const directions = ['North', 'South', 'East', 'West', 'North East', 'North West', 'South East', 'South West'];
    const dirSelects = directions.map((dir, i) => {
      return (
        <option key={i}>{dir}</option>
      );
    });
    return (

      <form>
      <a href="#" onClick={() => props.jumpToStep(4)}> Click to skip survey sweeps </a>
        <h2>Survey Area</h2>
        <label>GPS Coordinates (Starting Point)</label>
          <br/>
        <input
          type='number'
          placeholder='Latitude'
          id='lat'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='Longitude'
          id='lon'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin uk-width-1-2@s'
        />

        <label>Substrate Type</label>
        <select className="uk-select uk-margin "  id='st' onChange={ this.props.handleInputChange }>
          <option>Sand</option>
          <option>Pebble</option>
          <option>Rip Rap (large boulders)</option>
          <option>Seaweed</option>
          <option>Other</option>
        </select>
        <label>Slope</label>
        <select className="uk-select uk-margin "  id='slope' onChange={ this.props.handleInputChange }>
          <option>Steep</option>
          <option>Gradual</option>
          <option>Gentle</option>
          <option>Other</option>
        </select>
        <label>Nearest River Output</label>
        <br/>
        <input
          type='text'
          placeholder='Name'
          id='nroName'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin  uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='Distance (m)'
          id='nroDist'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin  uk-width-1-2@s'
        />
        <label>Aspect</label>
        <input
          type='number'
          placeholder='(Compass direction facing water in degrees, perpendicular to spine)'
          id='aspect'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Last Tide</label>
        <br/>
        <select className="uk-select uk-margin uk-width-1-3@s"  id='lastTide' onChange={ this.props.handleInputChange }>
          <option>Low</option>
          <option>High</option>
        </select>
    
        <input
          type='number'
          placeholder=' Height'
          id='lastTide'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin  uk-width-1-3@s'
        />
        <input
          type='time'
          placeholder=' Time'
          id='lastTide'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin  uk-width-1-3@s'
        />
        <label>Next Tide</label>
        <br/>
        <select className="uk-select uk-margin uk-width-1-3@s next-tide"  id='type' onChange={ this.props.handleInputChange }>
          <option>Low</option>
          <option>High</option>
        </select>
    
        <input
          type='number'
          placeholder=' Height'
          id='height'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin  uk-width-1-3@s next-tide'
        />
        <input
          type='time'
          placeholder=' Time'
          id='time'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin  uk-width-1-3@s next-tide'
        />
    

        <label>Wind Direction</label>
        <select className="uk-select uk-margin" id="windDir" onChange={ this.props.handleInputChange }>
          { dirSelects }
        </select>
        
        <label>Wind Speed</label>
        <input className="uk-input uk-margin" type="number" id="windSpeed" />
      </form>
    )

  }
}

export default FormStep2;
