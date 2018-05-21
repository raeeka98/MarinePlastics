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
      <div>
        <img height="100px" width="100px" src={ profile.picture } alt="profile" />
        <div>{ profile.name }</div>
        <div>{ profile.nickname }</div>
      </div>
    );
  }
}

export default UserProfile;
