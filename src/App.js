import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Auth from './Auth';
import SurveyBox from './Survey/SurveyBox';
import Survey from './Survey/SurveyForm';
import UserProfile from './UserProfile/UserProfile';
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
            <div className="uk-grid">
              <Route 
                exact path='/' 
                component={ 
                  () => <SurveyBox 
                          url='http://localhost:3001/api/comments'
                          pollInterval={2000}
                        />
                }
              />
              <Route
                path='/survey'
                component={Survey}
              />
              <Route
                path='/profile'
                render={() => (
                  !this.auth.isAuthenticated()
                  ? <Redirect to="/" />
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
