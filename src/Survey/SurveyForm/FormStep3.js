import React, { Component } from 'react';

class FormStep3 extends Component {
  render() {
    return(
      <form className="uk-form-horizontal">
        <h2>Surface Rib Scan</h2>
        <label>Cig Butts </label> <br/>
        <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshCig'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredCig'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Fishing Line </label> <br/>
        <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshFline'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredFline'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Glass </label> <br/> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshGlass'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredGlass'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Paper </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshPaper'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredPaper'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Filmed Plastic </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshFplastic'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredFplastic'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Misc. Plastics </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshMiscPlastic'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredMiscPlastic'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Plastic Bottle </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshPlasticBottle'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredPlasticBottle'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Plastic Cap </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshPlasticCap'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredPlasticCap'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Styrofoam </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshStyrofoam'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredStyrofoam'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Wood </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshWood'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredWood'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Urethane Foam </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshUrethaneFoam'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredUrethaneFoam'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Plastic Cup </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshPlasticCup'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredPlasticCup'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Plastic Straw </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshPlasticStraw'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredPlasticStraw'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Cotton/Cloth </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshCottonCloth'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredCottonCloth'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Polypropylene Rope </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshPolyRope'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredPolyRope'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Aluminum Can </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshAlumCan'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredAlumCan'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Hygiene Items </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshHygItems'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredHygItems'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Metal </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshMetal'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredMetal'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <label>Tile/Brick </label> <br/>
        <input
          type='number'
          placeholder='fresh'
          id='FreshTileBrick'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
        <input
          type='number'
          placeholder='weathered'
          id='WeatheredTileBrick'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin srs uk-width-1-2@s'
        />
    </form>
    );
  }
}

export default FormStep3;
