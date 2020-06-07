/**
 * dataEntry.js
 * Defines requests that can be called using axios.
 */
let { beaches, surveys, trash } = require('../server_modules/mongoose');
let router = require('express').Router();
let {
  beachValidation,
  surveyValidation
} = require("../server_modules/joi-validation");

/**
 * Defines how parameters are used in requests
 * @param {Promise} fn
 */
let asyncHandler = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }

router.route('/')
  /**
    * Gets ALL beaches NAMES ONLY. When user clicks + on the beach it shall
    * display all the years, then select a year will display all months with
    * surveys, then when select a month it will display all surveys under that
    * month. Go through route /beaches/:beachID to get all surveys under a
    * beach.
    */
  .get(asyncHandler(async (req, res) => {

    // skip is how many beaches to skip and get the next 10 should first start
    // a 0 for client to get first 10 then next 10 should set skip to 10
    // skip = s variable is query
    let { s: skip } = req.query;
    let b = await beaches.getBeachNames(skip);
    for (var i in b) {
      b[i].n = b[i].n.replace(/_/g, " ");
    }
    //returns array of beach names and their ids
    //[{_id:1234,n:"testb"}]
    res.json(b);
  }))
  // beach creation
  .post(asyncHandler(async (req, res) => {
    let beachData;
    try {
      beachData = await beachValidation.validate(req.body);
      //let beach = await beaches.create(beachData);
      res.json({ res: `Added beach ${beach.n}` });
    } catch (err) {
      res.json(err);
    }
  }));

router.route('/trash')
  // gets all trash
  .get(asyncHandler(async (req, res) => {
    let allTrash = await trash.getMany();
    res.json(allTrash);
  }));

router.route('/map')
  // gets all beaches with lon and lat
  .get(asyncHandler(async (req, res) => {
    let points = await beaches.getAllLonLat();
    for (let idx = 0; idx < points.length; idx++) {
      points[idx].n = points[idx].n.replace(/_/g, " ");
    }
    res.json(points);
  }));
router.route('/search')
  // gets beach based on querry from req
  .get(asyncHandler(async (req, res) => {
    let { q: query } = req.query;
    query = query.replace(/ /g, "_");
    let matchedQuery = await beaches.queryBeachNames(query);
    for (const key in matchedQuery) {
      matchedQuery[key].n = matchedQuery[key].n.replace(/_/g, " ");
    }
    res.json(matchedQuery);
  }));

router.route('/search/closest')
  // gets list of beaches within a 5 mile (8 km) radius of coordinates in req
  .get(asyncHandler(async (req, res) => {
    let coordinates = JSON.parse(req.query.coords);
    let lat = coordinates.lat, lon = coordinates.lon;
    // pass callback function to return the result from the database query
    await beaches.getClosestCoords(lat, lon, function(result) {
      for(const key in result) {
        result[key].n = result[key].n.replace(/_/g, " "); 
      }
      res.json(result);
    });
  }))

router.route('/allstats')
  // gets all stats for all beaches
  .get(asyncHandler(async (req, res) => {
    let beachWStats = await beaches.getAllStats();
    res.json(beachWStats);
  }));

router.route('/surveys')
  //adds survey to beach
  /**post body
    * {
    * bID: (beachID),
    * survData:{
    *      (All requred survey data)
    *      }
    * }
    */
  .post(asyncHandler(async (req, res) => {
    try {
      let beachData = null;
      let surveyData = await surveyValidation.validate(req.body);

      if (!surveyData.bID) {
          beachData = await beaches.create(surveyData.beachData);
      }
      let beachID = beachData ? beachData._id : surveyData.bID;
      let surv = await surveys.addToBeach(surveyData.survData, beachID);
      res.json({ survID: surv._id });
    } catch (err) {
      res.status(500).send({ error: err.message })
    }
  }));

/**
 * Checks if the req is logged in or a guest. If guest, sets res to mark the
 * survey with surveyID as a param in req as not editable.
 * @params {any} req, {any} res, {any} next
 * @return next only if user is logged in
 */
function checkIfSignedIn(req, res, next) {
  let bearer = req.headers['authorization'];

  if (bearer != undefined) {
    let tokens = bearer.split(' ');

    if (tokens.length == 2 && (tokens[1] != 'undefined' && tokens[1] != 'null')) {
      let loggedInUser = req.user;

      let { userID: clientID } = req.query;
      let surveyID = req.params.surveyID;

      surveys.get(surveyID)
        .then(survey => {
          let ownerID = survey.userID;
          // survey.userID = undefined;
          // editable if the survey is the user's or if the user is an admin
          let editable = ownerID == clientID || req.user.permissions.includes('edit:anySurvey');
          let rtnMsg = { survData: survey, e: editable };
          res.json(rtnMsg);
        });
      // return next();
    }
  }
  // if guest just continue as usual
  let surveyID = req.params.surveyID;
  surveys.get(surveyID)
    .then(surv => {
      surv.userID = undefined;
      let rtnMsg = { survData: surv, e: false };
      res.json(rtnMsg);
    });
}

/**
 * A collection of requests that can only be fulfilled if the user is
 * authorized to make such requests.
 * @param {any} checkjwt
 */
function verifySurveyJWT (checkjwt) {
  router.route('/surveys/:surveyID')
    // gets a specific survey for logged in
    .get(checkIfSignedIn, checkjwt, asyncHandler(async (req, res) => {
      // moved to checkIfSignedIn
      /*
      let loggedInUser = req.user;

      let { userID: clientID } = req.query;
      let surveyID = req.params.surveyID;

      let survey = await surveys.get(surveyID);
      let ownerID = survey.userID;
      survey.userID = undefined;
      // editable if the survey is the user's or if the user is an admin
      let editable = ownerID == clientID || req.user.permissions.includes('edit:anySurvey');
      let rtnMsg = { survData: survey, e: editable };
      res.json(rtnMsg);
      */
    }))
    // finds a specific survey and edits it
    .post(/*checkjwt, */asyncHandler(async (req, res) => {
      let updateData = req.body;
      let { userID } = req.query;
      let surveyID = req.params.surveyID;
      let surveyCreator = await surveys.getUserID(surveyID);
      surveyCreator = surveyCreator.userID;
      // editable if the survey is the user's or if the user is an admin
      let sameUser = userID.split('|')[1] == surveyCreator || req.user.permissions.includes('edit:anySurvey');
      if (!sameUser) {
        return res.json({ res: "fail" });
      }
      let updatedSurvey = await surveys.update(surveyID, updateData);
      res.json({ res: "success", surveyData: updatedSurvey });
    }))
    // delete an survey
    .delete(/*checkjwt, */asyncHandler(async (req, res) => {
      let { bID, dos: dateOfSub } = req.query;
      let { userID } = req.query;
      let surveyID = req.params.surveyID;
      let surveyCreator = await surveys.getUserID(surveyID);
      surveyCreator = surveyCreator.userID;
      // deletable if the survey is the user's or if the user is an admin
      let sameUser = userID.split('|')[1] == surveyCreator || req.user.permissions.includes('edit:anySurvey');
      if (!sameUser) {
        return res.json({ res: "fail" });
      }
      await surveys.remove(bID, surveyID, dateOfSub);
      res.json({ res: "success" })
    }));

  router.route('/surveys/:surveyID/date')
    // gets date for a survey
    .get(asyncHandler(async (req, res) => {
      let sID = req.params.surveyID;
      let date = await surveys.getDateCreated(sID);
      res.json(date);
    }));
}

router.route('/:beachID')
  // supposed to get all surveys submited in the year then month
  // how many to skip and how many to obtain
  // must send a query with get
  // for now it obtains all surveys under beach until next meeting
  .get(asyncHandler(async (req, res) => {
    let bID = req.params.beachID;
    let {
      yr: surveyYear,
      m: surveyMonth,
      s: surveySkip,
      nos: numOfSurveys
    } = req.query;
    let survs = await beaches.getSurveys(bID, 0, 0, 0, 0);
    // returns array of survey ids and date of submission NOT MONTH OR YEAR
    // [{date:4,_id:1234}]
    res.json(survs)
  }))
  //delete a beach with all surveys under it
  .delete(asyncHandler(async (req, res) => {
    let bID = req.params.beachID;
    await beaches.remove(bID);
    res.json({ res: "Successfully deleted beach" });
  }));

router.route('/:beachID/stats')
  // get stats of a beach with beachID
  .get(asyncHandler(async (req, res) => {
    let bID = req.params.beachID;
    let { yr: year } = req.query;
    let stats = await beaches.getStats(bID, year);
    // stats.n = stats.n.replace(/_/g, " ");
    res.json(stats);
  }));

router.route('/:beachID/coords')
  // get lat and lon for beach with beachID
  .get(asyncHandler(async (req, res) => {
    let bID = req.params.beachID;
    let coords = await beaches.getOneLonLat(bID);
    //coords.n = coords.n.replace(/_/g, " ");
    res.json(coords);
  }));

router.route('/:beachID/info')
  // get auto fill data from beach with beachID
  .get(asyncHandler(async (req, res) => {
    let bID = req.params.beachID;
    let data = await beaches.getInfo(bID);
    data.n = data.n.replace(/_/g, " ");
    data.nroName = data.nroName.replace(/_/g, " ");
    res.json(data);
  }));

module.exports = { router, verifySurveyJWT };