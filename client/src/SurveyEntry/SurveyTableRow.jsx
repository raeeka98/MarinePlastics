/**
 * SurveyTableRow.jsx
 * Code to create a row for the surface rib scan or accumulation survey data.
 * Used by SurveyEntry.jsx and surveyEntryEdit.jsx.
 */
import React, { Component } from 'react';

class SurveyTableRow extends Component {
  /**
   * Calls changeDebris(typeOfDebris, changedTrashID, valName, newVal) in
   * surveyEntryEdit.jsx to change a value in the row.
   * @param {any} e
   */
  changeDebris = (e) => {
    this.props.onChange(
      this.props.type,
      this.props.trashID,
      e.target.name,
      (e.target.value ? e.target.value : 0));
  }

  /**
   * Calls deleteDebris(typeOfDebris, deletedTrashID) in surveyEntryEdit.jsx to
   * delete the row and the data for the type of debris.tr
   */
  deleteDebris = () => {
    this.props.onClick(this.props.type, this.props.trashID);
  }

  /**
   * Creates one row for survey table data.
   * @return rendered react component for survey table row
   */
  render() {
    return (
      <tr>
        <td className={this.props.edit ? "editable" : null}>
          {this.props.edit ?
            <span
              className="minusBtn"
              onClick={this.deleteDebris}
            >
            </span>
            : null}
          {this.props.name}
        </td>
        <td>{this.props.edit ?
          <input
            className="uk-input uk-form-small"
            type="number"
            name="fresh"
            onChange={this.changeDebris}
            defaultValue={this.props.fresh}
          />
          : this.props.fresh}
        </td>
        <td>{this.props.edit ?
          <input
            className="uk-input uk-form-small"
            type="number"
            name="weathered"
            onChange={this.changeDebris}
            defaultValue={this.props.weathered}
          />
          : this.props.weathered}
        </td>
      </tr>
    );
  }
}

export default SurveyTableRow;
