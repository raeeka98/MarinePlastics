import React, { Component } from 'react';

import FormTableRow from '../FormTableRow';

class FormStep4 extends Component {
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
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Fishing Line' 
              class={ this.props.class }
              id='fishingLine'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Glass' 
              class={ this.props.class }
              id='glass'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Paper' 
              class={ this.props.class }
              id='paper'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Filmed Plastic' 
              class={ this.props.class }
              id='filmed_plastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Misc. Plastic' 
              class={ this.props.class }
              id='miscPlastic'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Bottle' 
              class={ this.props.class }
              id='plasticBottle'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cap' 
              class={ this.props.class }
              id='plasticCap'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Styrofoam' 
              class={ this.props.class }
              id='styrofoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Wood' 
              class={ this.props.class }
              id='wood'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Urethane Foam' 
              class={ this.props.class }
              id='urethaneFoam'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Cup' 
              class={ this.props.class }
              id='plasticCup'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Plastic Straw' 
              class={ this.props.class }
              id='plasticStraw'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Cotton/Cloth' 
              class={ this.props.class }
              id='cottonCloth'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Polypropylene Rope' 
              class={ this.props.class }
              id='polypropyleneRope'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Aluminum Can' 
              class={ this.props.class }
              id='alumninumCan'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Hygiene Items' 
              class={ this.props.class }
              id='hygieneItem'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Metal' 
              class={ this.props.class }
              id='metal'
              handleInputChange={ this.props.handleInputChange }
            />
            <FormTableRow
              name='Tile/Brick' 
              class={ this.props.class }
              id='tileBrick'
              handleInputChange={ this.props.handleInputChange }
            />
          </tbody>
        </table>
    </form>
    );
  }
}

export default FormStep4;
