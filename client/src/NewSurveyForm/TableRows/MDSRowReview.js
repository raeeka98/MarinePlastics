import React, { Component } from 'react';

export default class MDSRowReview extends Component {

  render() {

    return (
      <tr>
        <td>Rib #{this.props.rib}</td>
        <td>{this.props.fresh}</td>
        <td>{this.props.weathered}</td>
      </tr>
    );
  }
}









