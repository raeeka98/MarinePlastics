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

    emailChange = e => {
        this.setState({ searchEmail: e.target.value });
    }

    searchEmail = e => {
        e.preventDefault();
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
            this.state.searchEmail.length > 0 && /.+@.+\..+/.test(this.state.searchEmail)
                ? <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" >Search</button>
                : <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" disabled>Search</button>
        )
    }

    render() {
        return (
            <div className=" uk-container uk-container-center">
                <div className=" searchBlock uk-margin">
                    <form method="post" onSubmit={this.searchEmail}>
                        <div>
                            <input className="uk-input" type="email" name="emailAddr" id="addr" value={this.state.searchEmail} onChange={this.emailChange} />
                            {this.button()}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default AdminPage;