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
            newDebris: {},
            newYear: false
        };
        updatePayload.ASTotal = AddUpData(ASData, updatePayload.newDebris);
        updatePayload.SRSTotal = AddUpData(SRSData, updatePayload.newDebris);

        try {
            let doc = await beachModel.findById({ _id: beachID, [`surveys.${subDate.getUTCFullYear()}`]: { $exists: true } }, 'surveys').exec();
            console.log(doc);
            let update = {};
            if (doc) {
                update.$push = {
                    [`surveys.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: surveyEntryData
                }
            } else {
                updatePayload.newYear = true;
                update.$set = {
                    [`surveys.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: [surveyEntryData]
                }
            }
            let newDoc = await beachModel.findByIdAndUpdate(beachID, update).select('stats.TODF').exec();
            console.log(newDoc);

            updatePayload.oldStats = newDoc.stats;

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
            let projection = `stats.TODF stats.AST.${subDate.getUTCFullYear()}.months,${subDate.getUTCMonth()} stats.SRST.${subDate.getUTCFullYear()}.months,${subDate.getUTCMonth()}`;
            let doc = await beachModel.findById(beachID, projection).exec();
            updatePayload.oldStats = doc.stats;
        }
        if (updatePayload.reason === 'new') {
            let { newDebris, ASTotal, SRSTotal, oldStats, newYear } = updatePayload;
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
            if (newYear) {
                update.$set = {
                    [`stats.AST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: [{ date: subDate.getUTCDate(), total: ASTotal }],
                    [`stats.SRST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: [{ date: subDate.getUTCDate(), total: SRSTotal }],
                    ['stats.typesOfDebrisFound']: res
                }
            } else {
                update.$push = {
                    [`stats.AST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: { date: subDate.getUTCDate(), total: ASTotal },
                    [`stats.SRST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: { date: subDate.getUTCDate(), total: SRSTotal }
                };
                update.$set['stats.typesOfDebrisFound'] = res;
            }
        } else if (updatePayload.reason === 'edit') {
            //edited survey
            let { newDebrisValues, newASTotal, newSRSTotal, oldStats } = updatePayload;
            let res = [];
            let trash = Object.keys(newDebrisValues);
            if (trash.length > 0) {
                for (let i = 0; i < trash.length; i++) {
                    const trashAmount = newDebrisValues[trash[i]];
                    if (oldStats.typesOfDebrisFound.has(trash[i])) {
                        let origAmnt = oldStats.typesOfDebrisFound.get(trash[i]);
                        let newTotal = trashAmount + origAmnt;
                        if (newTotal != 0)
                            res.push([trash[i], newTotal]);
                    } else {
                        res.push([trash[i], trashAmount]);
                    }
                }
            }
            let oldSRSMonth = oldStats.SRST[subDate.getUTCFullYear()].months[subdate.getUTCMonth()];
            let oldASMonth = oldStats.AST[subDate.getUTCFullYear()].months[subdate.getUTCMonth()];
            console.log(oldSRSMonth);
            console.log(oldASMonth);
            let srsIndex, asIndex;
            for (let i = 0; i < oldSRSMonth.length; i++) {
                const SRSday = oldSRSMonth[i];
                const ASday = oldASMonth[i];
                if (SRSday.day === subDate.getUTCDate()) {
                    srsIndex = i;
                }
                if (ASday.day === subDate.getUTCDate()) {
                    asIndex = i;
                }
            }
            update.$set = {
                ['stats.typesOfDebrisFound']: res,
                [`stats.AST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}.${asIndex}`]: newASTotal,
                [`stats.SRST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}.${asIndex}`]: newSRSTotal,
            }
        } else {
            //removed survey
            let { remDebris, remASTotal, remSRSTotal, date, oldStats } = updatePayload;

            let res = [];
            let trash = Object.keys(newDebrisValues);
            if (trash.length > 0) {
                for (let i = 0; i < trash.length; i++) {
                    const trashAmount = newDebrisValues[trash[i]];
                    if (oldStats.typesOfDebrisFound.has(trash[i])) {
                        let origAmnt = oldStats.typesOfDebrisFound.get(trash[i]);
                        let newTotal = trashAmount + origAmnt;
                        if (newTotal != 0)
                            res.push([trash[i], newTotal]);
                    } else {
                        res.push([trash[i], trashAmount]);
                    }
                }
            }
            update.$pull = {
                [`stats.AST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}.date`]: subDate.getUTCDate(),
                [`stats.SRST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}.date`]: subDate.getUTCDate()
            };
            update.$set = {
                ['stats.typesOfDebrisFound']: res
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
            projection = `stats.AST.${query.year} stats.SRST.${query.year} stats.TODF stats.lastUp`;
        } else {
            projection = `stats.AST.${query.year}.months.${query.month} stats.SRST.${query.year}.months.${query.month} stats.TODF stats.lastUp`
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
        let projection = `n surveys.${surveyYear}.months.${surveyMonth}`;
        return await beachModel.findById(beachID)
            .select(projection)
            .slice(`surveys.${surveyYear}.months.${surveyMonth}`, [surveysSkip, numOfSurveys])
            .exec();
    },
    getMany: async function(skip, limit) {
        let projection = `n surveys.${surveyYear}.months.${surveyMonth}`;
        return await beachModel.find()
            .skip(skip)
            .limit(limit)
            .select(projection)
            .slice(`surveys.${surveyYear}.months.${surveyMonth}`, 10)
            .exec();
    },
    getManyNames: async function() {
        return await beachModel.find({}, `n`).exec();
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