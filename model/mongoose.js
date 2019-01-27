'use strict';
//import dependency
var mongoose = require('mongoose');
mongoose.connect(mongoDB, { useMongoClient: true })
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
const db = mongoose.connection;
let Schema = mongoose.Schema;
const mongoDB = 'mongodb://db:db@ds143221.mlab.com:43221/heroku_h3hh7swq';

var dataSchema = new Schema({
    name: String,
    fresh: Number,
    weathered: Number,
});

var tideSchema = new Schema({
    type: String,
    time: String,
    height: Number,
});

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CommentsSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
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
    lastTide: tideSchema,
    nextTide: tideSchema,
    windDir: String,
    windSpeed: Number,
    majorUse: String,
    weight: Number,
    NumberOfPeople: Number,
    SRSData: [dataSchema],
    SRSTotal: Number,
    ASData: [dataSchema],
    ASTotal: Number,
});

const commentModel = mongoose.model('Comment', CommentsSchema);

//export our module to use in server.js
module.exports = { commentModel, db };