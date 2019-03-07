'use strict'

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const app = express();
const { router: dataEntryRouter } = require('./routes/dataEntry');
//set our port to either a predetermined port number if you have set it up, or 3001
app.use(express.static(path.join(__dirname, 'client/build')));
let reactPath = path.join(__dirname, "/client/build/index.html");

const port = process.env.PORT || 3001;

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

//Use our router configuration when we call /api
app.use('/beaches', dataEntryRouter);

app.get('/pdfs/COIDataSheet_Oct_24.pdf', (req, res) => res.sendFile(path.join(__dirname, '/pdfs/COIDataSheet_Oct_24.pdf')));

app.get('*', (req, res) => res.sendFile(reactPath));



//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});