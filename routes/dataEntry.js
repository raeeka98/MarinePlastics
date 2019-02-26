let { beaches, surveys, trash } = require('../server_modules/mongoose');
let router = require('express').Router();

/**
 *
 * @param {Promise} fn
 */
let asyncHandler = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
router.route('/')
    /*get ALL beaches NAMES ONLY
    When they click + on the beach it shall display all the years
    then select a year will display all months with surveys
    then when select a month it will display all surveys under that month
    go through route /beaches/:beachID to get all surveys under a beach*/
    .get(asyncHandler(async (req, res) => {

        /*skip is how many beaches to skip and get the next 10
        should first start a 0 for client to get first 10
        then next 10 should set skip to 10
        skip = s variable is query
        */
        let { s: skip } = req.query;
        let b = await beaches.getMany(skip);
        //returns array of beach names and their ids
        //[{_id:1234,n:"testb"}]
        res.json(b);
    }))
    //beach Creation
    /**postBody
     * {
        name: "testB",
        lat: 0,
        lon: 0,
        nroName: "River t",
        nroDist: 3
        }
     */
    .post(asyncHandler(async (req, res) => {
        let beachData = req.body;
        let beach = await beaches.create(beachData);
        res.json({ res: "Created beach" });
    }));

router.route('/trash')
    .get(asyncHandler(async (req, res) => {
        let allTrash = await trash.getMany();
        console.log(allTrash);
        res.json(allTrash);
    }));

router.route('/map')
    //get all beaches with lon and lat
    .get(asyncHandler(async (req, res) => {
        let points = await beaches.getAllLonLat();
        res.json(points);
    }));

router.route('/surveys')
    //adds survey to beach
    /**post body
     * {
     * dos:324252342,
     * bID: (beachID),
     * survData:{
     *      (All requred survey data)
     *      }
     * }
     */
    .post(asyncHandler(async (req, res) => {
        let { dos: dateOfSub, bID: beachID, survData } = req.body;
        await surveys.addToBeach(survData, beachID, dateOfSub);
        res.json({ res: "Survey Created" })
    }));

router.route('/surveys/:surveyID')
    //get a specific survey
    .get(asyncHandler(async (req, res) => {
        console.log("Obtaining survey...");
        let surveyID = req.params.surveyID;
        let survey = await surveys.get(surveyID);
        console.log("returning survey...");
        console.log(survey);
        res.json(survey);
    }))
    //find a specific survey and edit it
    .put(asyncHandler(async (req, res) => {
        let { oldSurvey, newSurvey } = req.body;
        let updatedSurvey = await surveys.update(req.params.surveyID, newSurvey, oldSurvey);
        res.json(updatedSurvey);
    }))
    //delete an survey
    .delete(asyncHandler(async (req, res) => {
        let { bID, dos: dateOfSub } = req.query;
        let surveyID = req.params.surveyID;
        await surveys.remove(bID, surveyID, dateOfSub);
        res.json({ message: 'survey has been deleted' })
    }));


router.route('/:beachID')
    /*get all surveys submited in the year then month.
    How many to skip and how many to obtain
    Must send a query with get
    for now it obtains all surveys under beach until next meeting*/
    .get(asyncHandler(async (req, res) => {
        let bID = req.params.beachID;
        let { sy: surveyYear, sm: surveyMonth, ss: surveySkip, nos: numOfSurveys } = req.query;
        let survs = await beaches.getSurveys(bID, 0, 0, 0, 0);
        //returns array of survey ids and date of submission NOT MONTH OR YEAR
        //[{date:4,_id:1234}]
        res.json(survs)
    }))
    //delete a beach with all surveys under it
    .delete(asyncHandler(async (req, res) => {
        let bID = req.params.beachID;
        await beaches.remove(bID);
        res.json({ res: "Successfully deleted beach" });
    }));



module.exports = { router };
