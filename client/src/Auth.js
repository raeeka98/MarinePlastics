/**
 * Auth.js
 * Contains the configuration code for implementing to auth0's WebAuth class,
 * and handles authentification as well as authorization and role checking, and
 * obtaining profile information.
 */
import auth0 from 'auth0-js';

/*redirectUri: 'https://marineplastics.herokuapp.com/home', for prod
redirectUri: 'http://localhost:3000/home', for dev
*/
//Redeploy
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
    responseType: 'token id_token',
    scope: 'openid email profile roles',
    audience: process.env.REACT_APP_AUTH_AUDIENCE
  });

  userProfile = null;

  /**
   * Sends user to Auth0 authentification page to log in or sign up.
   */
  login = async () => {
    await this.auth0.authorize();   
  }

  /**
   * Checks if browser has token. If already has token then aquire profile,
   * else aquires tokens, the profile.
   * @return promise that it will get a token if necessary, and profile
   */
  handleAuthentication = () => {
    return new Promise((res, rej) => {
      let accessToken = localStorage.getItem("accessToken");
      let token = localStorage.getItem("idToken");
      if (this.isAuthenticated()) {
        if (accessToken && token) {
          this.getProfile(accessToken)
            .then(profile => {
              this.userProfile = profile;
              res();
            });
        }
      }
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          this.getProfile(authResult.accessToken)
            .then(profile => {
              this.userProfile = profile;
              res();
            });
          window.location.replace('/home');
        } else if (err) {
          // quick fix for the log in issues
          alert(err.errorDescription); 
          rej(err.errorDescription);
        }
      });
    })
  }

  /**
   * Sets the time that the Access Token will expire at.
   * @param {any} authResult
   */
  setSession = (authResult) => {
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("expiresAt", expiresAt);
    localStorage.setItem("idToken", authResult.idToken);
  }

  /**
   * Gets Access Token for user.
   * @return Access Token
   */
  getAccessToken = () => {
    return localStorage.getItem("accessToken");
  }

  /**
   * Aquires the profile from a token from auth0.
   * @return promise to get the profile
   */
  getProfile = (token) => {
    return new Promise((res, rej) => {
      this.auth0.client.userInfo(token, (err, profile) => {
        if (profile) {
          res(profile);
        }
        if (err) {
          rej(err);
        }
      });
    })
  }

  /**
   * Gets the logged in profile from cache. If it doesn't exist in cache, then
   * get it from auth0.
   * @return promise to get logged in profile from cache
   */
  getLoggedInProfile = () => {
    return new Promise((res, rej) => {
      if (this.userProfile) {
        return res(this.userProfile);
      }
      let token = localStorage.getItem("accessToken");
      if (token != null) {
        this.getProfile(token)
          .then(prof => {
            return res(prof);
          });
      }
    })
  }

  /**
   * Checks if the logged in profile is a role.
   * @param {any} role
   * @return true if the currently logged in profile has role, false if it
   * doesn't have the role or there is no logged in profile
   */
  containsRole = async role => {
    let prof = await this.getLoggedInProfile();
    if (prof) {
      return prof['https://marineplastics.com/roles'].includes(role);
    }
    return false;
  }

  /**
   * Clears Access Token and ID Token from local storage.
   */
  logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("idToken");
    this.userProfile = null;
    // navigate to the home route
    this.auth0.logout({
      returnTo: process.env.REACT_APP_AUTH_LOGOUT_URI
    });
  }

  /**
   * Checks whether the current time is past the Access Token's expiry time.
   * Checks to make sure localstorage is defined.
   */
  isAuthenticated = () => {
    let expiresAt = localStorage.getItem("expiresAt");
    return new Date().getTime() < expiresAt;
  }
}