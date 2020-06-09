/**
 * ASRowReview.js
 * JSX code that displays one row of accumulation survey for Review page. Used
 * in ../SurveySubsections/Review.jsx.
 */
import React, { Component } from 'react'

class ASRowReview extends Component {
  /**
   * JSX code for one row of accumulation survey in Review page. First column
   * is type of debris, second row is fresh debris, and third row is weathered
   * debris.
   * @return JSX code
   */
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.fresh}</td>
        <td>{this.props.weathered}</td>
      </tr>
    );
  }
}

export default ASRowReview;