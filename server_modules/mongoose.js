let { beachModel, surveyModel } = require('./mongooseSchemas');


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
                [`surveys.${dateOfSub.getUTCFullYear()}.months.${dateOfSub.getUTCMonth()}`]: {
                    day: dateOfSub.getUTCDate()
                }
            }
        };
        try {
            let removeFromBeach = beachModel.findByIdAndUpdate(beachID, update, { new: true }).exec();

            let removedSurvey = surveyModel.findByIdAndDelete(surveyID).exec();

            return await Promise.all([await removeFromBeach, await removedSurvey]);
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
        let path = `surveys.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`;
        survey.bID = beachID;
        let surveyEntryData = {
            day: subDate.getUTCDate(),
            survey: survey._id
        };

        let updatePayload = {
            reason: 'new',
            date: epochDateOfSubmit,
            ASTotal: 0,
            SRSTotal: 0,
            newDebris: {},
        };

        updatePayload.ASTotal = survey.getASTotal(updatePayload.newDebris);
        updatePayload.SRSTotal = survey.getSRSTotal(updatePayload.newDebris);

        console.log(updatePayload);

        try {
            let update = {};
            update.$push = {
                [path]: surveyEntryData
            }
            console.log(update);
            let find = {
                _id: beachID,
                [`${path}.day`]: { $ne: subDate.getUTCDate() }
            }
            let newDoc = await beachModel.findOneAndUpdate(find, update).exec();
            if (newDoc) {
                //if a date doesnt already exist
                try {
                    let surv = await survey.save();
                    return { survey: surv, added: true };
                } catch (err) {
                    console.log(err);
                    throw new Error('Error while saving survey: ' + err.message);
                }
            }
            console.log(newDoc);
            return { survey: null, added: false }
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
        let update = { $set: {} };
        let subDate = new Date(updatePayload.date);

        let projection = `stats.TODF stats.AST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()} stats.SRST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`;
        let { stats: oldStats } = await beachModel.findById(beachID, projection).exec();
        if (updatePayload.reason === 'new') {
            let { newDebris, ASTotal, SRSTotal } = updatePayload;
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
            update.$push = {
                [`stats.AST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: { date: subDate.getUTCDate(), total: ASTotal },
                [`stats.SRST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}`]: { date: subDate.getUTCDate(), total: SRSTotal }
            };
            update.$set['stats.typesOfDebrisFound'] = res;
        } else if (updatePayload.reason === 'edit') {
            //edited survey
            let { newDebrisValues, newASTotal, newSRSTotal } = updatePayload;
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
                [`stats.SRST.${subDate.getUTCFullYear()}.months.${subDate.getUTCMonth()}.${srsIndex}`]: newSRSTotal,
            }
        } else {
            //removed survey
            let { remDebris } = updatePayload;
            let res = [];
            let trash = Object.keys(remDebris);
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
    getSurveys: async function(beachID, surveyYear, surveyMonth, surveysSkip, numOfSurveys) {
        let projection = `n surveys.${surveyYear}.months.${surveyMonth}`;
        return await beachModel.findById(beachID)
            .select(projection)
            .slice(`surveys.${surveyYear}.months.${surveyMonth}`, [surveysSkip, numOfSurveys])
            .exec();
    },
    getSubmitYears: async function(beachID) {
        let doc = await beachModel.findById(beachID)
            .select("surveys");
        return [...doc.surveys.keys()];
    },
    getSubmitMonths: async function(beachID, year) {
        let doc = await beachModel.findById(beachID)
            .select(`surveys.${year}`).lean();

        let { months } = doc.surveys[year];
        let res = [];
        for (const month in months) {
            const days = months[month];
            if (days.length > 0) {
                res.push(month);
            }
        }
        return res;
    },
    getSurveysUnderMonth: async function(beachID, year, month) {
        let doc = await beachModel.findById(beachID)
            .select(`surveys.${year}.months.${month}`).lean();
        let res;
        doc.surveys[year].months[month] ? res = doc.surveys[year].months[month] : res = [];
        return res;
    },
    /**
     * 
     * @param {Number} skip 
     */
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
    },
    getAllVerb: async function() {
        return await beachModel.find().exec();
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
        name: "testB",
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
    // let res = await surveys.remove(b._id, survey._id, survey.survDate);
    // console.log(res);

    // console.log("added survey" + added);
    // await beaches.remove(b._id);


    // let b = await beaches.getSurveysUnderMonth("5c6c48f23c4a6d39b6853c6c", "2019", "0");
    // console.log(b);



}

test1();


//export our module to use in server.js
module.exports = {
    beaches,
    surveys
};