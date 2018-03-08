import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Auth from './Auth';
import SurveyList from './Survey/SurveyList';
import SurveyEntry from './Survey/Survey';
import SurveyForm1 from './Survey/SurveyForm1';
import SurveyForm2 from './Survey/SurveyForm2';
import UserProfile from './UserProfile/UserProfile';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Steps from './Survey/Steps.js';
import Map from './Map/Map.js';



class App extends Component {
  constructor() {
    super();
    this.auth = new Auth();
  }

  componentDidMount() {
    this.auth.handleAuthentication();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="uk-container uk-container-center">
            <Header
              auth={this.auth}
            />
            <div className="uk-grid">
              <Route
                exact path='/'
                component={ SurveyList }
              />
              <Route
                path='/survey'
                component={Steps}
              />
              <Route
                path='/map'
                component={Map}
              />
              <Route
                path='/entry/:entryKey'
                component={ SurveyEntry }
              />
              <Route
                path='/profile'
                render={() => (
                  !this.auth.isAuthenticated()
                  ? <Redirect to='/' />
                  : <UserProfile auth={this.auth} />
                )}
              />
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
