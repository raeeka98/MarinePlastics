var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: "808131614922-rcpvqbbr6dmv2pmd02qrgl8iae4heqg8.apps.googleusercontent.com",
    clientSecret: "AWhDoyOIWBjwFCyt0saIzDsH",
    callbackURL: "http://localhost:3001/auth/google/cb"
  },
  function(accessToken, refreshToken, profile, done) {
       console.log(profile.id);
       console.log(profile.name);
       console.log(profile.displayName);       
       return done(null,null);
  }
));

module.exports = passport;