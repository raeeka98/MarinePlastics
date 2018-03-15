import React, { Component } from 'react';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    }
  }

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

      <div className="uk-table ">
        <thead>
          <tr>
            <th className="uk-width-small uk-heading-line" > <span className="uk-thumbnav"> <img src={profile.picture} alt="profile" /> </span></th>
          </tr>
          </thead>
            <tbody>
              <tr>
              <th className="uk-table-expand uk-heading-line"><span>{profile.name}</span></th>
              <th className="uk-heading-line uk-table-expand"><span>{profile.nickname}</span></th>
              <th className="uk-table-expand uk-heading-line"><span>Last Log In</span></th>
              <th className="uk-table-small uk-heading-line"></th>
            </tr>
            <tr>
            <th className="uk-table-expand uk-heading-line"><span></span></th>
            <th className="uk-heading-line uk-table-expand"><span></span></th>
            <th className="uk-table-expand uk-heading-line"><span>{profile.updated_at}</span></th>
            <th className="uk-table-small uk-heading-line"></th>
          </tr>
            </tbody>
      
      
        
      </div>
    );
  }
}

export default UserProfile;
