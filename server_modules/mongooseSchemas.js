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
  MicroDebris: {
    type: Map,
    of: newDataSchema
  },
  srsDebrisLength: { type: Number, required: true, min: 0 },
  asDebrisLength: { type: Number, required: true, min: 0 },
  microDebrisLength: { type: Number, required: true, min: 0 }
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
  this.SRSDebris.forEach((trashData, trash) => {
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
 * Counts the total amount of trash from the accumulation sweep of a survey.
 * Also sets newDebris to an object with types of trash as keys and total trash
 * (fresh + weathered) as values.
 * @param newDebris
 * @return total amount of trash from the accumulation survey
 */
surveySchema.methods.getASTotal = function(newDebris) {
  let total = 0;
  this.ASDebris.forEach((trashData, trash) => {
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

/**
 * Counts the total amount of trash from the micro debris. Also sets newDebris
 * to an object with types of trash as keys and total trash
 * (fresh + weathered) as values. Even though there should only be one type of
 * trash in micro debris, this keeps the same format as in the other two types
 * of debris for simplicity.
 * @param newDebris
 * @return total amount of trash from micro debris
 */
surveySchema.methods.getMDSTotal = function (newDebris) {
  let total = 0;
  this.MicroDebris.forEach((trashData, trash) => {
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

/**
 * Returns the total amount of trash from a survey, both from the surface rib
 * scan, the accumulation survey, and the micro debris.
 * @return total amount of trash
 */
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
  this.MicroDebris.forEach((trashData, trash) => {
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

/**
 * Gets the total amount of trash from a survey as a negative number, for
 * convenience. Gets total trash from surface rib scan, the accumulation
 * survey, and the micro debris.
 * @return total number of trash as a negative number
 */
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
  this.MicroDebris.forEach((trashData, trash) => {
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

// stores the total trash collected on a certain date, both SRS, AS, and MDS
let dayTotalsSchema = new Schema({
  date: { type: Number, index: true },
  AST: { type: Number, required: true, default: 0, min: 0 },
  MDST: { type: Number, required: true, default: 0, min: 0 },
  SRST: { type: Number, required: true, default: 0, min: 0 }
}, { versionKey: false, _id: false, validateBeforeSave: false })

// stores total trash collected each month in a year, each number is a month
let yearTotalsSchema = new Schema({
  "m0": { type: [dayTotalsSchema], default: undefined },
  "m1": { type: [dayTotalsSchema], default: undefined },
  "m2": { type: [dayTotalsSchema], default: undefined },
  "m3": { type: [dayTotalsSchema], default: undefined },
  "m4": { type: [dayTotalsSchema], default: undefined },
  "m5": { type: [dayTotalsSchema], default: undefined },
  "m6": { type: [dayTotalsSchema], default: undefined },
  "m7": { type: [dayTotalsSchema], default: undefined },
  "m8": { type: [dayTotalsSchema], default: undefined },
  "m9": { type: [dayTotalsSchema], default: undefined },
  "m10": { type: [dayTotalsSchema], default: undefined },
  "m11": { type: [dayTotalsSchema], default: undefined },
}, { versionKey: false, validateBeforeSave: false });

// stores a survey along with the date the data was collected
let daySurveySchema = new Schema({
  date: { type: Number, index: true, required: true },
  survey: { type: String }
}, { versionKey: false, _id: false, validateBeforeSave: false })

// stores surveys done each month in a year, each number is a month
let yearSurveySchema = new Schema({
  "m0": { type: [daySurveySchema], default: undefined },
  "m1": { type: [daySurveySchema], default: undefined },
  "m2": { type: [daySurveySchema], default: undefined },
  "m3": { type: [daySurveySchema], default: undefined },
  "m4": { type: [daySurveySchema], default: undefined },
  "m5": { type: [daySurveySchema], default: undefined },
  "m6": { type: [daySurveySchema], default: undefined },
  "m7": { type: [daySurveySchema], default: undefined },
  "m8": { type: [daySurveySchema], default: undefined },
  "m9": { type: [daySurveySchema], default: undefined },
  "m10": { type: [daySurveySchema], default: undefined },
  "m11": { type: [daySurveySchema], default: undefined },
}, { versionKey: false, validateBeforeSave: false });

// stores data on a beach for auto fill, and for the surveys done on the beach
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

// data on a type of trash
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

module.exports = {
  beachModel,
  surveyModel,
  yearSurveyModel,
  trashModel,
  yearTotalsModel
};