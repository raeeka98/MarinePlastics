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
        beaches.getAll()
            .then(beaches => {
                res.json(beaches);
            })
            .catch(err => { throw new Error(err) });
    }))
    //delete a beach
    .delete(asyncHandler(async (req, res) => {
        let { bID } = req.body;
        beaches.remove(bID)
            .then(() => {
                res.json({ res: "Successfully deleted beach" })
            })
            .catch(err => {
                console.error(err);
                res.json({ res: "Failed with error" })
            })
    }));

router.route('/:beachID')
    .get(asyncHandler(async (req, res) => {
        beaches.getSurveys(req.params.beachID)
            .then(surveys => {
                res.json(surveys);
            })
    }))

router.route('/surveys/:surveyID')
    //get a specific entry
    .get(asyncHandler(async (req, res) => {
        surveys.get(req.params.surveyID)
            .then(survey => res.json(survey));
    }))
    //find a specific entry and edit it
    .put(asyncHandler(async (req, res) => {
        surveys.findById(req.params.entryid, function(err, entryData) {
            if (err) res.send(err);
            //setting the new beach and reason to whatever was changed. If nothing was changed
            // we will not alter the field.
            let newEntryData = res.body;
            for (const entry in newEntryData) {
                const data = newEntryData[entry];
                entryData[entry] = data;
            }

            //save comment
            entryData.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Entry has been updated' });
            });
        });
    }))
    //delete an entry
    .delete(asyncHandler(async (req, res) => {
        surveys.remove({ _id: req.params.entryid }, function(err, entry) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment has been deleted' })
        })
    }));

module.exports = { router };