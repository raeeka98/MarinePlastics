/**
 * UserProfile.jsx
 * Code for the profile page. Shows image for user, user's email, and a button
 * to log out.
 */
import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      profile: {}
    };

    this.url = '/beaches';
  }

  /**
   * Creates profile page.
   * @return rendered react component for profile page
   */
  render() {
    console.log(this.props.userProfile);
    let { userProfile: profile } = this.props;
    if (!profile) return null;
    return (
      <div className="uk-card uk-card-default uk-width-1-4 uk-align-center">
        <div className="uk-card-header uk-align-center">
          <img
            className="uk-border-circle uk-padding-remove uk-align-center"
            width="100"
            height="100"
            src={profile.picture}
            alt=""
          />
          <h2
            className=
            "uk-card-title
            uk-padding-remove
            uk-margin-remove-bottom
            uk-text-center"
          >
            {profile.name}
          </h2>
          <button
            onClick={this.props.auth.logout}
            className=
            "uk-align-center
            uk-padding-remove-top
            uk-button-small
            uk-button-primary"
          >
            Log Out
          </button>
        </div>
        <div className="uk-card-body">
          <p>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
      </div>
    );
  }
}

export default UserProfile;