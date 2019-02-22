let { beachModel, surveyModel, yearSurveyModel, yearTotalsModel } = require('./mongooseSchemas');


/*--------------database helpers-------------------*/

let surveys = {
    find: async function(surveyID) {
        let survey;
        try {
            survey = await surveys.findById(surveyID).exec();
            return survey;
        } catch (err) {
            console.error(err);
            throw new Error(`Error while finding survey ${surveyID} :  ${err.message}`);
        }

    },
    remove: async function(beachID, surveyID, epochDateOfSubmit) {
        let dateOfSub = new Date(epochDateOfSubmit);
        let update = {
            $pull: {
                [`surveys.${dateOfSub.getUTCFullYear()}.${dateOfSub.getUTCMonth()}`]: {
                    day: dateOfSub.getUTCDate()
                }
            }
        };
        try {
            let removeFromBeach = beachModel.findByIdAndUpdate(beachID, update, { new: true }).exec();

            let removedSurvey = surveyModel.findByIdAndDelete(surveyID).exec();

            //update stats

            return await Promise.all([removeFromBeach, removedSurvey]);
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
            //update stats
            return oldSurvey;
        } catch (err) {
            console.log(err);
            throw new Error('Error while updating survey: ' + err.message);
        }

    },
    addToBeach: async function(surveyData, beachID, epochDateOfSubmit) {
        let subDate = new Date(epochDateOfSubmit);
        let survey = new surveyModel(surveyData);
        let update = {};
        survey.bID = beachID;
        let { surveys } = await beachModel.findById(beachId).select("surveys stats").exec();
        let surveyEntryData = {
            day: subDate.getUTCDate(),
            survey: survey._id
        };
        if (!surveys.has(`${subDate.getUTCFullYear()}`)) {
            //new year
            let ym = new yearSurveyModel({
                [subDate.getUTCMonth()]: [surveyEntryData]
            });
            update.$set = {
                [`surveys.${subDate.getUTCFullYear()}`]: ym._id,
                lastMod: Date.now()
            };
            await Promise.all([ym.save(), survey.save()]);
        } else {
            //year already exists
            let yearSurveyID = surveys.get(`${subDate.getUTCFullYear()}`);
            let path = `${subDate.getUTCMonth()}`;
            let yearSurveyUpdate = {
                $push: {
                    [path]: surveyEntryData,
                    $sort: {
                        [`${path}.day`]: 1
                    }
                }
            }
            let find = {
                _id: yearSurveyID,
                [`${path}.day`]: { $ne: subDate.getUTCDate() }
            }
            let doc = await yearStatsModel.findOneAndUpdate(find, yearSurveyUpdate).exec();
            if (doc) {
                await survey.save();
                update.$set = {
                    lastMod: Date.now()
                }
            } else {
                return { survey: null, added: false };
            }
        }

        await beachModel.findByIdAndUpdate(beachID, update).exec();
        let updatePayload = {
            reason: 'new',
            date: new Date(epochDateOfSubmit),
            ASTotal: 0,
            SRSTotal: 0,
            newDebris: {},
        };

        updatePayload.ASTotal = survey.getASTotal(updatePayload.newDebris);
        updatePayload.SRSTotal = survey.getSRSTotal(updatePayload.newDebris);
        console.log(updatePayload);
        await beaches.updateStats(beachID, updatePayload);
    },

    get: async function(surveyID) {
        return await surveyModel.findById(surveyID).exec();
    }

}


let beaches = {
    updateStats: async function(beachID, updatePayload) {
        let update = { beachUpdate: { $set: {} }, totalsUpdate: {} };
        let { date } = updatePayload;
        let totalsQuery = null;
        let projection = `stats.lastUp stats.TODF stats.ttls.${date.getUTCFullYear()}`;
        let { stats: oldStats } = await beachModel.findById(beachID, projection).exec();

        console.log(oldStats);

        if (updatePayload.reason === 'new') {
            createdSurvey(update, totalsQuery, updatePayload);
        } else if (updatePayload.reason === 'edit') {
            editedSurvey(update, totalsQuery, updatePayload, oldStats);
        } else {
            removedSurvey(update, totalsQuery, updatePayload, oldStats);
        }
        update.beachUpdate.$set['stats.lastUp'] = Date.now();
        console.log(update);
        let beachProm = beachModel.findByIdAndUpdate(beachID, update.beachUpdate, { new: true }).exec();
        let promises = [beachProm];
        if (totalsQuery) {
            promises.push(yearTotalsModel.findOneAndUpdate(totalsQuery, update.totalsUpdate, { new: true })).exec();
        }
        return await Promise.all(promises);
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
            projection = `stats.AST.${query.year}.${query.month} stats.SRST.${query.year}.${query.month} stats.TODF stats.lastUp`
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
    getSurveys: async function(beachID, surveyYear, surveyMonth, surveysSkip, numOfSurveys) {
        let projection = `surveys`;
        // return await beachModel.findById(beachID)
        //     .select(projection)
        //     .slice(`surveys.${surveyYear}.${surveyMonth}`, [surveysSkip, numOfSurveys])
        //     .exec();
        let { surveys } = await beachModel.findById(beachID)
            .select(projection).lean().exec();
        let res = [];

        for (const year in surveys) {
            let months = surveys[year];
            for (const month in months) {
                const surv = months[month];
                res = [...res, ...surv];
            }
        }
        return res;
    },
    getSubmitYears: async function(beachID) {
        let doc = await beachModel.findById(beachID)
            .select("surveys");
        return [...doc.surveys.keys()];
    },
    getSubmitMonths: async function(beachID, year) {
        let doc = await beachModel.findById(beachID)
            .select(`surveys.${year}`).lean();

        let months = doc.surveys[year];
        let res = [];
        for (const month in months) {
            const days = months[month];
            if (days.length > 0) {
                res.push(months);
            }
        }
        return res;
    },
    getSurveysUnderMonth: async function(beachID, year, month) {
        let doc = await beachModel.findById(beachID)
            .select(`surveys.${year}.${month}`).lean();
        let res;
        doc.surveys[year][month] ? res = doc.surveys[year][month] : res = [];
        return res;
    },
    getMany: async function(skip) {
        let projection = `n`;
        return await beachModel
            .find()
            .skip(skip)
            .limit(10)
            .select(projection)
            .exec();

    },
    getAllNames: async function() {
        return await beachModel.find({}, "n").exec();
    },
    getAllLonLat: async function() {
        return await beachModel.find({}, "n lat lon").exec();
    }
}

function removedSurvey (update, totalsQuery, updatePayload, oldStats) {
    let { TODF: prevDebrisData } = oldStats;
    let { newDebrisData, date } = updatePayload;
    let result = [];
    if (compareTrash(newDebrisData, prevDebrisData, result)) {
        update.beachUpdate.$set['stats.typesOfDebrisFound'] = result;
    }
    let totalsID = oldStats.totals.get(`${date.getUTCFullYear()}`);
    update.totalsUpdate.$pull = {
        [`${path}`]: { date: date.getUTCDate() },
    };
    totalsQuery = { _id: totalsID };
}

function editedSurvey (update, totalsQuery, updatePayload, oldStats) {
    //edited survey
    let { TODF: prevDebrisData } = oldStats;
    let { newDebrisData, newASTotal, newSRSTotal, date } = updatePayload;
    let result = [];
    let path = `${date.getUTCMonth()}`
    if (compareTrash(newDebrisData, prevDebrisData, result)) {
        update.beachUpdate.$set['stats.typesOfDebrisFound'] = result;
    }
    let totalsID = oldStats.totals.get(`${date.getUTCFullYear()}`);
    update.totalsUpdate.$set = {
        [`${path}.$.AST`]: newASTotal,
        [`${path}.$.SRST`]: newSRSTotal,
    };
    let totalsQuery = { _id: totalsID, [`${path}.date`]: date.getUTCDate() };
}

function createdSurvey (update, totalsQuery, updatePayload, oldStats) {
    //new survey
    let { TODF: prevDebrisData } = oldStats;
    let { newDebrisData, ASTotal, SRSTotal, date } = updatePayload;
    let result = [];
    if (compareTrash(newDebrisData, prevDebrisData, result)) {
        update.beachUpdate.$set['stats.typesOfDebrisFound'] = result;
    }

    if (oldStats.totals.size <= 0) {
        //create new year
        let totals = new yearTotalsModel({
            [`${date.getUTCMonth()}`]: [{ date: date.getUTCDate(), AST: ASTotal, SRST: SRSTotal }]
        })
        update.beachUpdate.$set[`stats.ttls.${date.getUTCFullYear()}`] = totals._id;
        totals.save();
        return;
    }
    let totalsID = oldStats.totals.get(`${date.getUTCFullYear()}`);
    update.totalsUpdate.$push = {
        [`${date.getUTCMonth()}`]: {
            $each: [{ date: date.getUTCDate(), AST: ASTotal, SRST: SRSTotal }],
            $sort: {
                date: 1
            }
        }
    };
    totalsQuery = { _id: totalsID };
}

function compareTrash (newDebrisData, prevDebrisData, result) {
    let trash = Object.keys(newDebrisData);
    if (trash.length > 0) {
        if (prevDebrisData.has(trash)) {
            let origAmnt = prevDebrisData.get(trash);
            let newTotal = trashAmount + origAmnt;
            if (newTotal != 0) {
                result.push([trash, newTotal]);
            }
        } else {
            result.push([trash, trashAmount]);
        }
    } else {
        return false;
    }
    return true;

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
        SRSDebris: {
            "miscPlastic": {
                fresh: 4,
                weathered: 2
            },
            "misc": {
                fresh: 2,
                weathered: 1
            }
        },
        ASDebris: {
            "miscPlastic": {
                fresh: 5,
                weathered: 2
            },
            "dirty": {
                fresh: 2,
                weathered: 1
            }
        },
        srsDebrisLength: 2,
        asDebrisLength: 2
    };
    let beach = {
        name: "testB2",
        lat: 36.9786,
        lon: -121.9385,
        nroName: "River t",
        nroDist: 3,
    }

    // let b = await beaches.create(beach);
    // console.log(b);
    // let subDate = new Date().setUTCHours(0, 0, 0, 0);
    // sur.survDate = subDate;
    // let { survey, added } = await surveys.addToBeach(sur, b._id, subDate);
    // console.log(`${survey}  ${added}`);

    // let res = await surveys.remove("5c6c978204de315b0e7cfbc7", "5c6c979d04de315b0e7cfbc8", subDate);
    // console.log(res);

    // console.log("added survey" + added);
    //await beaches.remove(b._id);

    // let d = await beaches.getMany(0);
    // console.log(d);
    // let d = await beaches.getSurveys("5c6cbb73dea528734c341ebf", 0, 0, 0, 0);
    // console.log(d);

    //let b = await beaches.getSurveysUnderMonth("5c6c48f23c4a6d39b6853c6c", "2019", "0");
    // console.log(b);
    // console.log(await beaches.getAllLonLat());


}

//export our module to use in server.js
module.exports = {
    beaches,
    surveys
};