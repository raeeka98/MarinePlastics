import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../Auth';

import AccumulationSurvey from './SurveySubsections/AccumulationSurvey';
import MicroDebrisSurvey from './SurveySubsections/MicroDebrisSurvey';
import SurfaceRibScan from './SurveySubsections/SurfaceRibScan';
import SurveyArea from './SurveySubsections/SurveyArea';
import TeamInformation from './SurveySubsections/TeamInformation';
import Totals from './FormSteps/Totals';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.url = '/surveys'
  }

  componentDidMount() {
    // check if user is authenticated (redirect if not)
    if(!this.auth.isAuthenticated()){
      window.alert('Please sign in to continue');
      window.location.replace('/');
    }

    // set entry user/email from auth0
    this.auth.getLoggedInProfile((err, profile) => {
      let entry =  this.state.entry;
      entry.user = profile.name;
      entry.email = profile.email;
      this.setState({ entry });
    });
  }

  render() {
      return(
        <div>
            <TeamInformation/>
            <SurveyArea/>
            <SurfaceRibScan/>
            <AccumulationSurvey/>
            <MicroDebrisSurvey/>
            <Totals/>
        </div>
      );
  }
}

export default SurveyForm;
