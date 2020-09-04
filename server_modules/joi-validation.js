/**
 * joi-validation.js
 * Used for validating the schemas in mongooseSchemas.js.
 */
let joi = require("joi");

// validates a user has both a first and last name
const userDataSchema = joi.object({
  //first name
  f: joi.string().min(1).max(30).trim().required(),
  //last name
  l: joi.string().min(1).max(30).trim().required()
});

// validates at least one option for substrate type is selected
const substrateTypeSchema = joi.object({
  s: joi.bool(), 
  p: joi.bool(),
  rr: joi.bool(),
  sea: joi.bool(),
  other: joi.string().trim().replace(/\s\s+/, " ")
}).or(["s", "p", "rr", "sea", "other"]);

// validates at least one option for reason is selected
const reasonTypeSchema = joi.object({
  prox: joi.bool(),
  debris: joi.bool(),
  other: joi.string().trim().replace(/\s\s+/, " ")
}).or(["prox", "debris", "other"])
  .error(new Error("Please select one option"));

// validates valid description of the tide
const tideDataSchema = joi.object({
  type: joi.string().valid(['low', 'high']).valid().required(),
  time: joi.string().regex(/^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/)
    .required(),
  height: joi.number().required()
});

// validates at least one option for major use is selected
const majorUseSchema = joi.object({
  rec: joi.bool(),
  com: joi.bool(),
  rem: joi.bool(),
  other: joi.string().trim().replace(/\s\s+/, " ")
}).or(["rec", "com", "rem", "other"]);

// different options for why accumulation survey was not completed
const incompleteSurveySchema = joi.object({
  time: joi.bool(),
  people: joi.bool(),
  area: joi.bool(),
  trash: joi.bool(),
  other: joi.string().trim().replace(/\s\s+/, " ")
});

// validates valid description of the wind
const windDataSchema = joi.object({
  dir: joi.string().valid(["n", "s", "e", "w", "ne", "nw", "se", "sw"])
    .required(),
  spd: joi.number().min(0).required(),
  comment: joi.string().trim().replace(/\s\s+/, " ").optional()
});

// validate showOthersSchema
const showOthersSchema = joi.object({
  usage: joi.bool().optional(),
  reason: joi.bool().optional(),
  st: joi.bool().optional(),
  incompleteSurvey: joi.bool().optional()
});

// validates trash type has both fresh and weathered
const debrisData = joi.array().items(
  joi.string().required(),
  joi.object().keys({
    fresh: joi.number().integer().min(0).required(),
    weathered: joi.number().integer().min(0).required()
  }).required()
);

// validates survey data has correct format
const surveyDataSchema = joi.object({
  user: userDataSchema.required(),
  email: joi.string().email({ minDomainAtoms: 2 }).required(),
  userID: joi.string().trim().min(3).alphanum().required(),
  org: joi.string().trim().min(1).max(60).replace(/\s\s+/, " ").required()
    .error(new Error("Error in organization name")),
  reason: reasonTypeSchema.required(),
  survDate: joi.date().max('now').greater(1104580800).required(),
  st: substrateTypeSchema.required(),
  slope: joi.string().valid(["winter", "summer"]).required(),
  cmpsDir: joi.number().max(360).min(0).required(),
  lastTide: tideDataSchema.required(),
  nextTide: tideDataSchema.required(),
  wind: windDataSchema.required(),
  majorUse: majorUseSchema.required(),
  incompleteSurvey: incompleteSurveySchema.optional(),
  showOthers: showOthersSchema.optional(),
  //number of people
  numOfP: joi.number().min(0).required(),
  SRSDebris: joi.array().items(debrisData).max(18).optional(),
  ASDebris: joi.array().items(debrisData).max(18).optional(),
  MicroDebris: joi.array().items(debrisData).max(1).optional()
});

// validates beach has correct information for autofill
const beachDataSchema = joi.object({
  //name
  n: joi.string().trim().replace(/\s\s+/, " ").max(40).required(),
  lat: joi.number().min(-85).max(85).required(), 
  lon: joi.number().min(-180).max(180).required(),
  nroName: joi.string().trim().replace(/\s\s+/, " ").max(40).required(),
  nroDist: joi.number().min(0).required()
});

// verifies survey comes with data on new beach or ID on old beach
const bodySchema = joi.object({
  bID: joi.string().alphanum(),
  survData: surveyDataSchema.required(),
  beachData: beachDataSchema
}).xor('bID', 'beachData');

module.exports = {
  beachValidation: beachDataSchema,
  surveyValidation: bodySchema
}

// let dataTest = {
//     bID: "5c74f1bc71992a56a570d485",
//     survData: {
//         user: {
//             f: "pTesp",
//             l: "ter"
//         },
//         userID: "5c631395fafc067adaa77d55",
//         email: "asd@gmail.com",
//         org: "yo",
//         reason: {
//             prox: true,
//             other: "ye"
//         },
//         survDate: Date.now(),
//         st: {
//             s: true,
//             rr: true
//         },
//         slope: "winter",
//         cmpsDir: "100",
//         lastTide: {
//             type: "low",
//             time: "03:33",
//             height: "5"
//         },
//         nextTide: {
//             type: "low",
//             time: "03:33",
//             height: "5"
//         },
//         wind: {
//             dir: "n",
//             spd: 6
//         },
//         majorUse: {
//             rec: "true",
//             com: undefined,
//             other: undefined
//         },
//         numOfP: "6",
//         SRSDebris: {
//             plastic: { fresh: "4", weathered: "9" }
//         },
//         ASDebris: {
//             miscPlastic: { fresh: "2", weathered: "5" }
//         }
//     }
// }
