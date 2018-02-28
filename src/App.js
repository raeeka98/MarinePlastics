import React, { Component } from 'react';
import Header from './Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import SurveyBox from './Survey/SurveyBox';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route 
              exact path='/' 
              component={ 
                () => <SurveyBox url='http://localhost:3001/api/comments' pollInterval={2000}/>
              }
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
