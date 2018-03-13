import React, { Component } from 'react';

import FormTableRow from './FormTableRow';

class FormStep3 extends Component {
  render() {
    return(
      <form className="uk-form-horizontal">
        <h2>Surface Rib Scan</h2>
        <table className="uk-table uk-table-striped">
          <thead>
            <th>Debris Type</th>
            <th>Amount Fresh</th>
            <th>Amount Weathered</th>
          </thead>
          <tbody>
            <FormTableRow
              name='Cigarette Butts' 
              freshID='FreshCig'
              weatheredID='WeatheredCig'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Fishing Line' 
              freshID='FreshFline'
              weatheredID='WeatheredFline'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Glass' 
              freshID='FreshGlass'
              weatheredID='WeatheredGlass'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Paper' 
              freshID='FreshPaper'
              weatheredID='WeatheredPaper'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Filmed Plastic' 
              freshID='FreshFplastic'
              weatheredID='WeatheredFplastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Misc. Plastic' 
              freshID='FreshMiscPlastic'
              weatheredID='WeatheredMiscPlastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Bottle' 
              freshID='FreshPlasticBottle'
              weatheredID='WeatheredPlasticBottle'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cap' 
              freshID='FreshPlasticCap'
              weatheredID='WeatheredPlasticCap'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Styrofoam' 
              freshID='FreshStyrofoam'
              weatheredID='WeatheredStyrofoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Wood' 
              freshID='FreshWood'
              weatheredID='WeatheredWood'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Urethane Foam' 
              freshID='FreshUrethaneFoam'
              weatheredID='WeatheredUrethaneFoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cup' 
              freshID='FreshPlasticCup'
              weatheredID='WeatheredPlasticCup'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Straw' 
              freshID='FreshPlasticStraw'
              weatheredID='WeatheredPlasticStraw'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Cotton/Cloth' 
              freshID='FreshCottonCloth'
              weatheredID='WeatheredCottonCloth'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Polypropylene Rope' 
              freshID='FreshPolyRope'
              weatheredID='WeatheredPolyRope'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Aluminum Can' 
              freshID='FreshAlumCan'
              weatheredID='WeatheredAlumCan'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Hygiene Items' 
              freshID='FreshHygItems'
              weatheredID='WeatheredHygItems'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Metal' 
              freshID='FreshMetal'
              weatheredID='WeatheredMetal'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Tile/Brick' 
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
