// The main component of the project
// All of the routing/handling of different pages happens here

import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Auth from './Auth';

import Landing from './Landing/Landing';
import Home from './Home/Home';
import SurveyEntry from './SurveyEntry/SurveyEntry';
import Steps from './SurveyForm/SurveyForm';
import UserProfile from './UserProfile/UserProfile';
import Protocol from './Protocol/Protocol';
import Map from './Map/Map.js';
import ChooseForm from './SurveyForm/ChooseForm';
import LocationPage from './Location/Location';

import Header from './Header/Header';
import Footer from './Footer/Footer';


class App extends Component {
  constructor() {
    require('dotenv').config()
    super();
    // creates a new authentication object, which can be passed to other components
    this.auth = new Auth();
  }

  componentDidMount() {
    // checks if the user is logged in or not (see Auth.js for the function)
    this.auth.handleAuthentication();
  }

  render() {
    return (
      <div>
        {/* type of router that has history (can go back and forth in broswer history and still have states from before) */}
        <BrowserRouter>
          <div className="uk-container uk-container-center">
            {/* every page has header/footer, only content within div changes*/}
            <Header auth={this.auth} />
            <div>
              {/* routes: when the user goes to a specified url, loads corresponding component */}
              {/* if passing information (i.e. authentication) to the component, need to use render argument */}
              <Route exact path='/' render={ () => (<Landing auth={ this.auth } />) } />
              <Route exact path='/home' component={ Home } />
              <Route path='/survey' component={ Steps } />
              <Route path='/entry/:entryKey' component={ SurveyEntry } />
              <Route path='/location/:id' component={ LocationPage } />
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
              <Route path='/map' component={ Map } />
              <Route path='/chooseform' component={ ChooseForm } />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
