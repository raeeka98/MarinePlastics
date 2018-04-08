
import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import marked from 'marked';
import Auth from '../Auth';
import axios from 'axios';

import SurveyTableRow from './SurveyTableRow';

class ChooseForm extends Component {
  render(){
    return(

      <div className="uk-margin">
      <h4 className="uk-heading-line  uk-text-center"><span>Choose which type of clean up surveys you have performed</span></h4>
  <ul className="uk-list uk-list-large uk-list-divider uk-text-center">
    <li>  <label><input className="uk-checkbox" type="checkbox"/> Survey Area</label> </li>
    <li>  <label><input className="uk-checkbox" type="checkbox"/> Surface Rib Scan</label> </li>
    <li>  <label><input className="uk-checkbox" type="checkbox" /> Accumulation Survey</label> </li>
    </ul>

     <a className="uk-button uk-button-primary uk-align-right" href="/survey">Enter Survey</a>
      </div>
    );
  }
}
export default ChooseForm;
