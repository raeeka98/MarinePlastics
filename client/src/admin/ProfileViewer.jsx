/**
 * ProfileViewer.jsx
 * Shows full profile of user on admin page when admin searches a user by
 * email.
 */
import React from 'react';

/**
 * JSX code to show the full profile of a user, if it has been searched.
 * Otherwise, explains that the current searched user doesn't have a profile.
 * @param {any} profile
 * @return JSX code for profile
 */
const showProfileInfo = profile => {
  if (!profile) {
    return (<div>No profile please search for another</div>);
  }
  console.log(profile);
    
  let date = new Date(profile.last_login);
  return (
    <React.Fragment>
      <img
        src={profile.picture}
        alt="profile"
        className="profImg uk-border-circle uk-align-center"
      />
      <div>Email: <span>{profile.email}</span></div>
      <div>Full name: <span>{profile.name}</span></div>
      <div>Last logged In: <span>{date.toString()} </span></div>
    </React.Fragment>
  );
}

/**
 * JSX code to render showProfileInfo(profile)
 * @param {any} props
 * @return JSX code
 */
const ProfileViewer = props => {
  let { profile } = props;
  return (
    <React.Fragment>
      {showProfileInfo(profile)}
    </React.Fragment>
  );
}

export default ProfileViewer;