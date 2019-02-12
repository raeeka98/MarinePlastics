'use strict'

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const app = express();
const { router: dataEntryRouter } = require('./routes/dataEntry');
//set our port to either a predetermined port number if you have set it up, or 3001
app.use(express.static(path.join(__dirname,'client/build')));
const port = process.env.PORT || 3001;

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Use our router configuration when we call /api
app.use('/surveys', dataEntryRouter);

app.get('/', (req, res) => res.render('pages/index')); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});
