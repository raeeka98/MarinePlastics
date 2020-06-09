/**
 * MDSRowReview.js
 * One row for the micro debris section on the review page. Used by
 * ../SurveySubsections/Review.jsx.
 */
import React, { Component } from 'react';

export default class MDSRowReview extends Component {
  /**
   * Renders the row. First column is rib number, second column is number of
   * fresh micro debris in the rib, and third column is number of weathered
   * debris in the rib.
   * @return JSX code
   */
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









