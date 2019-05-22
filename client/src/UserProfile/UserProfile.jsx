import React, { Component } from 'react';
import axios from 'axios';


class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      profile: {}
    }

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.addUserEntries = this.addUserEntries.bind(this);
    this.url = '/beaches';
  }

  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
        this.setState({ data: res.data });
      });
  }

  addUserEntries(data) {
    let root = document.getElementById('user-entries');
    let newHTML = "";
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].entries.length; j++) {
        newHTML += ("<li><a href='/entry/" + data[i].entries[j]._id + "'/>" + data[i].entries[j].date + "</a></li>");
      }
    }
    root.innerHTML = newHTML;
  }

  // returns profile from auth0 when component loads


  componentDidMount() {
    // this.loadCommentsFromServer();
  }

  render() {
    console.log(this.props.userProfile);
    let { userProfile: profile } = this.props;
    if (!profile) return null;
    return (

      <div className="uk-card uk-card-default uk-width-1-4 uk-align-center">
        <div className="uk-card-header uk-align-center">
          <img className="uk-border-circle uk-padding-remove uk-align-center" width="100" height="100" src={profile.picture} alt="" />
          <h2 className="uk-card-title uk-padding-remove uk-margin-remove-bottom uk-text-center">{profile.name}</h2>
          <button onClick={this.props.auth.logout} className="uk-align-center uk-padding-remove-top uk-button-small uk-button-primary">Log Out</button>
        </div>
        <div className="uk-card-body">
          <p>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
      </div>
    );
  }
}

export default UserProfile;

