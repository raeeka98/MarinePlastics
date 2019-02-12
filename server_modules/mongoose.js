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
    surveys: [{
        _id: false,
        subDate: {
            type: Date,
            required: true,
            index: true,
            unique: true
        },
        survey: {
            type: Schema.Types.ObjectId,
            ref: 'Surveys'
        }
    }],
    stats: statisticsSchema
}, { versionKey: false });




const beachModel = mongoose.model('Beaches', beachSchema);
const surveyModel = mongoose.model('Surveys', surveySchema);

const commentModel = mongoose.model('Comment', CommentsSchema);

Date.prototype.toUTCDateString = function() {
    this.setUTCHours(0, 0, 0, 0);
    return `${this.getUTCFullYear()}-${this.getUTCMonth()+1}-${this.getUTCDate()} `;
};


/*--------------database helpers-------------------*/

let surveys = {
    find: async function(surveyID) {
        let survey;
        try {
            survey = await surveys.findById(surveyID).exec();
        } catch (err) {
            console.error(err);
            throw new Error(`Error while finding survey ${surveyID} :  ${err.message}`);
        }

    },
    remove: async function(beachID, surveyID, epochDateOfSubmit) {
        let update = {
            $pull: {
                surveys: {
                    subDate: new Date(epochDateOfSubmit)
                }
            }
        };
        try {
            let removeFromBeach = beachModel.findByIdAndUpdate(beachID, update, { new: true }).exec();
            let removedSurvey = surveyModel.findByIdAndDelete(surveyID).exec();
            const res = await Promise.all([removeFromBeach, removedSurvey]);
            return res;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting surveys: ' + err.message);
        }
    },


    update: async function(surveyID, updatedFields) {
        let update = {
            $set: { ...updatedFields }
        };
        console.log(update);

        let newSurvey;
        try {
            newSurvey = await surveyModel.findByIdAndUpdate(surveyID, update, { new: true }).exec();
            return newSurvey;
        } catch (err) {
            console.log(err);
            throw new Error('Error while updating survey: ' + err.message);
        }

    },
    addToBeach: async function(surveyData, beachID, epochDateOfSubmit) {
        let survey = new surveyModel(surveyData);
        let surveyEntryData = {
            subDate: new Date(epochDateOfSubmit),
            survey: survey._id
        }
        let update = {
            $push: {
                surveys: surveyEntryData
            }
        };
        try {
            await survey.save();
        } catch (err) {
            console.log(err);
            throw new Error('Error while saving survey: ' + err.message);
        }
        let { SRSData, ASData } = surveyData;
        let updatePayload = {
            date: epochDateOfSubmit,
            ASDiff: 0,
            SRSDiff: 0,
            newDebris: {}
        };
        for (const trash in SRSData) {
            const trashAmount = SRSData[trash];
            let trashTotal = trashAmount.fresh + trashAmount.weathered;
            updatePayload.SRSDiff += trashTotal;
            if (updatePayload.hasOwnProperty(trash)) {
                updatePayload.newDebris[trash] += trashTotal;
            } else {
                updatePayload.newDebris[trash] = trashTotal;
            }
        }
        for (const trash in ASData) {
            const trashAmount = ASData[trash];
            let trashTotal = trashAmount.fresh + trashAmount.weathered;
            updatePayload.SRSDiff += trashTotal;
            if (updatePayload.hasOwnProperty(trash)) {
                updatePayload.newDebris[trash] += trashTotal;
            } else {
                updatePayload.newDebris[trash] = trashTotal;
            }
        }
        console.log(updatePayload);

        try {
            await beachModel.findByIdAndUpdate(beachID, update, { new: true }).exec();
            let survey = await beaches.updateStats(beachID, updatePayload);
            console.log(survey);

            return survey._id;
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
    updateStats: async function(beachID, updatePayload) {
        let update = {};
        update.$inc = {
            stats: {
                //epoch date
                [`ASTotals.${updatePayload.date}`]: updatePayload.ASDiff,
                [`SRSTotals.${updatePayload.date}`]: updatePayload.SRSDiff,
                typesOfDebrisFound: {
                    ...updatePayload.newDebris
                }
            }
        }
        console.log(update);

        try {
            let updatedStats = await beachModel.findByIdAndUpdate(beachID, update, { upsert: true, new: true }).exec();
            return updatedStats;
        } catch (err) {
            console.log(err);
            throw new Error(`Error while updating Stats of beachID ${beachID}: ${err.message}`);
        }

    },

    create: async function(beachData) {
        let location = new beachModel(beachData);
        try {
            let beachRt = await location.save();
            return beachRt;
        } catch (err) {
            console.log(err);
            throw new Error('Error in saving beach: ' + err.message);

        }
    },

    getStats: async function(beachID) {
        let stats;
        try {
            stats = await beachModel.findById(beachID, "stats").exec();
            return stats;
        } catch (error) {
            console.error(error);
            throw new Error(`Error in obtaining stats beachID ${beachID}: ${error.message}`);
        }
    },
    remove: async function(beachID) {
        try {
            let removedBeach = await beachModel.findByIdAndDelete(beachID, { select: "surveys.survey" }).exec();
            console.log(`removal beach ${removedBeach}`);
            let removedSurveys = removedBeach.surveys.map(obj => obj.survey);
            await surveyModel.deleteMany({ _id: { $in: removedSurveys } });

        } catch (err) {
            console.log(err);
            throw new Error('Error in deleting beach: ' + err.message);
        }
    },

    getAll: async function() {
        return await beachModel.find({}, "-stats").exec();
    },

    getAllSurveys: async function(beachID) {
        try {
            console.log(beachID);

            let surveys = await beachModel.findById(beachID, 'surveys').populate('surveys.survey').exec();
            return surveys;
        } catch (err) {
            console.error(err);
            throw new Error(`Failed to obtain all surveys for beach ${beachID}: ` + err.message);
        }
    },
    getSurveysInRange: async function(beachID, skip, limit) {
        return await beachModel.findById(beachID, 'surveys', { surveys: { $slice: [skip, limit] } }).populate('surveys.survey').exec();
    }
}

async function test1 () {
    let sur = {
        user: "Noll",
        email: "t@b.com",
        org: "testers",
        reason: "testing",
        st: "yes",
        slope: "sloppy",
        aspect: "hmm",
        lastTide: {
            type: "tidey",
            time: "3/2/2019",
            height: 4
        },
        nextTide: {
            type: "tidey",
            time: "3/2/2019",
            height: 4
        },
        windDir: "south",
        windSpeed: 4,
        majorUse: "test stuff",
        weight: 10,
        NumberOfPeople: 4,
        SRSData: {
            "plastic": {
                fresh: 4,
                weathered: 2
            },
            "misc": {
                fresh: 2,
                weathered: 1
            }
        },
        ASData: {
            "miscPlastic": {
                fresh: 5,
                weathered: 2
            },
            "misc": {
                fresh: 2,
                weathered: 1
            }
        },
        srsDataLength: 2,
        asDataLength: 2
    };
    let subDate = new Date().getTime();
    let sID = await surveys.addToBeach(sur, "5c629dd66f082667ddd57a02", subDate);
    // let b = await beaches.getAll();
    // console.log(b[0]._id);
    // let s = await beaches.getAllSurveys(b[0]._id);
    // console.log(s);


}

test1();



//export our module to use in server.js
module.exports = {
    beaches,
    surveys
};