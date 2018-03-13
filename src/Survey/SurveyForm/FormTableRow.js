import React, { Component } from 'react';

class FormTableRow extends Component {
  render() {
    const classes = this.props.class + ' uk-input uk-margin uk-width-1-2@s'
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <input
            type='number'
            id={ this.props.freshID }
            onChange={ this.props.handleInputChange }
            className={ classes }
          />
        </td>
        <td>
          <input
            type='number'
            id={ this.props.weatheredID }
            onChange={ this.props.handleInputChange }
            className={ classes }
          />
        </td>
      </tr>
    );
  }
}

export default FormTableRow;
