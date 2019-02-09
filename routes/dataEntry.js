let { beaches, surveys } = require('../server_modules/mongoose');
let router = require('express').Router();

router.route('/')
    //get all beaches
    .get((req, res) => {
        beaches.getAllBeaches()
            .then(beaches => {
                res.json(beaches);
            })
            .catch(err => { throw new Error(err) });
    })
    //delete a beach
    .delete((req, res) => {
        let { beachID } = req.body;
    });

router.route('/:beachID')
    .get((req, res) => {
        beaches.getBeachData(req.params.beachID)
            .then(surveys => {
                res.json(surveys);
            })
    })

router.route('/surveys/:surveyID')
    //get a specific entry
    .get((req, res) => {
        surveys.getSurvey(req.params.surveyID)
            .then(survey => res.json(survey));
    })
    //find a specific entry and edit it
    .put((req, res) => {
        entries.findById(req.params.entryid, function(err, entryData) {
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
    })
    //delete an entry
    .delete((req, res) => {
        entries.remove({ _id: req.params.entryid }, function(err, entry) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment has been deleted' })
        })
    });

module.exports = { router };