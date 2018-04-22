import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import marked from 'marked';
// import Auth from '../Auth';
// import axios from 'axios';
import SurveyForm from './SurveyForm/SurveyForm';

import SurveyTableRow from './SurveyTableRow';

var SurveyArea = "0";
var SurfaceRibScan = "0";
var AccumulationSurvey = "0";
var Final;

function handleFormSubmit(e){
  console.log(e.target.id);
  /*console.log(e.target.checked);*/
  if(e.target.checked == true){
    if(e.target.id == "SurveyArea"){
      SurveyArea = "1";
    } else if (e.target.id == "SurfaceRibScan"){
      SurfaceRibScan = "1";
    } else {
      AccumulationSurvey = "1";
    }
    /*console.log(e.target.id)
    localStorage.setItem(e.target.id,1);
    console.log("Survey Area: " + localStorage.SurveyArea);
    console.log("Surface Rib Scan: " + localStorage.SurfaceRibScan);
    console.log("Accumulation Survey: " + localStorage.AccumulationSurvey);
  */} else if (e.target.checked == false){
    if(e.target.id == "SurveyArea"){
      SurveyArea = "0";
    } else if (e.target.id == "SurfaceRibScan"){
      SurfaceRibScan = "0";
    } else {
      AccumulationSurvey = "0";
    }
    /*localStorage.setItem(e.target.id,0);
    console.log("Survey Area: " + localStorage.SurveyArea);
    console.log("Surface Rib Scan: " + localStorage.SurfaceRibScan);
    console.log("Accumulation Survey: " + localStorage.AccumulationSurvey);
  */} 
  console.log("SurveryArea: " + SurveyArea + "SurfaceRibScan: " + SurfaceRibScan + "AccumulationSurvey: " + AccumulationSurvey);
}


class ChooseForm extends Component {

  _setState(){
    var Final = SurveyArea + SurfaceRibScan + AccumulationSurvey;
    console.log("Final: " + Final);
    localStorage.setItem("SurveyArea", SurveyArea);
    console.log(localStorage.SurveyArea);
    localStorage.setItem("SurfaceRibScan", SurfaceRibScan);
    console.log(localStorage.SurfaceRibScan);
    localStorage.setItem("AccumulationSurvey", AccumulationSurvey);
    console.log(localStorage.AccumulationSurvey);
  }

  render(){
    return(

      <div className="uk-margin">
      <h4 className="uk-heading-line  uk-text-center"><span>Choose which type of clean up surveys you have performed</span></h4>
        <ul className="uk-list uk-list-large uk-list-divider uk-text-center">
          <li>  <label><input className="uk-checkbox" id="SurveyArea" type="checkbox" onChange={handleFormSubmit} /> Survey Area </label> </li>
          <li>  <label><input className="uk-checkbox" id="SurfaceRibScan" type="checkbox" onChange={handleFormSubmit}/> Surface Rib Scan </label> </li>
          <li>  <label><input className="uk-checkbox" id="AccumulationSurvey" type="checkbox" onChange={handleFormSubmit}/> Accumulation Survey</label> </li>
        </ul>
        <a className="uk-button uk-button-primary uk-align-right" onClick={this._setState} href={"./survey"}> Enter Survey</a>
      </div>
    );
  }
}
export default ChooseForm;
