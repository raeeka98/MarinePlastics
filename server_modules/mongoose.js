let { beachModel, surveyModel } = require('./mongooseSchemas');


/*--------------database helpers-------------------*/

let years = {
    find: async function(surveyID) {
        let survey;
        try {
            survey = await years.findById(surveyID).exec();
        } catch (err) {
            console.error(err);
            throw new Error(`Error while finding survey ${surveyID} :  ${err.message}`);
        }

    },
    remove: async function(beachID, surveyID, epochDateOfSubmit) {
        let dateOfSub = new Date(epochDateOfSubmit);
        let update = {
            $pull: {
                [`surveys.${dateOfSub.getUTCFullYear()}.months.${dateOfSub.getUTCMonth()}`]: {
                    day: dateOfSub.getUTCDate()
                }
            }
        };
        try {
            let removeFromBeach = beachModel.findById(beachID, update, { new: true }).exec();

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

        let oldSurvey;
        try {
            oldSurvey = await surveyModel.findByIdAndUpdate(surveyID, update).exec();
            return oldSurvey;
        } catch (err) {
            console.log(err);
            throw new Error('Error while updating survey: ' + err.message);
        }

    },
    addToBeach: async function(surveyData, beachID, epochDateOfSubmit) {
        let subDate = new Date(epochDateOfSubmit);
        let survey = new surveyModel(surveyData);
        let surveyEntryData = {
            day: subDate.getUTCDate(),
            survey: survey._id
        }
        let update = {
            $push: {
                [`surveys.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: surveyEntryData
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
            reason: 'new',
            date: epochDateOfSubmit,
            oldStats: null,
            ASTotal: 0,
            SRSTotal: 0,
            newDebris: {}
        };
        updatePayload.ASTotal = AddUpData(ASData, updatePayload.newDebris);
        updatePayload.SRSTotal = AddUpData(SRSData, updatePayload.newDebris);

        try {
            let doc = await beachModel.findOneAndUpdate({ _id: beachID }, update, { select: 'stats', new: true }).exec();
            console.log(doc);
            // updatePayload.oldStats = doc.stats;

            // let survey = await beaches.updateStats(beachID, updatePayload);

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

function AddUpData (data, newDebris) {
    let total = 0;
    for (const trash in data) {
        const trashAmount = data[trash];
        let totalAmnt = trashAmount.fresh + trashAmount.weathered;
        total += totalAmnt;
        if (newDebris.hasOwnProperty(trash)) {
            newDebris[trash] += totalAmnt;
        } else {
            newDebris[trash] = totalAmnt;
        }
    }
    return total;
}

let beaches = {
    updateStats: async function(beachID, updatePayload) {
        let update = { $set: {} };
        let subDate = new Date(updatePayload.date);
        if (!updatePayload.oldStats) {
            let doc = await beachModel.findById(beachID, 'stats.typesOfDebrisFound').exec();
            updatePayload.oldStats = doc.stats;
        }
        if (updatePayload.reason === 'new') {
            update.$push = {};
            let { newDebris, ASTotal, SRSTotal, oldStats } = updatePayload;
            console.log(oldStats);
            //new survey
            let res = [];
            let trash = Object.keys(newDebris);
            if (trash.length > 0) {
                update.$set = {};
                if (oldStats.typesOfDebrisFound.has(trash)) {
                    let origAmnt = oldStats.typesOfDebrisFound.get(trash);
                    res.push([trash, trashAmount + origAmnt]);
                } else {
                    res.push([trash, trashAmount]);
                }
            }
            update.$set['stats.typesOfDebrisFound'] = res;
            update.$push[`stats.ASTotals`] = { $sort: { date: -1 }, $each: [{ date: date, total: ASTotal }] };
            update.$push[`stats.SRSTotals`] = { $sort: { date: -1 }, $each: [{ date: date, total: SRSTotal }] };
        } else if (updatePayload.reason === 'edit') {
            //edited survey
            let { changedDebrisValues, newDebrisValues, newASTotal, newSRSTotal, oldStats } = updatePayload;
            let res = [];
            let trash = Object.keys(newDebrisValues);
            if (trash.length > 0) {
                for (let i = 0; i < trash.length; i++) {
                    const trashAmount = newDebrisValues[trash[i]];
                    if (oldStats.typesOfDebrisFound.has(trash[i])) {
                        let origAmnt = oldStats.typesOfDebrisFound.get(trash[i]);
                        res.push([trash[i], trashAmount + origAmnt]);
                    } else {
                        res.push([trash[i], trashAmount]);
                    }
                }
            }
            update.$set['stats.typesOfDebrisFound'] = res;
            let ASUpProm = beachModel.findOneAndUpdate({ "_id": beachID, "stats.ASTotals.date": date }, {
                $set: { "stats.ASTotals.$.total": newASTotal }
            }).exec();
            let SRSUpProm = beachModel.findOneAndUpdate({ "_id": beachID, "stats.SRSTotals.date": date }, {
                $set: { "stats.SRSTotals.$.total": newSRSTotal }
            }).exec();
            await Promise.all([ASUpProm, SRSUpProm]);
        } else {
            //removed survey
            let { remDebris, remASTotal, remSRSTotal, date, oldStats } = updatePayload;

            let trash = Object.keys(remDebris);
            if (trash.length > 0) {
                update.$inc = {};
                for (let i = 0; i < trash.length; i++) {
                    const trashAmount = remDebris[trash[i]];
                    update.$inc[`stats.typesOfDebrisFound.${trash[i]}`] = trashAmount;
                }
            }
            if (remASTotal || remSRSTotal) {
                update.$unset = {};
                if (remASTotal) update.$unset[`stats.ASTotals.${date}`] = 1;
                if (remSRSTotal) update.$unset[`stats.SRSTotals.${date}`] = 1;
            }
        }
        update.$set['stats.lastUp'] = new Date();
        console.log(update);


        try {
            let updatedStats = await beachModel.findByIdAndUpdate(beachID, update, { new: true }).exec();
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
    getStats: async function(beachID, query) {
        let stats;
        let projection;
        if (query.getYear) {
            projection = `stats.ASTotals.${query.year} stats.SRSTotals.${query.year} stats.typesOfDebrisFound stats.lastUp`;
        } else {
            projection = `stats.ASTotals.${query.year}.months.${query.month} stats.SRSTotals.${query.year}.months.${query.month} stats.typesOfDebrisFound stats.lastUp`
        }
        try {
            stats = await beachModel.findById(beachID, projection).exec();
            return stats;
        } catch (error) {
            console.error(error);
            throw new Error(`Error in obtaining stats beachID ${beachID}: ${error.message}`);
        }
    },
    remove: async function(beachID) {
        try {
            let removedBeach = await beachModel.findByIdAndDelete(beachID, { select: "surveys" }).exec();
            console.log(`removal beach ${removedBeach}`);
            await surveyModel.deleteMany({ bID: removedBeach._id }).exec();
        } catch (err) {
            console.log(err);
            throw new Error('Error in deleting beach: ' + err.message);
        }
    },
    get: async function(beachID, surveyYear, surveyMonth, surveysSkip, numOfSurveys) {
        let projection = `name surveys.${surveyYear}.months.${surveyMonth}`;
        return await beachModel.findById(beachID)
            .select(projection)
            .slice(`surveys.${surveyYear}.months.${surveyMonth}`, [surveysSkip, numOfSurveys])
            .exec();
    },
    getMany: async function(skip, limit) {
        let projection = `name surveys.${surveyYear}.months.${surveyMonth}`;
        return await beachModel.find()
            .skip(skip)
            .limit(limit)
            .select(projection)
            .slice(`surveys.${surveyYear}.months.${surveyMonth}`, 10)
            .exec();
    },
    getManyNames: async function() {
        return await beachModel.find({}, `name`).exec();
    },
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
    let subDate = new Date().setUTCHours(0, 0, 0, 0);
    sur.survDate = subDate;
    let sID = await years.addToBeach(sur, "5c629dd66f082667ddd57a02", subDate);
    // let b = await beaches.getAll();
    // console.log(b[0]._id);
    // let s = await beaches.getAllSurveys(b[0]._id);
    // console.log(s);


}

test1();


//export our module to use in server.js
module.exports = {
    beaches,
    surveys: years
};