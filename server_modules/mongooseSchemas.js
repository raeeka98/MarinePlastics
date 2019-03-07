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
    email: {
        type: String,
    },
    org: {
        type: String,
    },
    reason: {
        type: String,
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
    wind: {
        dir: { type: String },
        spd: { type: Number, min: 0 }
    },
    majorUse: String,
    NumOfP: {
        type: Number,
        min: 0,
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
    srsDebrisLength: { type: Number, min: 0 },
    asDebrisLength: { type: Number, min: 0 }
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
};

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
}, { versionKey: false, _id: false })

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
}, { versionKey: false });


let daySurveySchema = new Schema({
    date: { type: Number, index: true, required: true },
    survey: { type: String }
}, { versionKey: false, _id: false })

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
}, { versionKey: false });


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
}, { versionKey: false });

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
}, { versionKey: false });



const trashModel = mongoose.model('Trashes', trashSchema);
const beachModel = mongoose.model('Beaches', beachSchema);
const surveyModel = mongoose.model('Surveys', surveySchema);
const yearSurveyModel = mongoose.model("YearSurveys", yearSurveySchema);
const yearTotalsModel = mongoose.model("YearTotals", yearTotalsSchema);


// const commentModel = mongoose.model('Comment', CommentsSchema);

module.exports = { beachModel, surveyModel, yearSurveyModel, trashModel, yearTotalsModel };
