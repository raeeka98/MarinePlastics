import React, { Component } from 'react';

class FormTableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <input
            type='number'
            id={ this.props.freshID }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin srs uk-width-1-2@s'
          />
        </td>
        <td>
          <input
            type='number'
            id={ this.props.weatheredID }
            onChange={ this.props.handleInputChange }
            className='uk-input uk-margin srs uk-width-1-2@s'
          />
        </td>
      </tr>
    );
  }
}

export default FormTableRow;
