import React, { Component } from 'react';

var BasicCleanUp = "0";
var SurfaceRibScan = "0";
var AccumulationSurvey = "0";


function handleFormSubmit(e){
  console.log(e.target.id);
  /*console.log(e.target.checked);*/
  if(e.target.checked === true){
    if(e.target.id === "BasicCleanUp"){
      BasicCleanUp = "1";
    } else if (e.target.id === "SurfaceRibScan"){
      SurfaceRibScan = "1";
    } else {
      AccumulationSurvey = "1";
    }
  } else if (e.target.checked === false){
    if(e.target.id === "BasicCleanUp"){
      BasicCleanUp = "0";
    } else if (e.target.id === "SurfaceRibScan"){
      SurfaceRibScan = "0";
    } else {
      AccumulationSurvey = "0";
    }
  } 
  console.log("BasicCleanUp: " + BasicCleanUp + "SurfaceRibScan: " + SurfaceRibScan + "AccumulationSurvey: " + AccumulationSurvey);
}


class ChooseForm extends Component {

  _setState(){
    var Final = BasicCleanUp + SurfaceRibScan + AccumulationSurvey;
    localStorage.setItem("Final", Final);
    localStorage.setItem("BasicCleanUp", BasicCleanUp);
    localStorage.setItem("SurfaceRibScan", SurfaceRibScan);
    localStorage.setItem("AccumulationSurvey", AccumulationSurvey);
  }

  render(){
    return(

      <div className="uk-margin">
      <h4 className="uk-heading-line  uk-text-center"><span>Choose which type of clean up surveys you have performed</span></h4>
        <ul className="uk-list uk-list-large uk-list-divider uk-text-center">
          <li>  <label><input className="uk-checkbox" id="BasicCleanUp" type="checkbox" onChange={handleFormSubmit} /> Basic Cleanup </label> </li>
          <li>  <label><input className="uk-checkbox" id="SurfaceRibScan" type="checkbox" onChange={handleFormSubmit}/> Surface Rib Scan </label> </li>
          <li>  <label><input className="uk-checkbox" id="AccumulationSurvey" type="checkbox" onChange={handleFormSubmit}/> Accumulation Survey</label> </li>
        </ul>
        <a className="uk-button uk-button-primary uk-align-right" onClick={this._setState} href={"./survey"}> Enter Survey</a>
      </div>
    );
  }
}
export default ChooseForm;
