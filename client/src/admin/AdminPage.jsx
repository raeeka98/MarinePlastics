import React, { Component } from 'react';
import axios from 'axios';
import ProfileViewer from './ProfileViewer'
import './adminPage.css';

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            currentFoundUser: null,
            searchEmail: '',
            searched: false,
            loading: false
        };

    }

    emailChange = e => {
        this.setState({ searchEmail: e.target.value });
    }

    searchEmail = e => {
        e.preventDefault();
        this.setState({ loading: true, searched: true }, () => {
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
                    this.setState({ currentFoundUser: res.data, loading: false });
                })
                .catch(err => {
                    this.setState({ loading: false });
                    console.log(err);
                })
        })

    }

    button = () => {
        return (
            this.state.searchEmail.length > 0 && /.+@.+\..+/.test(this.state.searchEmail)
                ? <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" >Search</button>
                : <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" disabled>Search</button>
        )
    }

    viewProfile = () => {
        if (!this.state.searched) {
            return (
                <React.Fragment>
                    <div>Search for a profile by email</div>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <ProfileViewer profile={this.state.currentFoundUser} />
                <div>
                    <button>Give Admin Priveleges?</button>
                </div>
            </React.Fragment>
        );

    }


    render() {
        return (
            <div className=" uk-container uk-container-center">
                <div className=" searchBlock uk-margin">
                    {!this.state.loading ? <form method="post" onSubmit={this.searchEmail}>
                        <div>
                            <input className="uk-input" type="email" name="emailAddr" id="addr" value={this.state.searchEmail} onChange={this.emailChange} />
                            {this.button()}
                        </div>
                    </form> : null}
                </div>
                <div className={`profileBlock ${this.state.searched ? "" : "firstSearch"}`}>
                    {this.viewProfile()}

                </div>
            </div>

        );
    }

}

export default AdminPage;