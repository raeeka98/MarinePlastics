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

    login = async () => {
        await this.auth0.authorize();   
    }
    
    handleAuthentication = () => {
        //Check if browser has token
        //if already have token then aquire profile 
        //else aquire tokens then profile
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
                    alert(err.errorDescription); //Quick fix for login changes
                    rej(err.errorDescription);
                }
            });
        })
    }

    setSession = (authResult) => {
        // Set the time that the Access Token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("expiresAt", expiresAt);
        localStorage.setItem("idToken", authResult.idToken);
    }

    getAccessToken = () => {
        return localStorage.getItem("accessToken");
    }

    getProfile = (token) => {
        //aquires the profile from a token from auth0
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

    getLoggedInProfile = () => {
        //Gets the logged in profile from cache 
        // if it doesnt exist in cache then get it from auth0
        return new Promise((res, rej) => {
            if (this.userProfile) {
                return res(this.userProfile);
            }
            let token = localStorage.getItem("accessToken");
            if (token != null) {
                this.getProfile(token)
                    .then(prof => {
                        return res(prof);
                    })
            }
        })
    }
    
    containsRole = async role => {
        //Checks if the logged in profile is a role
        let prof = await this.getLoggedInProfile();
        if (prof) {
            return prof['https://marineplastics.com/roles'].includes(role);
        }
        return false;
    }


    logout = () => {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("idToken");
        this.userProfile = null;
        // navigate to the home route
        this.auth0.logout({
            returnTo: process.env.REACT_APP_AUTH_LOGOUT_URI
        });
    }

    isAuthenticated = () => {
        // Check whether the current time is past the
        // Access Token's expiry time
        // Added check to make sure localstorage is defined
        let expiresAt = localStorage.getItem("expiresAt");
        return new Date().getTime() < expiresAt;
    }
}