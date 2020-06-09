/**
 * RibScanRow.jsx
 * Creates one row for entering data for the surface rib scan. Used in
 * ../SurveySubsections/SurfaceRibScan.jsx.
 */
import React, { Component } from 'react';

/**
 * Creates two entries, one for fresh and one for weathered for one rib in the
 * surface rib scan. Used by RibScanRow.
 * @param {any} props
 * @return JSX code
 */
const RibScanCell = (props) => {
  return(
    <div className="uk-grid uk-child-width-1-2">
      <div>
        <input
          type="number"
          min="0"
          id={props.id + "__fresh__" + props.ribNumber}
          className="uk-input"
          defaultValue={
            props.data[props.id + "__fresh__" + props.ribNumber] || 0
          }
          onChange={props.updateSRS}
        />
      </div>
      <div>
        <input
          type="number"
          min="0"
          id={props.id + "__weathered__" + props.ribNumber}
          defaultValue={
            props.data[props.id + "__weathered__" + props.ribNumber] || 0
          }
          className="uk-input"
          onChange={props.updateSRS}
        />
      </div>
    </div>
  )
}

class RibScanRow extends Component {
  /**
   * Creates one row for user to enter data for surface rib scan. First column
   * is the type of debris, other columns are for each rib, using RibScanCell.
   * @return JSX code
   */
  render() {
    return(
      <div className="uk-grid uk-child-width-1-5">
        <div>
          <h5>{this.props.name}</h5>
        </div>
        <div>
          <RibScanCell
            ribNumber='1'
            id={this.props.id}
            data={this.props.data}
            updateSRS={this.props.updateSRS}
          />
        </div>
        <div>
          <RibScanCell
            ribNumber='2'
            id={this.props.id}
            data={this.props.data}
            updateSRS={this.props.updateSRS}
          />
        </div>
        <div>
          <RibScanCell
            ribNumber='3'
            id={this.props.id}
            data={this.props.data}
            updateSRS={this.props.updateSRS}
          />
        </div>
        <div>
          <RibScanCell
            ribNumber='4'
            id={this.props.id}
            data={this.props.data}
            updateSRS={this.props.updateSRS}
          />
        </div>
      </div>
    );
  }
}

export default RibScanRow;