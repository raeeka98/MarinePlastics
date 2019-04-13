import React, { Component } from 'react';
import axios from 'axios';

export default class GoogleLogin extends Component {
    constructor(){
        super();
        this.onClickLogin = this.onClickLogin.bind(this);
    }

    onClickLogin() {
        let userID = this.props.userProfile.sub.split('|')[1]
        axios.post(`/login/${userID}`)
            .then((res) => {
                console.log(res);
            })
    }
    render() {
        console.log(this.props.userProfile)
        return (
        <div>
            <button onClick={this.onClickLogin}>Login</button>
        </div>
            
        )
    }
}