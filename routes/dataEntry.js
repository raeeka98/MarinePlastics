let { beachModel: beach, entryModel: entries } = require('../server_modules/mongoose');
let router = require('express').Router();

router.route('/')
    //get all beaches
    .get((req, res) => {
        beach.find(function(err, beaches) {
            if (err) res.send(err);
            console.log(beaches);

            //responds with a json object of our database comments.
            res.json(beaches)
        });
    })
    //delete a beach
    .delete((req, res) => {
        let { beachID } = req.body;
    });

router.route('/:entryid')
    //get a specific entry
    .get((req, res) => {
        entries.findById(req.params.entryid, function(err, entry) {
            res.json({ entry });
        });
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