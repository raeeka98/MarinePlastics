import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Auth from './Auth';
import SurveyBox from './Survey/SurveyBox';
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
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
