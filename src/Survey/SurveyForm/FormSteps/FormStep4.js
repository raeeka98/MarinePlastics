import React, { Component } from 'react';

import FormTableRow from '../FormTableRow';

class FormStep3 extends Component {
  render() {
    return(
      <form className="uk-form-horizontal">
        <h2>Accumulation Survey</h2>
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
              class='as'
              freshID='FreshCig'
              weatheredID='WeatheredCig'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Fishing Line' 
              class='as'
              freshID='FreshFline'
              weatheredID='WeatheredFline'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Glass' 
              class='as'
              freshID='FreshGlass'
              weatheredID='WeatheredGlass'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Paper' 
              class='as'
              freshID='FreshPaper'
              weatheredID='WeatheredPaper'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Filmed Plastic' 
              class='as'
              freshID='FreshFplastic'
              weatheredID='WeatheredFplastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Misc. Plastic' 
              class='as'
              freshID='FreshMiscPlastic'
              weatheredID='WeatheredMiscPlastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Bottle' 
              class='as'
              freshID='FreshPlasticBottle'
              weatheredID='WeatheredPlasticBottle'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cap' 
              class='as'
              freshID='FreshPlasticCap'
              weatheredID='WeatheredPlasticCap'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Styrofoam' 
              class='as'
              freshID='FreshStyrofoam'
              weatheredID='WeatheredStyrofoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Wood' 
              class='as'
              freshID='FreshWood'
              weatheredID='WeatheredWood'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Urethane Foam' 
              class='as'
              freshID='FreshUrethaneFoam'
              weatheredID='WeatheredUrethaneFoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cup' 
              class='as'
              freshID='FreshPlasticCup'
              weatheredID='WeatheredPlasticCup'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Straw' 
              class='as'
              freshID='FreshPlasticStraw'
              weatheredID='WeatheredPlasticStraw'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Cotton/Cloth' 
              class='as'
              freshID='FreshCottonCloth'
              weatheredID='WeatheredCottonCloth'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Polypropylene Rope' 
              class='as'
              freshID='FreshPolyRope'
              weatheredID='WeatheredPolyRope'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Aluminum Can' 
              class='as'
              freshID='FreshAlumCan'
              weatheredID='WeatheredAlumCan'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Hygiene Items' 
              class='as'
              freshID='FreshHygItems'
              weatheredID='WeatheredHygItems'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Metal' 
              class='as'
              freshID='FreshMetal'
              weatheredID='WeatheredMetal'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Tile/Brick' 
              class='as'
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
