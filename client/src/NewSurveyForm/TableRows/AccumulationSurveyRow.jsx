/**
 * AccumulationSurveyRow.jsx
 * One row for the accumulation survey. Used in
 * ../SurveySubsections/AccumulationSurvey.jsx.
 */
import React, { Component } from 'react';

class AccumulationSurveyRow extends Component {
  /**
   * JSX code for one row to enter data in the accumulation survey.
   * @return JSX code
   */
  render() {
    return(
      <div className="uk-grid uk-child-width-1-3">
        <div>
          <h5>{this.props.name}</h5>
        </div>
        <div>
          <input
            type="number"
            min="0"
            id={this.props.id + "__fresh__accumulation"}
            className="uk-input"
            value={
              this.props.data[this.props.id + "__fresh__accumulation"] || 0
            }
            onChange={this.props.updateAS}
          />
        </div>
        <div>
          <input
            type="number"
            min="0"
            id={this.props.id + "__weathered__accumulation"}
            className="uk-input"
            value={
              this.props.data[this.props.id + "__weathered__accumulation"] || 0
            }
            onChange={this.props.updateAS}
          />
        </div>
      </div>
    );
  }
}

export default AccumulationSurveyRow;
