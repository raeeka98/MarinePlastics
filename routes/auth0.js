/**
 * auth0.js
 * Sets up calls that can be made to access information on and modify users
 * permissions.
 */
const axios = require("axios").default;
const router = require("express").Router();

// API for managing website
let managAPI = {
  body: {
    client_id: "eg6wqMt4RF4wke7rsyK2FC40L9jJUnWb",
    client_secret:
      "nWqsoGr_Uab-T4C2K-xW7gvg-Fqf3lgFduj4HD6o7L49eZwzaoShq4NBi4gif4Lm",
    audience: "https://marine-plastics-coi.auth0.com/api/v2/",
    grant_type: "client_credentials"
  },
  accessToken: {
    token: null,
    expiresAt: 0
  }
}

// API for using website
let userAPI = {
  body: {
    client_id: "eg6wqMt4RF4wke7rsyK2FC40L9jJUnWb",
    client_secret:
      "nWqsoGr_Uab-T4C2K-xW7gvg-Fqf3lgFduj4HD6o7L49eZwzaoShq4NBi4gif4Lm",
    audience: "https://user-auth.com",
    grant_type: "client_credentials",
  },
  accessToken: {
    token: null,
    expiresAt: 0
  }
}

/**
 * Checks if they have correct permission to access this route.
 * @params {any} req, {any} res, {any} next
 * @return error message only if user does not have permission
 */
function hasPermission(req, res, next) {
  let hasPermission = req.user.permissions.includes('create:admin');
  if (!hasPermission) {
    return res.status(403).json({ err: "Do not have the right permissions." });
  }
  next();
}

/**
 * Gets access token to use API, then stores it for later use.
 * @param {any} API
 * @return access token
 */
async function obtainAccessToken (API) {
  let { body: apiBody, accessToken: currtoken } = API === "user" ? userAPI :
    managAPI;
  let currentTime = new Date().getTime();
  if (currtoken.token && currtoken.expiresAt < currentTime) {
    return currtoken.token;
  }
  let res = await
    axios.post("https://marine-plastics-coi.auth0.com/oauth/token", apiBody)
  let tokenData = res.data;
  currtoken.token = tokenData.access_token;
  currtoken.expiresAt = (tokenData.expires_in * 1000) + new Date().getTime();
  return currtoken.token;
}

/**
 * Makes a promise to call fn.
 * @param {any} fn
 */
let asyncHandler = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }

module.exports = function(checkJwt) {
  router.use(checkJwt, hasPermission);

   // find the profile connected to the email.
  router.get("/find", asyncHandler(async (req, res) => {
    let reqEmail = req.query.e;
    // the response to get request
    let resp = { found: false, user: null };
    try {
      let token = await obtainAccessToken("manager");

      let { data: users } = await
        axios.get(
          "https://marine-plastics-coi.auth0.com/api/v2/users-by-email", {
        params: {
          email: reqEmail
        },
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      // if array is empty no user found
      if (users.length < 1) {
        return res.json(resp);
      }

      resp.found = true;
      resp.user = users[0];

      //get profile roles
      let { data: roles } = await axios.get(
        `https://marine-plastics-coi.auth0.com/api/v2/users/${resp.user.user_id}/roles`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      resp.user.roles = roles;
      return res.json(resp);
    } catch (err) {
      let { data: response } = err.response;
      if (response.statusCode === 400) {
        return res.status(400).json({ err: response.error });
      }
      res.status(500).json({ err: "Something went wrong!" });
    }
  }));

  router.route("/setRole/:id")
     // set roles for a profile
    .put(asyncHandler(async (req, res) => {
      let { id: userID } = req.params;

      try {
        let token = await obtainAccessToken("manager");
        await axios.post(
          `https://marine-plastics-coi.auth0.com/api/v2/users/${userID}/roles`,
          {
          roles: ['rol_TeEKH4d1DDLAbCVT']
        }, {
          headers: {
            'cache-control': 'no-cache',
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
          }
        });
        res.json({ res: "success", role_id: "rol_TeEKH4d1DDLAbCVT" });
      } catch (err) {
        req.status(500).json({ err: "Something went wrong!" });
      }
    }))
    // remove role from profile
    .delete(asyncHandler(async (req, res) => {
      let { id: userID } = req.params;
      let token = await obtainAccessToken("manager");
      try {
        await axios.delete(
          `https://marine-plastics-coi.auth0.com/api/v2/users/${userID}/roles`,
          {
          data: {
            roles: ['rol_TeEKH4d1DDLAbCVT']
          },
          headers: {
            'cache-control': 'no-cache',
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
          }
        });
        res.json({ res: "success" });
      } catch (err) {
        req.status(500).json({ err: "Something went wrong!" });
      }
    }));

  // gets all admins
  router.get("/getAdmins", asyncHandler(async (req, res) => {
    try {
      let token = await obtainAccessToken("manager");
      let { data } = await axios.get(
        "https://marine-plastics-coi.auth0.com/api/v2/roles/rol_TeEKH4d1DDLAbCVT/users", {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      res.json(data);
    } catch (err) {
      req.status(500).json({ err: "Something went wrong!" });
    }
  }));

  return router;
}