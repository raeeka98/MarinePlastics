// The main component of the project
// All of the routing/handling of different pages happens here

import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Auth from './Auth';

import Landing from './Landing/Landing';
import Home from './Home/Home';
import SurveyEntry from './SurveyEntry/SurveyEntry';
import SurveyForm from './NewSurveyForm/SurveyForm'

import UserProfile from './UserProfile/UserProfile';
import Protocol from './Protocol/Protocol';
import Map from './Map/Map.js';
import ChooseForm from './SurveyForm/ChooseForm';
import LocationPage from './Location/Location';
import PageNotFound from './PageNotFound/PageNotFound';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import './App.css';

class App extends Component {
  constructor() {
    require('dotenv').config()
    super();
    // creates a new authentication object, which can be passed to other components
    this.auth = new Auth();
    this.state = {error: ""};
  }

  componentDidMount() {
    // checks if the user is logged in or not (see Auth.js for the function)
    this.auth.handleAuthentication(error=>{
      this.setState({error});
    });

    if(this.auth.isAuthenticated()){
      this.auth.getLoggedInProfile((err, profile) => {
        this.setState({userProfile: profile});
      });

    } else {
      this.setState({userProfile: null});
    }

  }

  render() {
    let headerRoutes = ['/home', '/survey', '/newsurvey', '/location/:beachID', '/:beachName/:surveyID', '/profile', '/protocol', '/map', '/chooseform'];

    return (
      <div>
        {/* type of router that has history (can go back and forth in broswer history and still have states from before) */}
        <BrowserRouter>


          <div className="uk-container-expand uk-container-center">

            {/* pages listed in headerRoutes array are rendered with the Header*/}
            <Route path={headerRoutes} render={() => ( <Header auth={this.auth} /> )} />


            <div>
              {/* routes: when the user goes to a specified url, loads corresponding component */}
              {/* if passing information (i.e. authentication) to the component, need to use render argument */}
              <Switch>
                <Route exact path='/' render={() => (<Landing auth={this.auth} isAuth={this.state.error} disableError={()=>{this.setState({error: null})}}/>)} />
                <Route exact path='/home' render={() =>  <Home  userProfile={this.state.userProfile}/>} />

                <Route path='/survey' component={SurveyForm} />

                <Route path='/location/:beachID' component={LocationPage} />
                <Route path='/:beachName/:surveyID' component={SurveyEntry} />
                {/* for the profile page: if user is logged in, load the userprofile component. otherwise redirect to landing page */}
                <Route
                  path='/profile'
                  render={() => (
                    !this.auth.isAuthenticated()
                    ? <Redirect to='/' />
                    : <UserProfile auth={ this.auth } />
                  )}
                />
                <Route exact path='/protocol' component={ Protocol } />
                <Route path='/map' render={() => <Map userProfile={this.state.userProfile} />}/>
                <Route path='/chooseform' component={ ChooseForm } />

                <Route component={ PageNotFound } />
              </Switch>
            </div>

            {/* Render the footer if you're not on the Landing Page*/}
            <Route path={headerRoutes} component={Footer} />

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
