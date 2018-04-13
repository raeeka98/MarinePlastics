
import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import marked from 'marked';
// import Auth from '../Auth';
// import axios from 'axios';
import SurveyForm from './SurveyForm/SurveyForm';

import SurveyTableRow from './SurveyTableRow';

function handleFormSubmit(e){
  console.log(e.target.id);
  console.log(e.target.checked);
  if(e.target.checked == true){
    localStorage.setItem(e.target.id,1);
    console.log("Survey Area: " + localStorage.SurveyArea);
    console.log("Surface Rib Scan: " + localStorage.SurfaceRibScan);
    console.log("Accumulation Survey: " + localStorage.AccumulationSurvey);
  } else if (e.target.checked == false){
    localStorage.setItem(e.target.id,0);
    console.log("Survey Area: " + localStorage.SurveyArea);
    console.log("Surface Rib Scan: " + localStorage.SurfaceRibScan);
    console.log("Accumulation Survey: " + localStorage.AccumulationSurvey);
  } 
}

class ChooseForm extends Component {
  render(){
    return(

      <div className="uk-margin">
      <h4 className="uk-heading-line  uk-text-center"><span>Choose which type of clean up surveys you have performed</span></h4>
        <ul className="uk-list uk-list-large uk-list-divider uk-text-center">
          <li>  <label><input className="uk-checkbox" id="SurveyArea" type="checkbox" onChange={handleFormSubmit}/> Survey Area </label> </li>
          <li>  <label><input className="uk-checkbox" id="SurfaceRibScan" type="checkbox" onChange={handleFormSubmit}/> Surface Rib Scan </label> </li>
          <li>  <label><input className="uk-checkbox" id="AccumulationSurvey" type="checkbox" onChange={handleFormSubmit} /> Accumulation Survey</label> </li>
        </ul>

     <a className="uk-button uk-button-primary uk-align-right" href="/survey">Enter Survey</a>
      </div>
    );
  }
}
export default ChooseForm;
