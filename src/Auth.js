import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'marine-plastics.auth0.com',
    clientID: 'MeGxwCE1JVNy9jsRYPWzqebekosCVRDN',
    redirectUri: 'http://localhost:3000',
    audience: 'https://marine-plastics.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid email profile'
  });

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

  login() {
    this.auth0.authorize();
    // want to redirect here but doesnt work correctly (redirects before auth)
    // window.location.replace('/home');
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        window.location.replace('/');
      } else if (err) {
        window.location.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    window.location.replace('/');
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if(!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(token, cb) {
    // let accessToken = this.getAccessToken();
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    window.location.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    // Added check to make sure localstorage is defined
    if (typeof localStorage === 'undefined') {
      return false;
    } else {
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
  }
}
