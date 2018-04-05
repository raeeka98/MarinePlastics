import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import axios from 'axios';

import Auth from '../../Auth';

import FormStep1 from './FormSteps/FormStep1';
import FormStep2 from './FormSteps/FormStep2';
import FormStep3 from './FormSteps/FormStep3';
import FormStep5 from './FormSteps/FormStep5';
import SubmitConfirm from './FormSteps/SubmitConfirm';

import '../Style.css';
// Validation for the survey form
// submitting on the next step

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    // temp - need to fix this if want to update to populate elements with original values
    // if (this.props.location !== undefined && this.props.location.state !== undefined  ) {
    //   this.state = this.props.location.state.initialValues;
    // } else {
      this.state = {
        user: '',
        email: '',
        input_date: '',
        org: '',
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
        weight: '',
        NumberOfPeople: '',
        SRSTotal: '',
        SRSData: [],
        // SRSData: {
        //   FreshCig: '',
        //   WeatheredCig: '',
        //   FreshFline: '',
        //   WeatheredFline: '',
        //   FreshGlass: '',
        //   WeatheredGlass: '',
        //   FreshPaper: '',
        //   WeatheredPaper: '',
        //   FreshFplastic: '',
        //   WeatheredFplastic: '',
        //   FreshMiscPlastic: '',
        //   WeatheredMiscPlastic: '',
        //   FreshPlasticBottle: '',
        //   WeatheredPlasticBottle: '',
        //   FreshPlasticCap: '',
        //   WeatheredPlasticCap: '',
        //   FreshStyrofoam: '',
        //   WeatheredStyrofoam: '',
        //   FreshWood: '',
        //   WeatheredWood: '',
        //   FreshUrethaneFoam: '',
        //   WeatheredUrethaneFoam: '',
        //   FreshPlasticCup: '',
        //   WeatheredPlasticCup: '',
        //   FreshPlasticStraw: '',
        //   WeatheredPlasticStraw: '',
        //   FreshCottonCloth: '',
        //   WeatheredCottonCloth: '',
        //   FreshPolyRope: '',
        //   WeatheredPolyRope: '',
        //   FreshAlumCan: '',
        //   WeatheredAlumCan: '',
        //   FreshHygItems: '',
        //   WeatheredHygItems: '',
        //   FreshMetal: '',
        //   WeatheredMetal: '',
        //   FreshTileBrick: '',
        //   WeatheredTileBrick: '',
        // },
        ASTotal: '',
        ASData: [],
        // ASData: {
        //   FreshCig: '',
        //   WeatheredCig: '',
        //   FreshFline: '',
        //   WeatheredFline: '',
        //   FreshGlass: '',
        //   WeatheredGlass: '',
        //   FreshPaper: '',
        //   WeatheredPaper: '',
        //   FreshFplastic: '',
        //   WeatheredFplastic: '',
        //   FreshMiscPlastic: '',
        //   WeatheredMiscPlastic: '',
        //   FreshPlasticBottle: '',
        //   WeatheredPlasticBottle: '',
        //   FreshPlasticCap: '',
        //   WeatheredPlasticCap: '',
        //   FreshStyrofoam: '',
        //   WeatheredStyrofoam: '',
        //   FreshWood: '',
        //   WeatheredWood: '',
        //   FreshUrethaneFoam: '',
        //   WeatheredUrethaneFoam: '',
        //   FreshPlasticCup: '',
        //   WeatheredPlasticCup: '',
        //   FreshPlasticStraw: '',
        //   WeatheredPlasticStraw: '',
        //   FreshCottonCloth: '',
        //   WeatheredCottonCloth: '',
        //   FreshPolyRope: '',
        //   WeatheredPolyRope: '',
        //   FreshAlumCan: '',
        //   WeatheredAlumCan: '',
        //   FreshHygItems: '',
        //   WeatheredHygItems: '',
        //   FreshMetal: '',
        //   WeatheredMetal: '',
        //   FreshTileBrick: '',
        //   WeatheredTileBrick: '',
        // }
      }
    // }

    this.handleServerSubmit = this.handleServerSubmit.bind(this);
    this.handleServerUpdate = this.handleServerUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.auth = new Auth();
    this.pollInterval = null;
    this.url = 'http://localhost:3001/api/comments';
  }

  handleInputChange(e) {
    if (e.target.getAttribute('class').includes('srs')) {
      let SRSData = this.state.SRSData;

      let filteredData = SRSData.filter( el => el.name === e.target.id);
      if (filteredData.length > 0) {
        filteredData[0]['fresh'] = 0;
        filteredData[0]['weathered'] = 0;
      } else {
        SRSData.push({
          name: e.target.id,
          fresh: e.target.value,
          weathered: e.target.value,
        });
      }
      // SRSData[e.target.id] = e.target.value;
      this.setState({ SRSData });
      console.log(this.state.SRSData);
    } else if (e.target.getAttribute('class').includes('as')) {
      // let ASData = this.state.ASData;
      // ASData[e.target.id] = e.target.value;
      // this.setState({ ASData });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  handleServerSubmit(comment) {
    comment.input_date = Date.now();
    console.log('server submit', comment);
    axios.post(this.url, comment)
      .catch(err => { console.error(err); });
  }

  handleServerUpdate(id, comment) {
    //sends the comment id and new beach/reason to our api
    axios.put(`${this.url}/${id}`, comment)
      .catch(err => {
        console.log(err);
      })
  }

  handleFormSubmit(e) {
    if (this.auth.isAuthenticated()) {
      if (this.props.location.state !== undefined) {
        this.handleServerUpdate(this.props.location.state.initialValues._id, this.state);
      } else {
        this.handleServerSubmit(this.state);
      }
    } else {
      window.alert('Please sign in to enter survey data.');
    }
  }

  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    }

    this.auth.getLoggedInProfile((err, profile) => {
      this.setState({
        user: profile.name,
        email: profile.email,
      });
    });
  }

  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    const steps = [
      {
        name:'Clean Up Information',
        component:
          <FormStep1
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Survey Area',
        component:
          <FormStep2
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Surface Rib Scan',
        component:
          <FormStep3
            title={ 'Surface Rib Scan' }
            class={ 'srs' }
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Accumulation Survey',
        component:
          <FormStep3
            title={ 'Accumulation Survey' }
            class={ 'as' }
            handleInputChange={ this.handleInputChange }
          />
      }, {
        name: 'Basic Cleanup',
        component:
          <FormStep5
            handleInputChange={ this.handleInputChange }
          />
       }, {
        name: 'Done!',
        component: <SubmitConfirm />
      }
    ]
    return (
      <div className='step-progress'>
        <StepZilla
          onStepChange={
            (step) => { if (step === 5) this.handleFormSubmit(); }
          }
          steps={steps}
          showSteps={true}
          prevBtnOnLastStep={true}
          showNavigation={true}
        />
      </div>
    );
  }
}

export default SurveyForm;
