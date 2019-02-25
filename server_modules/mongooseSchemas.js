'use strict';
//import dependency
var mongoose = require('mongoose');
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 5000
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
let Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: { type: String, required: true },
    fresh: Number,
    weathered: Number,
}, { versionKey: false, _id: false });

let newDataSchema = new Schema({
    fresh: { type: Number, default: 0, min: 0 },
    weathered: { type: Number, default: 0, min: 0 }
}, { versionKey: false, _id: false });


var tideSchema = new Schema({
    type: String,
    time: String,
    height: Number,
}, { versionKey: false, _id: false });

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
// var CommentsSchema = new Schema({
//     user: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     org: String,
//     input_date: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     date: String,
//     beach: String,
//     reason: String,
//     st: String,
//     lat: Number,
//     lon: Number,
//     slope: String,
//     nroName: String,
//     nroDist: Number,
//     aspect: String,
//     lastTide: tideSchema,
//     nextTide: tideSchema,
//     windDir: String,
//     windSpeed: Number,
//     majorUse: String,
//     weight: Number,
//     NumberOfPeople: Number,
//     SRSData: [dataSchema],
//     SRSTotal: Number,
//     ASData: [dataSchema],
//     ASTotal: Number,
// }, { versionKey: false });

let surveySchema = new Schema({
    bID: { type: mongoose.Types.ObjectId, ref: 'Beaches' },
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    survDate: {
        type: Date,
        required: true
    },
    st: String,
    slope: String,
    aspect: String,
    lastTide: tideSchema,
    nextTide: tideSchema,
    windDir: String,
    windSpeed: { type: Number, min: 0 },
    majorUse: String,
    weight: { type: Number, min: 0 },
    NumberOfPeople: { type: Number, min: 0 },
    SRSDebris: {
        type: Map,
        of: newDataSchema
    },
    ASDebris: {
        type: Map,
        of: newDataSchema
    },
    srsDebrisLength: { type: Number, required: true, min: 0 },
    asDebrisLength: { type: Number, required: true, min: 0 }
}, { versionKey: false });

surveySchema.methods.getSRSTotal = function(newDebris) {
    let total = 0;
    this.SRSDebris.forEach((trashData, trash, map) => {
        const trashAmount = trashData.fresh + trashData.weathered;
        total += trashAmount;
        if (newDebris.hasOwnProperty(trash)) {
            newDebris[trash] += trashAmount;
        } else {
            newDebris[trash] = trashAmount;
        }
    });
    return total;
}
surveySchema.methods.getASTotal = function(newDebris) {
    let total = 0;
    this.ASDebris.forEach((trashData, trash, map) => {
        const trashAmount = trashData.fresh + trashData.weathered;
        total += trashAmount;
        if (newDebris.hasOwnProperty(trash)) {
            newDebris[trash] += trashAmount;
        } else {
            newDebris[trash] = trashAmount;
        }
    });
    return total;
}

let dayTotalsSchema = new Schema({
    day: { type: Number, index: true },
    total: { type: Number, required: true, default: 0, min: 0 }
}, { versionKey: false, _id: false })

let yearTotalsSchema = new Schema({
    _id: false,
    "0": [dayTotalsSchema],
    "1": [dayTotalsSchema],
    "2": [dayTotalsSchema],
    "3": [dayTotalsSchema],
    "4": [dayTotalsSchema],
    "5": [dayTotalsSchema],
    "6": [dayTotalsSchema],
    "7": [dayTotalsSchema],
    "8": [dayTotalsSchema],
    "9": [dayTotalsSchema],
    "10": [dayTotalsSchema],
    "11": [dayTotalsSchema],
});


let statisticsSchema = new Schema({
    AST: {
        type: Map,
        of: yearTotalsSchema,
    },
    SRST: {
        type: Map,
        of: yearTotalsSchema,
    },
    TODF: {
        type: Map,
        of: { type: Number, required: true, min: 0 },
        default: {},
        alias: "typesOfDebrisFound"
    },
    lastUp: {
        type: Date,
        default: null,
        alias: "lastUpdated"
    }
}, { versionKey: false, _id: false });


let daySurveySchema = new Schema({
    day: { type: Number, index: true, unique: true },
    survey: {
        type: Schema.Types.ObjectId,
        ref: 'Surveys'
    }
}, { versionKey: false, _id: false })

let yearSurveySchema = new Schema({
    "0": [daySurveySchema],
    "1": [daySurveySchema],
    "2": [daySurveySchema],
    "3": [daySurveySchema],
    "4": [daySurveySchema],
    "5": [daySurveySchema],
    "6": [daySurveySchema],
    "7": [daySurveySchema],
    "8": [daySurveySchema],
    "9": [daySurveySchema],
    "10": [daySurveySchema],
    "11": [daySurveySchema],
}, { versionKey: false, _id: false });


let beachSchema = new Schema({
    n: {
        type: String,
        unique: true,
        required: true,
        index: true,
        alias: "name"
    },
    lat: {
        type: Number,
        required: true,
        min: -85,
        max: 85
    },
    lon: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    nroName: String,
    nroDist: { type: Number, min: 0 },
    surveys: {
        type: Map,
        of: yearSurveySchema,
        default: {}
    },
    stats: statisticsSchema
}, { versionKey: false });

let trashSchema = new Schema({
  trash_id: {
      type: String,
      unique: true,
      required: true
  },
  name : {
     type: String,
     unique: true,
     required: true
  }
}, { versionKey: false });



const trashModel = mongoose.model('Trashes', trashSchema);
const beachModel = mongoose.model('Beaches', beachSchema);
const surveyModel = mongoose.model('Surveys', surveySchema);

// const commentModel = mongoose.model('Comment', CommentsSchema);

module.exports = { beachModel, surveyModel, trashModel };
