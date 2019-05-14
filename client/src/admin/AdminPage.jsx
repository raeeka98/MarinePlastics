import React, { Component } from 'react';
import axios from 'axios';
import './adminPage.css';

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            currentFoundUser: null,
            searchEmail: ''
        };

    }

    emailChange = (e) => {
        this.setState({ searchEmail: e.target.value });
    }

    searchEmail = () => {
        console.log(this.state.auth.getAccessToken());
        let token = this.state.auth.getAccessToken();

        axios.get("/auth/find", {
            params: {
                e: this.state.searchEmail
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    button = () => {
        return (
            this.state.searchEmail.length > 0 && this.state.searchEmail.includes('@')
                ? <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" onClick={this.searchEmail}>Search</button>
                : <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" onClick={this.searchEmail} disabled>Search</button>
        )
    }

    render() {
        // axios.get("/auth/getAdmins", {
        // headers: {
        // Authorization: `Bearer ${this.props.auth.getAccessToken()}`
        // }
        // })
        return (
            <div className=" uk-container uk-container-center">
                <div className=" searchBlock uk-margin">
                    <label htmlFor="email">Search for user by email</label>
                    <div className="emailInput">
                        <input placeholder="email@example.com" className="uk-input" type="email" name="emailAddr" id="addr" value={this.state.searchEmail} onChange={this.emailChange} />
                        {this.button()}
                    </div>
                </div>
            </div>
        );
    }

}

export default AdminPage;