let { beaches, surveys, trash } = require('../server_modules/mongoose');
let router = require('express').Router();
let { beachValidation, surveyValidation } = require("../server_modules/joi-validation");

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
        let b = await beaches.getBeachNames(skip);
        console.log(b);
        for (var i in b){
            b[i].n = b[i].n.replace(/_/g, " ");
        }
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
        let beachData;
        try {
            beachData = await beachValidation.validate(req.body);
            console.log(beachData);

            //let beach = await beaches.create(beachData);
            res.json({ res: `Added beach ${beach.n}` });
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }));

router.route('/trash')
    .get(asyncHandler(async (req, res) => {
        let allTrash = await trash.getMany();
        res.json(allTrash);
    }));

router.route('/map')
    //get all beaches with lon and lat
    .get(asyncHandler(async (req, res) => {
        let points = await beaches.getAllLonLat();
        for(let idx = 0; idx < points.length; idx++){
            points[idx].n = points[idx].n.replace(/_/g, " ");
        }
        res.json(points);
    }));
router.route('/search')
    .get(asyncHandler(async (req, res) => {
        let { q: query } = req.query;
        query = query.replace(/ /g, "_");
        let matchedQuery = await beaches.queryBeachNames(query);
        for(const key in matchedQuery) {
            matchedQuery[key].n = matchedQuery[key].n.replace(/_/g, " "); 
        }
        console.log(matchedQuery);
        res.json(matchedQuery);
    }));

router.route('/allstats')
    .get(asyncHandler(async (req, res) => {
        let beachWStats = await beaches.getAllStats();
        console.log(beachWStats);
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
        console.log(req.body);
        try {
            let beachData = null;
            let surveyData = await surveyValidation.validate(req.body);
            console.log(surveyData);

            if (!surveyData.bID) {
                beachData = await beaches.create(surveyData.beachData);
            }
            let beachID = beachData ? beachData._id : surveyData.bID;
            let surv = await surveys.addToBeach(surveyData.survData, beachID);
            res.json({ survID: surv._id });
        } catch (err) {
            console.log(err);
            res.status(500).send({error: err})
        }

    }));



router.route('/surveys/:surveyID')
    //get a specific survey
    .get(asyncHandler(async (req, res) => {
        //console.log("Obtaining survey...");
        let { userID: clientID } = req.query;
        let surveyID = req.params.surveyID;

        let survey = await surveys.get(surveyID);
        console.log(survey);
        let ownerID = survey.userID;
        survey.userID = undefined;
        let rtnMsg = { survData: survey, e: ownerID == clientID };
        res.json(rtnMsg);
    }))
    //find a specific survey and edit it
    .post(asyncHandler(async (req, res) => {
        let updateData = req.body;
        console.log(updateData);
        let updatedSurvey = await surveys.update(req.params.surveyID, updateData);
        res.json({ res: "Success", surveyData: updatedSurvey });
    }))
    //delete an survey
    .delete(asyncHandler(async (req, res) => {
        let { bID, dos: dateOfSub } = req.query;
        let surveyID = req.params.surveyID;
        await surveys.remove(bID, surveyID, dateOfSub);
        res.json({ message: 'survey has been deleted' })
    }));

router.route('/surveys/:surveyID/edit')
    .get(asyncHandler(async (req, res) => {
        res.send(req.query.id);
    }))


router.route('/surveys/:surveyID/date')
    .get(asyncHandler(async (req, res) => {
        let sID = req.params.surveyID;
        let date = await surveys.getDateCreated(sID);
        res.json(date);
    }));



router.route('/:beachID')
    /*get all surveys submited in the year then month.
    How many to skip and how many to obtain
    Must send a query with get
    for now it obtains all surveys under beach until next meeting*/
    .get(asyncHandler(async (req, res) => {
        let bID = req.params.beachID;
        let { yr: surveyYear, m: surveyMonth, s: surveySkip, nos: numOfSurveys } = req.query;
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

router.route('/:beachID/stats')
    .get(asyncHandler(async (req, res) => {
        let bID = req.params.beachID;
        let { yr: year } = req.query;
        let stats = await beaches.getStats(bID, year);
        //stats.n = stats.n.replace(/_/g, " ");
        console.log(stats);
        res.json(stats);
    }));

router.route('/:beachID/coords')
    .get(asyncHandler(async (req, res) => {
        let bID = req.params.beachID;
        let coords = await beaches.getOneLonLat(bID);
        //coords.n = coords.n.replace(/_/g, " ");
        console.log("Coords:")
        console.log(coords);
        res.json(coords);
    }));

router.route('/:beachID/info')
    .get(asyncHandler(async (req, res) => {
        let bID = req.params.beachID;
        let data = await beaches.getInfo(bID);
        data.n = data.n.replace(/_/g, " ");
        data.nroName = data.nroName.replace(/_/g, " ");
        res.json(data);
    }));



module.exports = { router };