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
        required: true,
        index: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    entries: {
        type: Map,
        of: {
            type: Schema.Types.ObjectId,
            ref: 'Entries'
        }
    },
    numOfEntries: {
        type: Number,
        default: 0,
        min: 0
    }
}, { versionKey: false });


const beachModel = mongoose.model('Beaches', beachSchema);
const entryModel = mongoose.model('Entries', entrySchema);

const commentModel = mongoose.model('Comment', CommentsSchema);

Date.prototype.toUTCDateString = function() {
    this.setUTCHours(0, 0, 0, 0);
    return `${this.getUTCFullYear()}-${this.getUTCMonth()+1}-${this.getUTCDate()} `;
};

// beach.entries.set(`${new Date().toUTCDateString()}`, entry._id);

// entry.save()
//     .then(entry => {
//         console.log(entry);
//         return beach.save()
//             .then(beach => {
//                 console.log(beach);
//             })
//     })
//     .then(() => {
//         beachModel.findById(beach._id)
//             .populate('entries')
//             .exec()
//             .then(beach => {
//                 console.log(beach);
//                 console.log(beach.entries);

//             });
//     })
let beach = {
    name: 'test beach',
    lat: 123,
    lon: 456,
    entries: {}
}

let entry = {
    user: 'Noll',
    email: 'Test@mail.com',
    org: 'UCSC',
    reason: 'To test',
    SRSData: {
        dirt: {}
    }
}

async function test (beach, entry) {
    let beachID, entryID;
    try {
        beachID = await createBeach(beach);
        entryID = await createEntry(entry);
        let date = new Date().setHours(0, 0, 0, 0);
        let newBeach = await AddEntryToBeach(beachID, date, entryID);
        console.log(newBeach);

        console.log(`${beachID} ${entryID}`);
    } catch (err) {
        console.log(err);
    }
}
async function test1 (entry) {
    let entryID;
    try {
        entryID = await createEntry(entry);
        let date = new Date().getTime();
        let newBeach = await AddEntryToBeach("5c5e5a298670b02e1ba700eb", date, entryID);
        console.log(newBeach);
    } catch (err) {
        console.log(err);
    }
}
// test(beach, entry)
// test1(entry)
// deleteEntry("5c5e5a298670b02e1ba700eb", 1549689034671, "5c5e60b5cd674a2e8d69a697");

// createBeach(beach).then(() => createEntry(entry)).then(beachid => {
//     console.log(beachid);
//     return AddEntry(beachid, new Date().getTime(), );
// })

async function AddEntryToBeach (beachID, epochdate, newEntryID) {
    let key = `entries.${epochdate}`;
    let update = {
        $set: {
            [key]: newEntryID
        },
        $inc: { numOfEntries: 1 }
    };
    try {
        let newBeach = await beachModel.findByIdAndUpdate(beachID, update, { new: true, }).exec();
        return newBeach;
    } catch (err) {
        console.log(err);
        throw new Error('Error while saving to beach');
    }
}

async function deleteEntry (beachID, epochdate, entryID) {
    let key = `entries.${epochdate}`
    let update = {
        $unset: {
            [key]: 1
        },
        $inc: { numOfEntries: -1 }
    };
    try {
        let removeFromBeach = await beachModel.findByIdAndUpdate(beachID, update, { new: true }).exec();
        console.log(removeFromBeach);

        let removeEntry = entryModel.findByIdAndDelete(entryID).exec();
        const res = await Promise.all([removeFromBeach, removeEntry]);
        return res;
    } catch (error) {
        console.log(error);
        throw new Error('Error while deleting entry');
    }
}

async function createEntry (survey) {
    let entry = new entryModel();
    for (const entryName in survey) {
        const data = survey[entryName];
        entry[entryName] = data;
    }
    try {
        let entryRt = await entry.save();
        return entryRt._id;
    } catch (err) {
        console.log(err);
        throw new Error('Error while saving');
    }
}

async function createBeach (beachData) {
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
        throw new Error('Error in saving beach');

    }
}

// deleteBeach("5c5e5a298670b02e1ba700eb");

async function deleteBeach (beachID) {
    try {
        let removedBeach = await beachModel.findByIdAndDelete(beachID).exec();
        let entries = [...removedBeach.entries.values()];
        await entryModel.deleteMany({ _id: { $in: entries } });

    } catch (err) {
        console.log(err);
        throw new Error('Error in deleting beach');
    }
}





//export our module to use in server.js
module.exports = { beachModel, entryModel, db };