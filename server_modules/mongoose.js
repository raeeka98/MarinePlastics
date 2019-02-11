'use strict';
//import dependency
var mongoose = require('mongoose');
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
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
    input_date: {
        type: String,
        required: true,
        unique: true
    },
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
}, { versionKey: false });

let surveySchema = new Schema({
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
    subDate: { type: String, required: true },
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
    SRSData: {
        type: Map,
        of: newDataSchema
    },
    ASData: {
        type: Map,
        of: newDataSchema
    },
    srsDataLength: { type: Number, required: true, min: 0 },
    asDataLength: { type: Number, required: true, min: 0 }
}, { versionKey: false })


let beachSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true
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
        of: {
            type: Schema.Types.ObjectId,
            ref: 'Surveys'
        }
    },
    numOfSurveys: {
        type: Number,
        default: function() {
            return this.surveys.size();
        },
        min: 0
    },
    stats: statisticsSchema
}, { versionKey: false });

let statisticsSchema = new Schema({
    ASTotals: {
        type: Map,
        of: Number
    },
    SRSTotals: {
        type: Map,
        of: Number
    },
    typesOfDebrisFound: {
        type: Map,
        of: Number
    },
    lastUpdated: {
        type: Number,
        default: null
    }
}, { versionKey: false, _id: false });

const beachStats = mongoose.model('BeachStats', statisticsSchema)
const beachModel = mongoose.model('Beaches', beachSchema);
const surveyModel = mongoose.model('Surveys', surveySchema);

const commentModel = mongoose.model('Comment', CommentsSchema);

Date.prototype.toUTCDateString = function() {
    this.setUTCHours(0, 0, 0, 0);
    return `${this.getUTCFullYear()}-${this.getUTCMonth()+1}-${this.getUTCDate()} `;
};


/*--------------database helpers-------------------*/

let surveys = {
    remove: async function(beachID, surveyID, epochDateOfSubmit) {
        let key = `surveys.${epochDateOfSubmit}`
        let update = {
            $unset: {
                [key]: 1
            },
            $inc: { numOfSurveys: -1 }
        };
        try {
            let removeFromBeach = await beachModel.findByIdAndUpdate(beachID, update, { new: true }).exec();
            console.log(removeFromBeach);

            let removedSurvey = surveyModel.findByIdAndDelete(surveyID).exec();
            const res = await Promise.all([removeFromBeach, removedSurvey]);
            return res;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting surveys: ' + err.message);
        }
    },

    update: async function(surveyID, beachID, updatedSurvey) {
        let update = {
            $set: { updatedSurvey }
        };
        let newSurvey;
        try {
            newSurvey = await surveyModel.findByIdAndUpdate(surveyID, update, { new: true }).exec();

        } catch (err) {
            console.log(err);
            throw new Error('Error while updating survey: ' + err.message);
        }

    },
    addToBeach: async function(surveyData, beachID, epochDateOfSubmit) {
        let survey = new surveyModel();
        let key = `surveys.${epochDateOfSubmit}`;
        let update = {
            $set: {
                [key]: survey._id
            },
            $inc: { numOfSurveys: 1 }
        };

        for (const entryName in surveyData) {
            const data = surveyData[entryName];
            survey[entryName] = data;
        }
        try {
            await survey.save();
        } catch (err) {
            console.log(err);
            throw new Error('Error while saving survey: ' + err.message);
        }

        try {
            let newBeach = await beachModel.findByIdAndUpdate(beachID, update, { new: true, }).exec();
            return newBeach;
        } catch (err) {
            console.log(err);
            throw new Error('Error while saving to beach: ' + err.message);
        }
    },
    get: async function(surveyID) {
        return await surveyModel.findById(surveyID).exec();
    }

}

let beaches = {
    updateStats: async function(beachID, diffPayload) {
        let update = {};
        update.$inc = {
            stats: {
                [`ASTotals.${diffPayload.date}`]: diffPayload.ASDiff,
                [`SRSTotals.${diffPayload.date}`]: diffPayload.SRSDiff,
                typesOfDebrisFound: {
                    ...diffPayload.newDebris
                }
            }
        }
        try {
            let updatedStats = await beachModel.findByIdAndUpdate(beachID, update, { upsert: true, new: true }).exect();
            return updatedStats;
        } catch (err) {
            console.log(err);
            throw new Error(`Error while updating Stats of beachID ${beachID}: ${err.message}`);
        }

    },



    create: async function(beachData) {
        let location = new beachModel();
        for (const key in beachData) {
            const data = beachData[key];
            location[key] = data;
        }
        try {
            let beachRt = await location.save();
            return beachRt._id;
        } catch (err) {
            console.log(err);
            throw new Error('Error in saving beach: ' + err.message);

        }
    },


    delete: async function(beachID) {
        try {
            let removedBeach = await beachModel.findByIdAndDelete(beachID).exec();
            let entries = [...removedBeach.entries.values()];
            await surveyModel.deleteMany({ _id: { $in: entries } });

        } catch (err) {
            console.log(err);
            throw new Error('Error in deleting beach: ' + err.message);
        }
    },

    getAll: async function() {
        return await beachModel.find().exec();
    },

    getSurveys: async function(beachID) {
        return await beachModel.findById(beachID, 'surveys').populate('surveys').exec();
    }
}





//export our module to use in server.js
module.exports = {
    beaches,
    surveys
};