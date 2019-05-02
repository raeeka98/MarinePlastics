const axios = require("axios").default;
const router = require("express").Router();
const jwtAuthz = require("express-jwt-authz");

const checkScopes = jwtAuthz(['create:admin']);


function checkIfSignedIn (req, res, next) {
    let bearer = req.headers['authorization'];
    console.log(bearer);
    next();
}

module.exports = function(checkJwt) {

    router.get("/find", checkIfSignedIn, checkJwt, (req, res) => {
        console.log(req.user);
        let reqEmail = req.query.email;
        axios.get("https://marine-plastics-coi.auth0.com/api/v2/users-by-email", {
                params: {
                    email: "marineplasticscoi@gmail.com"
                },
                headers: {
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFrWTRRamc1UVRNM09ERkZPRU0zUWpFMk5ETTRSREU0T1RORU1qZzBOVGxETURVeFF6RXdNdyJ9.eyJpc3MiOiJodHRwczovL21hcmluZS1wbGFzdGljcy1jb2kuYXV0aDAuY29tLyIsInN1YiI6Img3YWRJM3dpbEJ6RDFKclY1em4zc01DQWo0a1NiTlJqQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21hcmluZS1wbGFzdGljcy1jb2kuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1NTY2MTAwNzIsImV4cCI6MTU1NjY5NjQ3MiwiYXpwIjoiaDdhZEkzd2lsQnpEMUpyVjV6bjNzTUNBajRrU2JOUmoiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.fOhUsHlSArSHDrlKNtLls8p9xyjrj-00lXDeI29uQbutrdSkbEU29E4LnKEHAjOV_WIFCn8h3r260wYDdjTAEuWBKhK8lythPeJe2RlmG6EwaF7ppY2P1_dzNKOjW0yZXbLt7lGFV8iLmi27XU3yVf6XHV9FBwBqVHTINmaBTFZTKskczF8p7vFvGc3c9DAvJHlL73pgMmws91zfPs_XM8EccoA7xgqbGW6-inYfh_ADwU9ZAhJl0bxt-vzPFFrGEkiccpiW16AKuGS6HYtDYUnWwgogsP6K0w3El5PBDy2ir8Z8WTQ5hXY0vjDLljTMvzy_Gyq5ZMYTJEDNnT9D-w'
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

    router.post("/newAdmin", checkJwt, checkScopes, (res, req) => {
        let roles = res.body;

    });
    return router;
}