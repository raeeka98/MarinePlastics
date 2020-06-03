/**
 * editableTable.jsx
 * Creates table for data on surface rib scan or accumulation survey, where
 * user can edit the data. Used in surveyEntryEdit.jsx.
 */
import React, { Component } from "react";
// import { debrisNames } from '../NewSurveyForm/debrisInfo'

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: null,
      addingnew: false
    }
  }

  /**
   * Stores new type of debris added by user, by calling addDebris(type,
   * trashName) in surveyEntryEdit.jsx.
   * @param {any} e
   */
  addtoData = (e) => {
    this.props.addNewDebris(this.props.type, e.target.value);
    this.setState(prevState => ({
      addingnew: false,
      inProgress: null
    }));
  }

  /**
   * Sets in progres state variable to null when user clicks minus sign for
   * row.
   */
  removeInProgress = () => {
    this.setState(prevState => ({
      addingnew: false,
      inProgress: null
    }));
  }

  /**
   * Called when plus button is pressed, allows user to add data for another
   * type of debris.
   */
  addtoRow = () => {
    let el = (
      <tr>
        <td className="editable">
          <span className="minusBtn" onClick={this.removeInProgress}></span>
          <select
            className='uk-select uk-form-small'
            onChange={this.addtoData}>
            <option default>Select One</option>
            {this.props.options.map((val, i) =>
              <option key={i} id={i} value={val}>{val}</option>
            )}
          </select>
        </td>
        <td>
          <input
            className="uk-input uk-form-small"
            type="number"
            defaultValue="0"
            disabled
          />
        </td>
        <td>
          <input
            className="uk-input uk-form-small"
            type="number"
            defaultValue="0"
            disabled
          />
        </td>
      </tr>
    );
    this.setState(prevState => ({
      inProgress: el,
      addingnew: true
    }))
  }

  /**
   * Creates table for editing surface rib scan or accumulation survey data.
   * @return rendered react component for editable table
   */
  render() {
    return (
      <div id={`${this.props.type}-section`} >
        <div className="uk-card uk-card-default uk-card-body">
          <h3>
            {this.props.type === "SRS" ? "Surface Rib Scan Survey" :
              "Accumulation Survey"}
          </h3>
          <div>
            <table className="uk-table uk-table-striped tableEdit">
              <thead>
                <tr>
                  <th>Debris Type</th>
                  <th>Amount Fresh</th>
                  <th>Amount Weathered</th>
                </tr>
              </thead>
              <tbody>
                {this.props.rows}
                {this.state.inProgress}
                {this.state.addingnew ? null :
                  <tr id="plusBtn" onClick={this.addtoRow}></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EditableTable;