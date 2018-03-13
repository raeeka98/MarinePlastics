'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

var mongoDB = 'mongodb://db:db@ds247688.mlab.com:47688/marine_plastics';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/comments')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var comment = new Comment();
    (req.body.user) ? comment.user = req.body.user : null;
    (req.body.email) ? comment.email = req.body.email : null;
    (req.body.input_date) ? comment.input_date = req.body.input_date : null;
    (req.body.org) ? comment.org = req.body.org : null;
    (req.body.date) ? comment.date = req.body.date : null;
    (req.body.beach) ? comment.beach = req.body.beach : null;
    (req.body.reason) ? comment.reason = req.body.reason : null;
    (req.body.st) ? comment.st = req.body.st : null;
    (req.body.lat) ? comment.lat = req.body.lat : null;
    (req.body.lon) ? comment.lon = req.body.lon : null;
    (req.body.slope) ? comment.slope = req.body.slope : null;
    (req.body.nroName) ? comment.nroName = req.body.nroName : null;
    (req.body.nroDist) ? comment.nroDist = req.body.nroDist : null;
    (req.body.aspect) ? comment.aspect = req.body.aspect : null;
    (req.body.lastTide) ? comment.lastTide = req.body.lastTide : null;
    (req.body.nextTide) ? comment.nextTide = req.body.nextTide : null;
    (req.body.windDir) ? comment.windDir = req.body.windDir : null;
    (req.body.majorUse) ? comment.majorUse = req.body.majorUse : null;
    (req.body.SRSData) ? comment.SRSData = req.body.SRSData : null;
    (req.body.SRSTotal) ? comment.SRSTotal = req.body.SRSTotal : null;
    (req.body.weight) ? comment.weight = req.body.weight : null;
    (req.body.NumberOfPeople) ? comment.NumberOfPeople = req.body.NumberOfPeople : null;

    // TEMP (might need to add later?????)
    // (req.body.totalFreshCig) ? data.totalFreshCig = req.body.totalFreshCig : null;
    // (req.body.totalWeatheredCig) ? data.totalWeatheredCig = req.body.totalWeatheredCig : null;
    // (req.body.totalFreshFline) ? data.totalFreshFline = req.body.totalFreshFline : null;
    // (req.body.totalWeatheredFline) ? data.totalWeatheredFline = req.body.totalWeatheredFline : null;
    // (req.body.totalFreshGlass) ? data.totalFreshGlass = req.body.totalFreshGlass : null;
    // (req.body.totalWeatheredGlass) ? data.totalWeatheredGlass = req.body.totalWeatheredGlass : null;
    // (req.body.totalFreshPaper) ? data.totalFreshPaper = req.body.totalFreshPaper : null;
    // (req.body.totalWeatheredPaper) ? data.totalWeatheredPaper = req.body.totalWeatheredPaper : null;
    // (req.body.totalFreshFplastic) ? data.totalFreshFplastic = req.body.totalFreshFplastic : null;
    // (req.body.totalWeatheredFplastic) ? data.totalWeatheredFplastic = req.body.totalWeatheredFplastic : null;
    // (req.body.totalFreshMiscPlastic) ? data.totalFreshMiscPlastic = req.body.totalFreshMiscPlastic : null;
    // (req.body.totalWeatheredMiscPlastic) ? data.totalWeatheredMiscPlastic = req.body.totalWeatheredMiscPlastic : null;
    // (req.body.totalFreshPlasticBottle) ? data.totalFreshPlasticBottle = req.body.totalFreshPlasticBottle : null;
    // (req.body.totalWeatheredPlasticBottle) ? data.totalWeatheredPlasticBottle = req.body.totalWeatheredPlasticBottle : null;
    // (req.body.totalFreshPlasticCap) ? data.totalFreshPlasticCap = req.body.totalFreshPlasticCap : null;
    // (req.body.totalWeatheredPlasticCap) ? data.totalWeatheredPlasticCap = req.body.totalWeatheredPlasticCap : null;
    // (req.body.totalFreshStyrofoam) ? data.totalFreshStyrofoam = req.body.totalFreshStyrofoam : null;
    // (req.body.totalWeatheredStyrofoam) ? data.totalWeatheredStyrofoam = req.body.totalWeatheredStyrofoam : null;
    // (req.body.totalFreshWood) ? data.totalFreshWood = req.body.totalFreshWood : null;
    // (req.body.totalWeatheredWood) ? data.totalWeatheredWood = req.body.totalWeatheredWood : null;
    // (req.body.totalFreshUrethaneFoam) ? data.totalFreshUrethaneFoam = req.body.totalFreshUrethaneFoam : null;
    // (req.body.totalWeatheredUrethaneFoam) ? data.totalWeatheredUrethaneFoam = req.body.totalWeatheredUrethaneFoam : null;
    // (req.body.totalFreshPlasticCup) ? data.totalFreshPlasticCup = req.body.totalFreshPlasticCup : null;
    // (req.body.totalWeatheredPlasticCup) ? data.totalWeatheredPlasticCup = req.body.totalWeatheredPlasticCup : null;
    // (req.body.totalFreshPlasticStraw) ? data.totalFreshPlasticStraw = req.body.totalFreshPlasticStraw : null;
    // (req.body.totalWeatheredPlasticStraw) ? data.totalWeatheredPlasticStraw = req.body.totalWeatheredPlasticStraw : null;
    // (req.body.totalFreshCottonCloth) ? data.totalFreshCottonCloth = req.body.totalFreshCottonCloth : null;
    // (req.body.totalWeatheredCottonCloth) ? data.totalWeatheredCottonCloth = req.body.totalWeatheredCottonCloth : null;
    // (req.body.totalFreshPolyRope) ? data.totalFreshPolyRope = req.body.totalFreshPolyRope : null;
    // (req.body.totalWeatheredPolyRope) ? data.totalWeatheredPolyRope = req.body.totalWeatheredPolyRope : null;
    // (req.body.totalFreshAlumCan) ? data.totalFreshAlumCan = req.body.totalFreshAlumCan : null;
    // (req.body.totalWeatheredAlumCan) ? data.totalWeatheredAlumCan = req.body.totalWeatheredAlumCan : null;
    // (req.body.totalFreshHygItems) ? data.totalFreshHygItems = req.body.totalFreshHygItems : null;
    // (req.body.totalWeatheredHygItems) ? data.totalWeatheredHygItems = req.body.totalWeatheredHygItems : null;
    // (req.body.totalFreshMetal) ? data.totalFreshMetal = req.body.totalFreshMetal : null;
    // (req.body.totalWeatheredMetal) ? data.totalWeatheredMetal = req.body.totalWeatheredMetal : null;
    // (req.body.totalFreshTileBrick) ? data.totalFreshTileBrick = req.body.totalFreshTileBrick : null;
    // (req.body.totalWeatheredTileBrick) ? data.totalWeatheredTileBrick = req.body.totalWeatheredTileBrick : null;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });

//Adding a route to a specific comment based on the database ID
router.route('/comments/:comment_id')
//The put method gives us the chance to update our comment based on the ID passed to the route
.put(function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err)
      res.send(err);
      //setting the new beach and reason to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.user) ? comment.user = req.body.user : null;
      (req.body.email) ? comment.email = req.body.email : null;
      (req.body.input_date) ? comment.input_date = req.body.input_date : null;
      (req.body.org) ? comment.org = req.body.org : null;
      (req.body.date) ? comment.date = req.body.date : null;
      (req.body.beach) ? comment.beach = req.body.beach : null;
      (req.body.reason) ? comment.reason = req.body.reason : null;
      (req.body.st) ? comment.st = req.body.st : null;
      (req.body.lat) ? comment.lat = req.body.lat : null;
      (req.body.lon) ? comment.lon = req.body.lon : null;
      (req.body.slope) ? comment.slope = req.body.slope : null;
      (req.body.nroName) ? comment.nroName = req.body.nroName : null;
      (req.body.nroDist) ? comment.nroDist = req.body.nroDist : null;
      (req.body.aspect) ? comment.aspect = req.body.aspect : null;
      (req.body.lastTide) ? comment.lastTide = req.body.lastTide : null;
      (req.body.nextTide) ? comment.nextTide = req.body.nextTide : null;
      (req.body.windDir) ? comment.windDir = req.body.windDir : null;
      (req.body.majorUse) ? comment.majorUse = req.body.majorUse : null;
      (req.body.SRSData) ? comment.SRSData = req.body.SRSData : null;
      (req.body.SRSTotal) ? comment.SRSTotal = req.body.SRSTotal : null;
      (req.body.weight) ? comment.weight = req.body.weight : null;
      (req.body.NumberOfPeople) ? comment.NumberOfPeople = req.body.NumberOfPeople : null;
      //save comment
      comment.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Comment has been updated' });
      });
    });
})
  //delete method for removing a comment from our database
  .delete(function(req, res) {
    //selects the comment by its ID, then removes it.
    Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment has been deleted' })
    })
  });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
