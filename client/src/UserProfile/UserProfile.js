import React, { Component } from 'react';
import axios from 'axios';


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.userProfile,
      data: [],
    }

    this.loadSubmittedSurveys = this.loadSubmittedSurveys.bind(this);
    this.addUserEntries = this.addUserEntries.bind(this);
    this.renderCleanupDates = this.renderCleanupDates.bind(this);
    this.url = '/login';
  }

  loadSubmittedSurveys() {
    //console.log(this.state.profile)

    let userID = this.props.userProfile.sub ? this.props.userProfile.sub.split("|")[1] : "";
    axios.get(this.url + `/${userID}`)
      .then(res => {
        this.setState({ data: res.data });
        console.log(res.data)
      });
  }

  addUserEntries(data) {
    let root = document.getElementById('user-entries');
    let newHTML = "Cleanups";
      for (let j= 0; j < data.survSub.length; j++) {
        newHTML += ("<li><a href='/entry/" + data[j] + "'/>" + data[j] +"</a></li>");
      }

    root.innerHTML = newHTML;
  }

  renderCleanupDates() {
    const {data} = this.state;
    console.log(data)
    const {survSub} = data;
    if(!survSub){
      console.log("Not rendering");
      return
    }
    var surveyDates = [];
    console.log("Rendering...");
    for(var i = 0; i < survSub.length; i++){
      surveyDates.push(
        <li>{survSub[i]}</li>
      )
    }
    return surveyDates;
  }

  // returns profile from auth0 when component loads
  componentWillMount() {
    
    this.loadSubmittedSurveys();
  }

  componentDidMount() {
  }

  render() {
    const { profile } = this.state;
    console.log(profile)
    return (
      <div className="uk-card uk-card-default uk-width-1-4 uk-align-center">
        <div className="uk-card-header uk-align-center">
          <img className="uk-border-circle uk-padding-remove uk-align-center" width="100" height="100" src={ profile.picture } alt="" />
          <h2 className="uk-card-title uk-padding-remove uk-margin-remove-bottom uk-text-center">{ profile.name }</h2>
          <button onClick={ this.props.auth.logout } className= "uk-align-center uk-padding-remove-top uk-button-small uk-button-primary">Log Out</button>
        </div>
        <div className="uk-card-body">
            <p>Email: <a href={`mailto:${ profile.email }`}>{ profile.email }</a></p>
            <p>Cleanups:</p>
            <ul>
              {this.renderCleanupDates()}
            </ul>
        </div>
      </div>
    );
  }
}

export default UserProfile;

