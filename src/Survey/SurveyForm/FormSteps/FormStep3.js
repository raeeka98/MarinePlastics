import React, { Component } from 'react';

import FormTableRow from '../FormTableRow';

class FormStep3 extends Component {
  render() {
    return(
      <form className="uk-form-horizontal">
        <h2>{ this.props.title }</h2>
        <table className="uk-table uk-table-striped">
          <thead>
            <tr>
              <th>Debris Type</th>
              <th>Amount Fresh</th>
              <th>Amount Weathered</th>
            </tr>
          </thead>
          <tbody>
            <FormTableRow
              name='Cigarette Butts' 
              class={ this.props.class }
              id='cigaretteButts'
              // freshID='FreshCig'
              // weatheredID='WeatheredCig'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Fishing Line' 
              class={ this.props.class }
              freshID='FreshFline'
              weatheredID='WeatheredFline'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Glass' 
              class={ this.props.class }
              freshID='FreshGlass'
              weatheredID='WeatheredGlass'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Paper' 
              class={ this.props.class }
              freshID='FreshPaper'
              weatheredID='WeatheredPaper'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Filmed Plastic' 
              class={ this.props.class }
              freshID='FreshFplastic'
              weatheredID='WeatheredFplastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Misc. Plastic' 
              class={ this.props.class }
              freshID='FreshMiscPlastic'
              weatheredID='WeatheredMiscPlastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Bottle' 
              class={ this.props.class }
              freshID='FreshPlasticBottle'
              weatheredID='WeatheredPlasticBottle'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cap' 
              class={ this.props.class }
              freshID='FreshPlasticCap'
              weatheredID='WeatheredPlasticCap'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Styrofoam' 
              class={ this.props.class }
              freshID='FreshStyrofoam'
              weatheredID='WeatheredStyrofoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Wood' 
              class={ this.props.class }
              freshID='FreshWood'
              weatheredID='WeatheredWood'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Urethane Foam' 
              class={ this.props.class }
              freshID='FreshUrethaneFoam'
              weatheredID='WeatheredUrethaneFoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cup' 
              class={ this.props.class }
              freshID='FreshPlasticCup'
              weatheredID='WeatheredPlasticCup'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Straw' 
              class={ this.props.class }
              freshID='FreshPlasticStraw'
              weatheredID='WeatheredPlasticStraw'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Cotton/Cloth' 
              class={ this.props.class }
              freshID='FreshCottonCloth'
              weatheredID='WeatheredCottonCloth'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Polypropylene Rope' 
              class={ this.props.class }
              freshID='FreshPolyRope'
              weatheredID='WeatheredPolyRope'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Aluminum Can' 
              class={ this.props.class }
              freshID='FreshAlumCan'
              weatheredID='WeatheredAlumCan'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Hygiene Items' 
              class={ this.props.class }
              freshID='FreshHygItems'
              weatheredID='WeatheredHygItems'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Metal' 
              class={ this.props.class }
              freshID='FreshMetal'
              weatheredID='WeatheredMetal'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Tile/Brick' 
              class={ this.props.class }
              freshID='FreshTileBrick'
              weatheredID='WeatheredTileBrick'
              handleInputChange={ this.props.handleInputChange }
            />
          </tbody>
        </table>
    </form>
    );
  }
}

export default FormStep3;
