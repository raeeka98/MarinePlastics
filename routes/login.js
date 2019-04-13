'use strict';
let {users} = require('../server_modules/mongoose');
let router = require('express').Router();

/** 
 * @param {Promise} fn
 */

let asyncHandler = fn => 
    (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }

router.route('/:userID')
    /* Create the new user schema */
    .post(asyncHandler(async(req, res) => {
        let userID = req.params.userID;
        let createdUser = await users.addUser(userID);
        res.json({res: "Successfully added user", userData: createdUser})
    }))

    .get(asyncHandler(async(req, res) => {
        let userID = req.params.userID;
        let userData = await users.getUserInfo(userID);
        res.json(userData);
    }));

module.exports = {router};