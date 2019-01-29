const { commentModel: Comment } = require('../model/mongoose');
let router = require('express').Router();

router.route('/')
    .get((req, res) => {
        Comment.find(function(err, comments) {
            if (err) res.send(err);
            //responds with a json object of our database comments.
            res.json(comments)
        });
    })
    .post((req, res) => {
        let newDataSheet = req.body;
        var dataSheet = new Comment();
        for (const entry in newDataSheet) {
            const data = newDataSheet[entry];
            comment[entry] = data;
        }
        dataSheet.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment successfully added!' });
        });
    });

router.route('/:id')
    .get((req, res) => {
        Comment.findById(req.params.id, function(err, comment) {
            res.json({ comment });
        });
    })
    .put((req, res) => {
        Comment.findById(req.params.id, function(err, dataSheet) {
            if (err) res.send(err);
            //setting the new beach and reason to whatever was changed. If nothing was changed
            // we will not alter the field.
            let newDataSheet = res.body;
            for (const entry in newDataSheet) {
                const data = newDataSheet[entry];
                comment[entry] = data;
            }

            //save comment
            comment.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Comment has been updated' });
            });
        });
    })
    .delete((req, res) => {
        Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment has been deleted' })
        })
    })

module.exports = { router };