import auth0 from 'auth0-js';
import { resolve } from 'url';

/*redirectUri: 'https://marineplastics.herokuapp.com/home', for prod
redirectUri: 'http://localhost:3000/home', for dev*/
export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH_DOMAIN,
        clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
        redirectUri: process.env.REACT_APP_AUTH_LOGIN_REDIRECT_URI,
        responseType: 'token id_token',
        scope: 'openid email profile'
    });
    accessToken;
    idToken;
    expiresAt;

    userProfile;

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.getLoggedInProfile = this.getLoggedInProfile.bind(this);
    }

    async login () {
        await this.auth0.authorize();
    }
    handleAuthentication(fn) {
        return new Promise( (res,rej)=>{
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    res();
                    // window.location.replace('/home');
                } else if (err) {
                    rej(err.errorDescription);
                }
            });
        })
    }

    setSession(authResult) {
        // Set the time that the Access Token will expire at
        localStorage.setItem("isLoggedIn","true");
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.expiresAt = expiresAt;
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
    }

    getAccessToken() {
        return this.accessToken;
    }

    getProfile(token, cb) {
        this.auth0.client.userInfo(token, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    getLoggedInProfile(cb) {
        this.getProfile(this.getAccessToken(), cb);
    }

    logout() {
        // Clear Access Token and ID Token from local storage
        this.accessToken = null;
        this.idToken = false;
        this.expiresAt = 0;
        localStorage.removeItem("isLoggedIn");
        // navigate to the home route
        this.auth0.logout({
            return_to: window.location.origin
        });
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        // Added check to make sure localstorage is defined
        let expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
    }
}