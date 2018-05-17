import React, { Component } from 'react';

class CustomFormTableRow extends Component {
  render() {
    const classes = this.props.class + ' uk-input uk-margin uk-width-1-2@s';
    return (
      <tr>
        <td>
          <input
            type='text'
            id={ this.props.id }
            onChange={ this.props.handleCustomInputChange }
            className={ classes + ' name' }
          />
        </td>
        <td>
          <input
            type='number'
            id={ this.props.id }
            onChange={ this.props.handleInputChange }
            className={ classes + ' fresh' }
          />
        </td>
        <td>
          <input
            type='number'
            id={ this.props.id }
            onChange={ this.props.handleInputChange }
            className={ classes + ' weathered' }
          />
        </td>
      </tr>
    );
  }
}

export default CustomFormTableRow;
