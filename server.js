/**
 * server.js
 * Sets up the different software parts of the app, including the database and
 * linking.
 */
'use strict'

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const app = express();

const { router: dataEntryRouter, verifySurveyJWT } =
  require('./routes/dataEntry');
const auth0Route = require('./routes/auth0');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const jwtUser = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://marine-plastics-coi.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://user-auth.com',
  issuer: 'https://marine-plastics-coi.auth0.com/',
  algorithms: ['RS256']
});

verifySurveyJWT(jwtUser);

// sets port to either a predetermined port number if it is set up, or 3001
app.use(express.static(path.join(__dirname, 'client/build')));
let reactPath = path.join(__dirname, "/client/build/index.html");

const port = process.env.PORT || 3001;

// configures the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// use our router configuration when we call /api
app.use('/beaches', dataEntryRouter);
app.use('/auth', auth0Route(jwtUser));

// the following documents can now be made as links
const pdf_paths = require('./client/src/Protocol/pdf_names.json');
app.get(`/pdfs/${pdf_paths.data_sheet}`,
  (req, res) => res.sendFile(path.join(__dirname,
  `/pdfs/${pdf_paths.data_sheet}`)));
app.get(`/pdfs/${pdf_paths.training_field_guide}`,
  (req, res) => res.sendFile(path.join(__dirname,
  `/pdfs/${pdf_paths.training_field_guide}`)));

app.get('*', (req, res) => res.sendFile(reactPath));

// starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
