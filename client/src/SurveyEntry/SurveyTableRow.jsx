import React, { Component } from 'react';

class SurveyTableRow extends Component {

  changeDebris = (e) => {
    this.props.onChange(this.props.type, this.props.trashID, e.target.name, (e.target.value ? e.target.value : 0));
  }

  deleteDebris = () => {
    this.props.onClick(this.props.type, this.props.trashID);
  }

  render() {
    return (
      <tr >
        <td className={this.props.edit ? "editable" : null}>
          {this.props.edit ? <span className="minusBtn" onClick={this.deleteDebris}></span> : null}
          {this.props.name}
        </td>
        <td>{this.props.edit ? <input className="uk-input uk-form-small" type="number" name="fresh" onChange={this.changeDebris} defaultValue={this.props.fresh} /> : this.props.fresh} </td>
        <td>{this.props.edit ? <input className="uk-input uk-form-small" type="number" name="weathered" onChange={this.changeDebris} defaultValue={this.props.weathered} /> : this.props.weathered}</td>
      </tr>
    );
  }

}

export default SurveyTableRow;
