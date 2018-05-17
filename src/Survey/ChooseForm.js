import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChooseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BasicCleanUp: '0',
      SurfaceRibScan: '0',
      AccumulationSurvey: '0',
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  handleFormSubmit(e) {
    if (e.target.checked) this.setState({ [e.target.id]: '1' });
    else this.setState({ [e.target.id]: '0' });
  }

  setLocalStorage(){
    localStorage.setItem("BasicCleanUp", this.state.BasicCleanUp);
    localStorage.setItem("SurfaceRibScan", this.state.SurfaceRibScan);
    localStorage.setItem("AccumulationSurvey", this.state.AccumulationSurvey);
  }

  render(){
    return(
      <div className="uk-margin">
        <h3 className="uk-text-center">
          Choose which type of clean up surveys you have performed
        </h3>
        <ul className="uk-list uk-list-large uk-list-divider uk-text-center">
          <li>
            <input
              className="uk-checkbox uk-margin-right"
              id="BasicCleanUp"
              type="checkbox"
              onChange={this.handleFormSubmit}
            />
            <label>
              Basic Cleanup
            </label>
          </li>
          <li>
            <input
              className="uk-checkbox uk-margin-right"
              id="SurfaceRibScan"
              type="checkbox"
              onChange={this.handleFormSubmit}
            />
            <label>
              Surface Rib Scan
            </label>
          </li>
          <li>
            <input
              className="uk-checkbox uk-margin-right"
              id="AccumulationSurvey"
              type="checkbox"
              onChange={this.handleFormSubmit}
            />
            <label>
              Accumulation Survey
            </label>
          </li>
        </ul>
        <Link
          className="uk-button uk-button-primary uk-align-center uk-width-1-3"
          onClick={ this.setLocalStorage }
          to="./survey"
        >
          Enter Survey
        </Link>
      </div>
    );
  }
}

export default ChooseForm;
