import React from 'react';

const showProfileInfo = profile => {
    if (!profile) {
        return (<div>No profile please search for another</div>);
    }
    console.log(profile);
    
    let date = new Date(profile.last_login);
    return (
        <React.Fragment>
            <img src={profile.picture} alt="profile" className="profImg uk-border-circle uk-align-center" />
            <div>Email: <span>{profile.email}</span></div>
            <div>Full name: <span>{profile.name}</span></div>
            <div>Last logged In: <span>{date.toString()} </span></div>
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