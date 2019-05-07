const axios = require("axios").default;
const router = require("express").Router();
const jwtAuthz = require("express-jwt-authz");

const checkScopes = jwtAuthz(['create:admin']);



module.exports = function(checkJwt) {

    router.get("/find", checkJwt, checkScopes, (req, res) => {
        console.log(req.user);
        let reqEmail = req.query.email;
        axios.get("https://marine-plastics-coi.auth0.com/api/v2/users-by-email", {
                params: {
                    email: reqEmail
                },
                headers: {
                    authorization: req.headers['authorization']
                }
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log("sth went wrong");
                console.log(err);
            })
    });


    router.post("/setRole", checkJwt, checkScopes, (req, res) => {
        let { userID } = req.body;
        console.log("new Role");

        axios.post(`https://marine-plastics-coi.auth0.com/api/v2/users/${userID}/roles`, {
                roles: ['rol_TeEKH4d1DDLAbCVT']
            }, {
                headers: {
                    'cache-control': 'no-cache',
                    authorization: req.headers['authorization'],
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);

            })
    });

    return router;
}