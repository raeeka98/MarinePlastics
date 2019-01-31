'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { router: dataEntryRouter } = require('./routes/dataEntry');
//set our port to either a predetermined port number if you have set it up, or 3001
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


//Use our router configuration when we call /api
app.use('/surveys', dataEntryRouter);

app.get('/', (req, res) => res.render('pages/index'));
//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});