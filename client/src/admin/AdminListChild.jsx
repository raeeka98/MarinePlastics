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

    removePriv = e => {
        this.props.removePriv(e, this.state.userID);
    }

    viewProf = e => {
        this.props.viewProf(e, this.state.email);
    }

    render() {
        let { email, pic, name } = this.state;
        return (
            <div onClick={this.viewProf}> <img style={imgStyle} src={pic} alt="prof" /> {name} <b>{email}</b>
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
