const passport = require("../server_modules/passport");
let router = require('express').Router();

router.get("/auth/google",
    passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.profile"] })
);

router.get("/auth/google/cb",
    passport.authenticate("google", { failureRedirect: "/" }),
    function(req, res) {
        res.redirect('/');
    }
);

module.exports = router;