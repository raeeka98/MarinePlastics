//mode/comments.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema ({
  name: String,
  fresh: Number,
  weathered: Number,
});

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CommentsSchema = new Schema({
	user: String,
	email: String,
	org: String,
	input_date: String,
	date: String,
	beach: String,
	reason: String,
	st: String,
	lat: Number,
	lon: Number,
	slope: String,
	nroName: String,
	nroDist: Number,
	aspect: String,
	lastTide: String,
	nextTide: String,
	windDir: String,
	majorUse: String,
  weight: Number,
	NumberOfPeople: Number,
  SRSData: [ dataSchema ],
  SRSTotal: Number,
  ASData: [ dataSchema ],
  AStotal: Number,
});

//export our module to use in server.js
module.exports = mongoose.model('Comment', CommentsSchema);
