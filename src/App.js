import React, { Component } from 'react';
import Header from './Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './Auth';

import SurveyBox from './Survey/SurveyBox';

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
          <div>
            <Header 
              auth={this.auth}
            />
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
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
