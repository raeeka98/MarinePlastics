import React from 'react';

const showProfileInfo = profile => {
    if (!profile) {
        return (<div>No profile</div>);
    }
    return (
        <React.Fragment>
            <img src={profile.picture} alt="profile" className="uk-border-circle uk-padding-remove uk-align-center" />
            <div>{profile.email}</div>
            <div>{profile.name}</div>
            <div>{profile.last_login}</div>
        </React.Fragment>
    );
}

const ProfileViewer = props => {
    let { profile } = props;
    return (
        <React.Fragment>
            {showProfileInfo(profile)}
        </React.Fragment>
    );
}

export default ProfileViewer;