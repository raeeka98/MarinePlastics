import React, { Component } from 'react';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    }
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
