import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Auth from './Auth';

import Landing from './Landing/Landing';
import SurveyList from './Survey/SurveyList';
import SurveyEntry from './Survey/Survey';
import Steps from './Survey/SurveyForm/SurveyForm';
import UserProfile from './UserProfile/UserProfile';
import Protocol from './Protocol/Protocol';
import Map from './Map/Map.js';

import Header from './Header/Header';
import Footer from './Footer/Footer';



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
            <div>
              <Route 
                exact path='/' 
                render={ () => (
                  <Landing auth={ this.auth } />
                 )}
              />
              <Route 
                exact path='/home' 
                component={ SurveyList }
              />
              <Route 
                path='/survey' 
                component={ Steps }
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
                  : <UserProfile auth={ this.auth } />
                )}
              />
              <Route 
                exact path='/protocol' 
                component={ Protocol }
              />
              <Route
                path='/map'
                component={Map}
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
