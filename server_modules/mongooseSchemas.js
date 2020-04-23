/**
 * mongooseSchemas.js
 * Creates schemas that define what collections can be added to the database,
 * and some functions that can be used on these collections.
 */
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

// includes total number of a type of trash for a survey (fresh and weathered)
let newDataSchema = new Schema({
    fresh: { type: Number },
    weathered: { type: Number }
}, { versionKey: false, _id: false, validateBeforeSave: false });

// defines the substrate options for a survey
let substrateTypeSchema = new Schema({
    s: {
        type: Boolean,
        alias: "sand",
        default: undefined
    },
    p: {
        type: Boolean,
        alias: "pebble",
        default: undefined
    },
    rr: {
        type: Boolean,
        alias: "rip_rap",
        default: undefined
    },
    sea: {
        type: Boolean,
        alias: "seaweed",
        default: undefined
    },
    other: String
}, { versionKey: false, _id: false, validateBeforeSave: false });

// defines the usage options for a survey
let majorUsageSchema = new Schema({
    rec: {
        type: Boolean,
        default: undefined,
        alias: "recreational"
    },
    com: {
        type: Boolean,
        default: undefined,
        alias: "commercial"
    },
    other: String
}, { versionKey: false, _id: false, validateBeforeSave: false });

// defines location reason options for a survey
let locationReason = new Schema({
    prox: {
        type: Boolean,
        default: undefined,
        alias: "proximity"
    },
    // no alias because not using an abbreviation
    debris: {
        type: Boolean,
        default: undefined
    },
    other: String
}, { versionKey: false, _id: false, validateBeforeSave: false })

// defines description of a low or high tide for a survey
var tideSchema = new Schema({
    type: String,
    time: String,
    height: Number,
}, { versionKey: false, _id: false, validateBeforeSave: false });

// defines a survey, and uses the above schemas
let surveySchema = new Schema({
    bID: { type: mongoose.Types.ObjectId, ref: 'Beaches', index: true },
    user: {
        f: {
            type: String,
            alias: "first"
        },
        l: {
            type: String,
            alias: "last"
        },
    },
    userID: String,
    email: {
        type: String,
    },
    org: {
        type: String,
    },
    reason: locationReason,
    survDate: {
        type: Date,
    },
    st: substrateTypeSchema,
    slope: String,
    weight: Number,
    cmpsDir: {
        type: Number,
        alias: "compassDirection"
    },
    lastTide: tideSchema,
    nextTide: tideSchema,
    wind: {
        dir: { type: String },
        spd: { type: Number }
    },
    majorUse: majorUsageSchema,
    numOfP: {
        type: Number,
        alias: "NumberOfPeople"
    },
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
}, { versionKey: false, validateBeforeSave: false });

/**
 * Counts the total amount of trash from the surface rib scan of a survey. Also
 * sets newDebris to an object with types of trash as keys and total trash
 * (fresh + weathered) as values.
 * @param newDebris
 * @return total amount of trash from the surface rib scan
 */
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

/**
 * Counts the total amount of trash from the accumulation sweep of a survey
 */
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
};

// gets the total amount of trash from a survey (SRS and AS)
surveySchema.methods.getAllDebris = function() {
    let allDebris = {};
    this.ASDebris.forEach((trashData, trash) => {
        const trashAmount = trashData.fresh + trashData.weathered;
        if (allDebris.hasOwnProperty(trash)) {
            allDebris[trash] += trashAmount;
        } else {
            allDebris[trash] = trashAmount;
        }
    });
    this.SRSDebris.forEach((trashData, trash) => {
        const trashAmount = trashData.fresh + trashData.weathered;
        if (allDebris.hasOwnProperty(trash)) {
            allDebris[trash] += trashAmount;
        } else {
            allDebris[trash] = trashAmount;
        }
    });
    return allDebris;
};

// gets the total amount of trash from a survey as a negative number
surveySchema.methods.getAllDebrisNeg = function() {
    let allDebris = {};
    this.ASDebris.forEach((trashData, trash) => {
        const trashAmount = trashData.fresh + trashData.weathered;
        if (allDebris.hasOwnProperty(trash)) {
            allDebris[trash] -= trashAmount;
        } else {
            allDebris[trash] = -trashAmount;
        }
    });
    this.SRSDebris.forEach((trashData, trash) => {
        const trashAmount = trashData.fresh + trashData.weathered;
        if (allDebris.hasOwnProperty(trash)) {
            allDebris[trash] -= trashAmount;
        } else {
            allDebris[trash] = -trashAmount;
        }
    });
    return allDebris;
};
let dayTotalsSchema = new Schema({
    date: { type: Number, index: true },
    AST: { type: Number, required: true, default: 0, min: 0 },
    SRST: { type: Number, required: true, default: 0, min: 0 }
}, { versionKey: false, _id: false, validateBeforeSave: false })

let yearTotalsSchema = new Schema({
    "0": { type: [dayTotalsSchema], default: undefined },
    "1": { type: [dayTotalsSchema], default: undefined },
    "2": { type: [dayTotalsSchema], default: undefined },
    "3": { type: [dayTotalsSchema], default: undefined },
    "4": { type: [dayTotalsSchema], default: undefined },
    "5": { type: [dayTotalsSchema], default: undefined },
    "6": { type: [dayTotalsSchema], default: undefined },
    "7": { type: [dayTotalsSchema], default: undefined },
    "8": { type: [dayTotalsSchema], default: undefined },
    "9": { type: [dayTotalsSchema], default: undefined },
    "10": { type: [dayTotalsSchema], default: undefined },
    "11": { type: [dayTotalsSchema], default: undefined },
}, { versionKey: false, validateBeforeSave: false });


let daySurveySchema = new Schema({
    date: { type: Number, index: true, required: true },
    survey: { type: String }
}, { versionKey: false, _id: false, validateBeforeSave: false })

let yearSurveySchema = new Schema({
    "0": { type: [daySurveySchema], default: undefined },
    "1": { type: [daySurveySchema], default: undefined },
    "2": { type: [daySurveySchema], default: undefined },
    "3": { type: [daySurveySchema], default: undefined },
    "4": { type: [daySurveySchema], default: undefined },
    "5": { type: [daySurveySchema], default: undefined },
    "6": { type: [daySurveySchema], default: undefined },
    "7": { type: [daySurveySchema], default: undefined },
    "8": { type: [daySurveySchema], default: undefined },
    "9": { type: [daySurveySchema], default: undefined },
    "10": { type: [daySurveySchema], default: undefined },
    "11": { type: [daySurveySchema], default: undefined },
}, { versionKey: false, validateBeforeSave: false });


let beachSchema = new Schema({
    n: {
        type: String,
        unique: true,
        required: true,
        index: true,
        alias: "name",
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
    lastMod: { type: Date, default: Date.now, index: true },
    nroName: String,
    nroDist: { type: Number, min: 0 },
    numSurvey: { type: Number, min: 0 },
    surveys: {
        type: Map,
        of: { type: mongoose.Types.ObjectId, ref: "YearSurveys" },
        default: {}
    },
    stats: {
        ttls: {
            type: Map,
            of: { type: mongoose.Types.ObjectId, ref: "YearTotals" },
            default: {},
            alias: "totals"
        },
        TODF: {
            type: Map,
            of: { type: Number, default: 0, min: 0 },
            default: {},
            alias: "typesOfDebrisFound"
        },
        lastUp: {
            type: Date,
            default: null,
            alias: "lastUpdated"
        }
    }
}, { versionKey: false, validateBeforeSave: false });

let trashSchema = new Schema({
    trash_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    }
}, { versionKey: false, validateBeforeSave: false });



const trashModel = mongoose.model('Trashes', trashSchema);
const beachModel = mongoose.model('Beaches', beachSchema);
const surveyModel = mongoose.model('Surveys', surveySchema);
const yearSurveyModel = mongoose.model("YearSurveys", yearSurveySchema);
const yearTotalsModel = mongoose.model("YearTotals", yearTotalsSchema);


// const commentModel = mongoose.model('Comment', CommentsSchema);

module.exports = { beachModel, surveyModel, yearSurveyModel, trashModel, yearTotalsModel };