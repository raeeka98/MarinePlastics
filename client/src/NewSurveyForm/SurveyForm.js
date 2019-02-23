import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../Auth';

import AccumulationSurvey from './SurveySubsections/AccumulationSurvey';
import MicroDebrisSurvey from './SurveySubsections/MicroDebrisSurvey';
import SurfaceRibScan from './SurveySubsections/SurfaceRibScan';
import SurveyArea from './SurveySubsections/SurveyArea';
import TeamInformation from './SurveySubsections/TeamInformation';
import Totals from './SurveySubsections/Totals';

import {
    Accordion,
} from 'react-accessible-accordion';

import './accordion-styles.css';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.url = '/surveys'
    this.state =
    {
      entry: {
        user: '',
        email: '',
        input_date: '',
        org: '',
        date: '',
        beach: '',
        reason: 'proximity',
        st: 'sand',
        lat: '',
        lon: '' ,
        slope: 'steep',
        nroName: '',
        nroDist: '',
        nroFlow: '',
        nroOut: '',
        aspect: '',
        weather: '',
        lastTide: { type: 'low' },
        nextTide: { type: 'low' },
        windDir: '',
        windSpeed: '',
        majorUse: 'recreation',
        weight: '',
        NumberOfPeople: '',
        SRSTotal: '',
        SRSData: [],
        ASTotal: '',
        ASData: [],
        surveyArea: '',
      },
    }
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
            <Accordion>
                <TeamInformation/>
                <SurveyArea/>
                <SurfaceRibScan/>
                <AccumulationSurvey/>
                <Totals/>
            </Accordion>
        </div>
      );
  }
}

export default SurveyForm;
