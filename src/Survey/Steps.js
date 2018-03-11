import React, { Component } from 'react';
import SurveyForm1 from './SurveyForm1';
import SurveyForm2 from './SurveyForm2';
import SurveyFormLast from './SurveyFormLast';
import StepZilla from 'react-stepzilla'

import Style from './Style.css';
// Validation for the survey form
// submitting on the next step 

class Steps extends Component {
  constructor(props) {
    super(props);
    // if (this.props.location !== undefined ) {
    //   this.state = this.props.location.state.initialValues;
    // } else {
       this.state = {
        leader: '',
        surveyorNames: '',
        contactInfo: '',
        date: '',
        beach: '',
        reason: '',
        st: '',
        lat: '',
        lon: '' ,
        slope: '',
        nroName: '',
        nroDist: '',
        nroFlow: '',
        nroOut: '',
        aspect: '',
        weather: '',
        lastTide: '',
        nextTide: '',
        windDir: '',
        majorUse: '',
      // }
     }
     this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
     this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
     this.handleValChange = this.handleValChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleValChange = this.handleValChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.pollInterval = null;
     this.auth = new Auth();
     this.url = 'http://localhost:3001/api/comments';
   }

render() {
  const steps =
  [
    {name:'Clean Up Information', component: <SurveyForm1 onCommentSubmit={ this.handleCommentSubmit } />},
    {name: 'Survey Area', component: <SurveyForm2 onCommentSubmit={ this.handleCommentSubmit }/> },
    {name: 'Done!', component: <SurveyFormLast/>},
  ]
   return(
       <div className='step-progress'>
         <StepZilla
          onStepChange={(step) => console.log(step)}
          steps={steps}
          showSteps={true}
          nextTextOnFinalActionStep="Submit"
          prevBtnOnLastStep={false}
          showNavigation={true}/>
        </div>
   )
 }
}
 export default Steps;
