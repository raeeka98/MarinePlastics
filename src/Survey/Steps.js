'use strict';
import React, { Component } from 'react';
import SurveyForm1 from './SurveyForm1';
import SurveyForm2 from './SurveyForm2';

class Steps extends Component {
render() {
   const steps =
   [
     {name:'Team Info', component: <SurveyForm1/>},
     {name: 'Survey Area', component: <SurveyForm2 onCommentSubmit={ this.handleCommentSubmit }/> },
   ]
   return(
     <div className'step-progress'>
     <StepZilla
      onStepChange = {(step) => console.log(step)}
      steps = {steps}
      showSteps = {true}
      showNavigation={true}/>
      </div>

   )
 }
}
 export default Steps;
