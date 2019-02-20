let { beaches, surveys } = require('../server_modules/mongoose');
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
    //get all beaches
    .get(asyncHandler(async (req, res) => {
        let { skip, limit } = req.body;
        let allBeaches = await beaches.getMany(skip,limit);
        res.json(allBeaches);
    }))
    //delete a beach
    .delete(asyncHandler(async (req, res) => {
        let { bID } = req.body;
        await beaches.remove(bID);
        res.json({ res: "Successfully deleted beach" });
    }));

router.route('/verbose')
    //get all beaches with all of its elements
    .get(asyncHandler(async (req,res) => {
        let allBeaches = await beaches.getAllVerb();
        res.json(allBeaches);
    }));

router.route('/:beachID')
    .get(asyncHandler(async (req, res) => {
        let bID = req.params.beachID;
        let {surveyYear,surveyMonth,surveySkip,numOfSurveys} = req.body;
        let beachSurveys = beaches.getSurveys(bID,surveyYear,surveyMonth,surveySkip,numOfSurveys);
        res.json(beachSurveys)
    }));

router.route('/surveys/:surveyID')
    //get a specific entry
    .get(asyncHandler(async (req, res) => {
        let survey = await surveys.get(req.params.surveyID);
        res.json(survey);
    }))
    //find a specific entry and edit it
    .put(asyncHandler(async (req, res) => {
        let { oldSurvey, newSurvey } = req.body;
        let updatedSurvey = await surveys.update(req.params.surveyID, newSurvey, oldSurvey);
        res.json(updatedSurvey);
    }))
    //delete an entry
    .delete(asyncHandler(async (req, res) => {
        let { bID, dateOfSub } = req.body;
        let result = await surveys.remove(bID, req.params.surveyID, dateOfSub);
        res.json({ message: 'Comment has been deleted' })
    }));

module.exports = { router };