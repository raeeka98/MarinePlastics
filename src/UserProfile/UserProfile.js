import React, { Component } from 'react';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    }
  }

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
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
        <h1>{profile.name}</h1>
        <h3>{profile.nickname}</h3>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  }
}

export default UserProfile;
