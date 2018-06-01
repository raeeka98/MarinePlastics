import React, { Component } from 'react';
import axios from 'axios';

import { userFind } from '../_helpers/SortHelper';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      entries: []
    }
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
  }

  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
        res.data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.setState({ entries: res.data });
      });
  }

  // returns profile from auth0 when component loads
  componentWillMount() {
    const { userProfile, getLoggedInProfile } = this.props.auth;
    if (!userProfile) {
      getLoggedInProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  componentDidUpdate() {
    let entries = userFind(this.state.entries, this.state.profile.name);
    this.setState({ entries });
    // console.log(this.state);

    // if (this.state.profile.name) {
    //   console.log('name', this.state.profile.name)
    //   let entries = userFind(allEntries, this.state.profile.name);
    //   this.setState({ entries });
    //   console.log(entries);
    // }
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="uk-card uk-card-default uk-width-1-4 uk-align-center">
        <div className="uk-card-header uk-align-center">
          <img className="uk-border-circle uk-align-center" width="100" height="100" src={ profile.picture } role="presentation" />
          <h3 className="uk-card-title uk-margin-remove-bottom uk-text-center">{ profile.name }</h3>
        </div>
        <div className="uk-card-body">
            <p>Email: <a href={`mailto:${ profile.email }`}>{ profile.email }</a></p>
        </div>
      </div>
    );
  }
}

export default UserProfile;
