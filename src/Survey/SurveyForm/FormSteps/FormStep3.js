import React, { Component } from 'react';

import FormTableRow from '../FormTableRow';

class FormStep3 extends Component {
  render() {
    return(
      <form className="uk-form-horizontal">
        <h2>Surface Rib Scan</h2>
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
              class='srs'
              freshID='FreshCig'
              weatheredID='WeatheredCig'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Fishing Line' 
              class='srs'
              freshID='FreshFline'
              weatheredID='WeatheredFline'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Glass' 
              class='srs'
              freshID='FreshGlass'
              weatheredID='WeatheredGlass'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Paper' 
              class='srs'
              freshID='FreshPaper'
              weatheredID='WeatheredPaper'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Filmed Plastic' 
              class='srs'
              freshID='FreshFplastic'
              weatheredID='WeatheredFplastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Misc. Plastic' 
              class='srs'
              freshID='FreshMiscPlastic'
              weatheredID='WeatheredMiscPlastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Bottle' 
              class='srs'
              freshID='FreshPlasticBottle'
              weatheredID='WeatheredPlasticBottle'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cap' 
              class='srs'
              freshID='FreshPlasticCap'
              weatheredID='WeatheredPlasticCap'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Styrofoam' 
              class='srs'
              freshID='FreshStyrofoam'
              weatheredID='WeatheredStyrofoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Wood' 
              class='srs'
              freshID='FreshWood'
              weatheredID='WeatheredWood'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Urethane Foam' 
              class='srs'
              freshID='FreshUrethaneFoam'
              weatheredID='WeatheredUrethaneFoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cup' 
              class='srs'
              freshID='FreshPlasticCup'
              weatheredID='WeatheredPlasticCup'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Straw' 
              class='srs'
              freshID='FreshPlasticStraw'
              weatheredID='WeatheredPlasticStraw'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Cotton/Cloth' 
              class='srs'
              freshID='FreshCottonCloth'
              weatheredID='WeatheredCottonCloth'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Polypropylene Rope' 
              class='srs'
              freshID='FreshPolyRope'
              weatheredID='WeatheredPolyRope'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Aluminum Can' 
              class='srs'
              freshID='FreshAlumCan'
              weatheredID='WeatheredAlumCan'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Hygiene Items' 
              class='srs'
              freshID='FreshHygItems'
              weatheredID='WeatheredHygItems'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Metal' 
              class='srs'
              freshID='FreshMetal'
              weatheredID='WeatheredMetal'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Tile/Brick' 
              class='srs'
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
