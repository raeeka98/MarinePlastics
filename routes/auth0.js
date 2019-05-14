const axios = require("axios").default;
const router = require("express").Router();


let managAPI = {
    body: {
        client_id: "eg6wqMt4RF4wke7rsyK2FC40L9jJUnWb",
        client_secret: "nWqsoGr_Uab-T4C2K-xW7gvg-Fqf3lgFduj4HD6o7L49eZwzaoShq4NBi4gif4Lm",
        audience: "https://marine-plastics-coi.auth0.com/api/v2/",
        grant_type: "client_credentials"
    },
    accessToken: {
        token: null,
        expiresAt: 0
    }
}

let userAPI = {
    body: {
        client_id: "eg6wqMt4RF4wke7rsyK2FC40L9jJUnWb",
        client_secret: "nWqsoGr_Uab-T4C2K-xW7gvg-Fqf3lgFduj4HD6o7L49eZwzaoShq4NBi4gif4Lm",
        audience: "https://user-auth.com",
        grant_type: "client_credentials",
    },
    accessToken: {
        token: null,
        expiresAt: 0
    }
}

function hasPermission (req, res, next) {
    console.log(req.user);

    let hasPermission = req.user.permissions.includes('create:admin');
    if (!hasPermission) {
        return res.status(403).json({ err: "Do not have the right permissions." });
    }
    next();
}

function obtainAccessToken (API) {
    return new Promise((res, rej) => {
        let { body: apiBody, accessToken: currtoken } = API === "user" ? userAPI : managAPI;
        let currentTime = new Date().getTime();
        if (currtoken.token && currtoken.expiresAt < currentTime) {
            res(currentToken.token);
        }
        let chosenAPI =
            axios.post("https://marine-plastics-coi.auth0.com/oauth/token", )
            .then(res => {

                let tokenData = res.data;
                console.log(tokenData.access_token);
                currentToken.token = tokenData.access_token;
                currentToken.expiresAt = (tokenData.expires_in * 1000) + new Date().getTime();
            })
            .catch(err => {
                console.log(err.response.data);

            })
    })
}

obtainAccessToken();




module.exports = function(checkJwt, jwtManagement) {
    router.use(checkJwt, hasPermission);

    router.get("/find", (req, res) => {
        let reqEmail = req.query.e;
        console.log(reqEmail);
        console.log(req.headers['authorization']);



        // axios.get("https://marine-plastics-coi.auth0.com/api/v2/users-by-email", {
        //         params: {
        //             email: reqEmail
        //         },
        //         headers: {
        //             Authorization: req.headers['authorization']
        //         }
        //     })
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.log("sth went wrong");
        //         console.log(err);
        //     })
    });

    function serv () {
        console.log("serv");


    }



    router.post("/setRole", (req, res) => {
        let { userID } = req.body;
        console.log("new Role");

        axios.post(`https://marine-plastics-coi.auth0.com/api/v2/users/${userID}/roles`, {
                roles: ['rol_TeEKH4d1DDLAbCVT']
            }, {
                headers: {
                    'cache-control': 'no-cache',
                    Authorization: req.headers['authorization'],
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

    router.get("/getAdmins", (req, res) => {
        axios.get("https://marine-plastics-coi.auth0.com/api/v2/roles/rol_TeEKH4d1DDLAbCVT/users", {
                headers: {
                    authorization: req.headers['authorization']
                }
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);

            })
    })

    return router;
}