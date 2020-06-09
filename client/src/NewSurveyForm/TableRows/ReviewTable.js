/**
 * ReviewTable.js
 * JSX code that displays one row of surface rib scan for Review page. Used in
 * ../SurveySubsections/Review.jsx.
 */
import React, { Component } from 'react';

export default class RibScanRowReview extends Component {
  /**
   * JSX code for one row of surface rib scan in Review page. First column is
   * type of debris, other columns are fresh and weathered debris for each rib.
   * @return JSX code
   */
  render() {
    return(
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.fresh[0]}</td>
        <td>{this.props.weathered[0]}</td>
        <td>{this.props.fresh[1]}</td>
        <td>{this.props.weathered[1]}</td>
        <td>{this.props.fresh[2]}</td>
        <td>{this.props.weathered[2]}</td>
        <td>{this.props.fresh[3]}</td>
        <td>{this.props.weathered[3]}</td>
      </tr>
    );
  }
}