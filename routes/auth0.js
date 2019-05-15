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

async function obtainAccessToken (API) {
    let { body: apiBody, accessToken: currtoken } = API === "user" ? userAPI : managAPI;
    let currentTime = new Date().getTime();
    if (currtoken.token && currtoken.expiresAt < currentTime) {
        return currtoken.token;
    }
    let res = await axios.post("https://marine-plastics-coi.auth0.com/oauth/token", apiBody)
    let tokenData = res.data;
    currtoken.token = tokenData.access_token;
    currtoken.expiresAt = (tokenData.expires_in * 1000) + new Date().getTime();
    return currtoken.token;
}

let asyncHandler = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }

module.exports = function(checkJwt, jwtManagement) {
    router.use(checkJwt, hasPermission);

    router.get("/find", asyncHandler(async (req, res) => {
        let reqEmail = req.query.e;
        console.log(reqEmail);
        try {
            let token = await obtainAccessToken("manager");

            let { data: users } = await axios.get("https://marine-plastics-coi.auth0.com/api/v2/users-by-email", {
                params: {
                    email: reqEmail
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(users[0]);
            res.json(users[0]);

        } catch (err) {
            console.log(err);
            res.status(500).json({ err: "Something went wrong!" });
        }

    }));



    router.post("/setRole", asyncHandler(async (req, res) => {
        let { userID } = req.body;
        console.log("new Role");

        try {
            let token = await obtainAccessToken("manager");
            let res = await axios.post(`https://marine-plastics-coi.auth0.com/api/v2/users/${userID}/roles`, {
                roles: ['rol_TeEKH4d1DDLAbCVT']
            }, {
                headers: {
                    'cache-control': 'no-cache',
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json'
                }
            });
        } catch (err) {
            console.log(err);
            req.status(500).json({ err: "Something went wrong!" });
        }


    }));

    router.get("/getAdmins", asyncHandler(async (req, res) => {

        try {
            let token = await obtainAccessToken("manager");
            let res = await axios.get("https://marine-plastics-coi.auth0.com/api/v2/roles/rol_TeEKH4d1DDLAbCVT/users", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {

        }

    }));

    return router;
}