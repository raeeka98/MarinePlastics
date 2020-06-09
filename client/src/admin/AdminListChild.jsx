/**
 * AdminListChild.jsx
 * Shows on the admin page one entry in a list of current admins. Admins can
 * remove admin privileges.
 */
import React, { Component } from 'react';
import './adminPage.css';

export default class AdminListChild extends Component {
  constructor(props) {
    let { profile } = props;
    super(props);
    this.state = {
      email: profile.email,
      userID: profile.user_id,
      pic: profile.picture,
      name: profile.name
    }
  }

  /**
   * Calls removePriv(e, id) from AdminPage.jsx.
   * @param {any} e
   */
  removePriv = e => {
    this.props.removePriv(e, this.state.userID);
  }

  /**
   * Calls viewProfBtn(e, email) from AdminPage.jsx.
   * @param {any} e
   */
  viewProf = e => {
    this.props.viewProf(e, this.state.email);
  }

  /**
   * Shows picture of a user, along with their name, email, and two buttons to
   * either remove their privileges or view their full profile.
   * @return JSX code
   */
  render() {
    let { email, pic, name } = this.state;
    return (
      <div> <img style={imgStyle} src={pic} alt="prof" /> {name} <b>{email}</b>
        <button className="profBtn" onClick={this.viewProf} >
          View Profile
        </button>
        <button className="removeBtn" onClick={this.removePriv}>Remove</button>
      </div>
    );
  }
}

let imgStyle = {
  width: "5%",
  height: "5%",
  borderRadius: "50%"
}
