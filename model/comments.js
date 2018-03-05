//mode/comments.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CommentsSchema = new Schema({
	user_id: String,
	date: String,
	beach: String,
	reason: String,
	st: String,
	lat: Number,
	lon: Number,
	slope: String,
	nroName: String,
	nroDist: Number,
	nroFlow: String,
	nroOut: String,
	aspect: String,
	weather: String,
	lastTide: String,
	nextTide: String,
	windDir: String,
	majorUse: String
});

//export our module to use in server.js
module.exports = mongoose.model('Comment', CommentsSchema);
