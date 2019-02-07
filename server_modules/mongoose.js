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

let entrySchema = new Schema({
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
    nroName: String,
    nroDist: { type: Number, min: 0 },
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
    }
}, { versionKey: false })


let beachSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    entryDates: [{
        _id: false,
        date: {
            type: Date,
            required: true,
            unique: true
        },
        entries: [{
            type: Schema.Types.ObjectId,
            ref: 'Entries'
        }]
    }]
}, { versionKey: false });


const beachModel = mongoose.model('Beaches', beachSchema);
const entryModel = mongoose.model('Entries', entrySchema);

const commentModel = mongoose.model('Comment', CommentsSchema);

let entry = new entryModel({
    user: 'Noll',
    email: 'Test@mail.com',
    org: 'UCSC',
    reason: 'To test',
    SRSData: {
        dirt: {}
    }
});
let beach = new beachModel({
    name: 'test beach',
    lat: 123,
    lon: 456,
    entryDates: [{
        date: new Date(),
        entries: [entry._id]
    }]
})

// entry.save()
//     .then(entry => {
//         console.log(entry);
//         return beach.save()
//             .then(beach => {
//                 console.log(beach);
//                 console.log(beach.entryDates);
//             })
//     });

beachModel.findById("5c5be6645b790130b48ff889")
    .populate('entryDates.entries')
    .exec()
    .then(beach => {
        console.log(beach);
        console.log(beach.entryDates[0]);

        console.log(beach.entryDates[0].entries[0]);

    })



//export our module to use in server.js
module.exports = { beachModel, entryModel, db };