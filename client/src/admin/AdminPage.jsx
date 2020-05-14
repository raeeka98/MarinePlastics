import React, { Component } from 'react';
import axios from 'axios';
import ProfileViewer from './ProfileViewer'
import AdminListChild from './AdminListChild'
import './adminPage.css';

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            currFoundUser: null,
            searchEmail: '',
            searched: false,
            loading: false,
            admins: null
        };

    }

    emailChange = e => {
        this.setState({ searchEmail: e.target.value });
    }

    searchEmail = (e, email) => {
        //Search for email in auth0 database
        e.preventDefault();
        this.setState({ loading: true, searched: true, currFoundUser: null }, () => {
            let token = this.state.auth.getAccessToken();
            let searchEmail = email || this.state.searchEmail;
            axios.get("/auth/find", {
                params: {
                    e: searchEmail
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(({ data }) => {
                    if (data.found) {
                        this.setState({ currFoundUser: data.user, loading: false });
                    } else {
                        this.setState({ loading: false });
                    }
                })
                .catch(err => {
                    this.setState({ loading: false });
                })
        })

    }

    searchBtn = () => {
        let correctEmail = this.state.searchEmail.length > 0 && /.+@.+\..+/.test(this.state.searchEmail);
        let { loading } = this.state;
        if (loading) {
            return (
                <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" disabled>Search</button>
            );
        }
        return (
            correctEmail
                ? <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" >Search</button>
                : <button className="uk-button uk-button-default uk-button-primary uk-margin-small-top" type="submit" disabled>Search</button>
        )
    }

    givePrivBtn = (roles) => {
        let hasAdminRole = false;
        for (const role of roles) {
            if (role.id === "rol_TeEKH4d1DDLAbCVT") {
                hasAdminRole = true;
            }
        }
        return hasAdminRole
            ? <span>
                <button onClick={this.removePriv} className="uk-button uk-button-default uk-button-danger uk-margin-small-top">Remove Admin Privileges</button>
            </span>
            : <button onClick={this.givePriv} className="uk-button uk-button-default uk-button-primary uk-margin-small-top">Give Admin Privileges</button>

    }


    viewProfBtn = (e, email) => {
        this.searchEmail(e, email);
    }

    viewProfile = () => {
        let { currFoundUser: profile, loading } = this.state;
        if (!this.state.searched) {
            return (
                <React.Fragment>
                    <div>Search for a profile by email</div>
                </React.Fragment>
            );
        }
        if (profile && !loading) {
            return (
                <React.Fragment>
                    <ProfileViewer profile={profile} />
                    {this.givePrivBtn(profile.roles)}
                </React.Fragment>
            );
        } else if (!profile && !loading) {
            return (
                <div><b>NO PROFILE FOUND</b></div>
            )
        } else {
            return (
                <div><b>LOADING PROFILE</b></div>
            )
        }
    }

    givePriv = () => {
        //give currFoundUser admin editing/deleting access
        let { currFoundUser: user } = this.state;
        if (user) {
            let token = this.state.auth.getAccessToken();

            axios.put(`/auth/setRole/${user.user_id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(({ data }) => {
                    if (data.res === "success") {
                        user.roles = [{ id: data.role_id }];
                        let newAdminList = [...this.state.admins, this.state.currFoundUser];
                        this.setState({ currFoundUser: user, admins: newAdminList });
                    }
                })
        }
    }


    removePriv = (e, id) => {
        //remove currFoundUser admin editing/deleting access

        let { currFoundUser: user } = this.state;

        let token = this.state.auth.getAccessToken();
        let userID = id || user.user_id;

        axios.delete(`/auth/setRole/${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(({ data }) => {
                if (data.res === "success") {
                    if (user) {
                        user.roles = [];
                        this.setState({ currFoundUser: user }, () => {
                            this.getAllAdmins();
                        })
                    }
                }
            });


    }

    getAllAdmins = () => {
        //get all current admins
        let token = this.state.auth.getAccessToken();

        axios.get("/auth/getAdmins", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(({ data }) => {
                this.setState({ admins: data });

            })
    }

    adminViewer = () => {
        let { admins } = this.state;
        if (!admins) {
            return (
                <b>OBTAINING ADMINS</b>
            )
        }
        return admins.map(user => {
            if (user.name === "Marine Plastics") { return null }
            return (
                <AdminListChild key={user.user_id} profile={user} removePriv={this.removePriv} viewProf={this.viewProfBtn} />
            )
        })
    }

    componentDidMount() {
        this.getAllAdmins();
    }

    render() {
        return (
            <div className=" uk-container uk-container-center">
                <div className=" searchBlock uk-margin">
                    <form method="post" onSubmit={this.searchEmail}>
                        <div>
                            <label> Please provide email address of profile
                                {!this.state.loading ?
                                    <input className="uk-input" type="email" name="emailAddr" id="addr" value={this.state.searchEmail} onChange={this.emailChange} />
                                    : <input disabled className="uk-input" type="email" name="emailAddr" id="addr" value={this.state.searchEmail} />
                                }
                            </label>
                            {this.searchBtn()}
                        </div>
                    </form>
                </div>
                <div className="profileBlock">
                    {this.viewProfile()}
                </div>
                <div className="adminList">
                    <span>Current Admins</span>
                    <div className="list">
                        {this.adminViewer()}
                    </div>
                </div>
            </div>

        );
    }

}

export default AdminPage;