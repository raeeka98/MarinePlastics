/**
 * App.jsx
 * The main component of the project. All of the routing/handling of different
 * pages happens here.
 */
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Auth from './Auth';

import Landing from './Landing/Landing';
import Home from './Home/Home';
import SurveyEntry from './SurveyEntry/SurveyEntry';
import SurveyForm from './NewSurveyForm/SurveyForm';

import UserProfile from './UserProfile/UserProfile';
import Protocol from './Protocol/Protocol';
import About from './About/About';
import Map from './Map/Map.js';
import LocationPage from './Location/Location';
import PageNotFound from './PageNotFound/PageNotFound';
import SurveyEntryEdit from "./SurveyEntry/surveyEntryEdit";
import AdminPage from "./admin/AdminPage";

import Header from './Header/Header';
import Footer from './Footer/Footer';

import './App.css';

class App extends Component {
  constructor() {
    require('dotenv').config();
    super();
    // creates new authentication object, which is passed to other components
    this.auth = new Auth();
    this.state = { error: "" };
  }

  /**
   * When component mounts, checks if the user is logged in or not (see Auth.js
   * for the function).
   */
  componentDidMount() {
    console.log(this.auth.isAuthenticated());

    this.auth.handleAuthentication()
      .then(() => {
        if (this.auth.isAuthenticated()) {
          this.auth.getLoggedInProfile()
            .then(prof => {
              this.setState({ userProfile: prof });
            })
        } else {
          this.setState({ userProfile: null });
        }
      })
      .catch(err => {
        this.setState({ err });

      })
  }

  /**
   * Creates route for accessing each page in website using links.
   * @return rendered react component to set up router
   */
  render() {
    let headerRoutes = [
      '/home',
      '/survey',
      '/newsurvey',
      '/location/:beachID',
      '/:beachName/:surveyID',
      '/profile',
      '/protocol',
      '/about',
      '/map'
    ];

    return (
      <div>
        {/* has history (can remember states from before) */}
        <BrowserRouter>
          <div className="uk-container-expand uk-container-center">
            {/* pages listed in headerRoutes are rendered with the Header*/}
            <Route
              path={headerRoutes}
              render={() => (<Header auth={this.auth} />)}
            />

            <div>
              {/* routes: when user goes to url, loads component */}
              {/* if passing information use render argument */}
              <Switch>
                <Route
                  exact path='/'
                  render={() => (
                    <Landing
                      auth={this.auth}
                      isAuth={this.state.error}
                      disableError={() => { this.setState({ error: null }) }}
                    />)}
                />
                <Route
                  exact path='/home'
                  render={() =>
                    <Home
                      auth={this.auth}
                      userProfile={this.state.userProfile}
                    />}
                />

                {/* for testing new component: */}
                <Route
                  path='/survey'
                  render={props =>
                    <SurveyForm
                      {...props}
                      auth={this.auth}
                    />}
                />
                <Route
                  path='/location/:beachID'
                  render={props =>
                    <LocationPage
                      {...props}
                      auth={this.auth}
                    />}
                  auth={this.auth}
                />
                <Route
                  path="/:beachName/:surveyID/edit"
                  render={props =>
                    <SurveyEntryEdit
                      {...props}
                      auth={this.auth}
                    />}
                />
                <Route
                  path='/:beachName/:surveyID'
                  render={props => (
                    <SurveyEntry
                      {...props}
                      auth={this.auth}
                    />)}
                />
                {/* if logged in, load userprofile, else go to landing page */}
                <Route
                  path='/profile'
                  render={() => (
                    !this.auth.isAuthenticated()
                      ? <Redirect to='/home' />
                      :
                      <UserProfile
                        auth={this.auth}
                        userProfile={this.state.userProfile}
                      />
                  )}
                />
                <Route path='/adminPage' render={() => (
                  <AdminPage auth={this.auth} />
                )} />
                <Route exact path='/protocol' component={Protocol} />
                <Route exact path='/about' component={About} />
                <Route
                  path='/map'
                  render={() =>
                    <Map
                      userProfile={this.state.userProfile}
                    />}
                />

                <Route exact path='/about' component={About} />

                <Route component={PageNotFound} />
              </Switch>
            </div>

            {/* render the footer if you're not on the Landing Page*/}
            <Route path={headerRoutes} component={Footer} />

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
