import React, { Component } from 'react';

class FormTableRow extends Component {
  render() {
    const classes = this.props.class + ' uk-input uk-margin uk-width-1-2@s';
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <input
            type='number'
            id={ this.props.id }
            onChange={ this.props.handleInputChange }
            className={ classes + ' fresh' }
            min="0"
          />
        </td>
        <td>
          <input
            type='number'
            id={ this.props.id }
            onChange={ this.props.handleInputChange }
            className={ classes + ' weathered' }
            min="0"
          />
        </td>
      </tr>
    );
  }
}

export default FormTableRow;
