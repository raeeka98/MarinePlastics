let { beachModel, surveyModel, yearSurveyModel, trashModel, yearTotalsModel } = require('./mongooseSchemas');

/*--------------database helpers-------------------*/

let trash = {
    getMany: async function() {
        return await trashModel.find({}).exec();
    }
}

let surveys = {
    getUserID: async function(surveyID) {
        return await surveyModel.findById(surveyID).select('userID').lean().exec();
    },
    get: async function(surveyID) {
        //get survey
        return await surveyModel.findById(surveyID).lean().exec();
    },
    getDateCreated: async function(surveyID) {
        //get the date the survey was created
        let dateObj = await surveyModel.findById(surveyID).lean().exec();
        let date = dateObj.survDate;
        return date;
    },
    remove: async function(beachID, surveyID, epochDateOfSubmit) {
        //remove a survey
        let dateOfSub = new Date(epochDateOfSubmit);
        let { stats, surveys } = await beachModel.findById(beachID, `stats.ttls.${dateOfSub.getUTCFullYear()} surveys.${dateOfSub.getUTCFullYear()}`).lean().exec();

        let surveyUpdate = {
            $pull: {
                [`${dateOfSub.getUTCMonth()}`]: { date: dateOfSub.getUTCDate() }
            }
        };
        let removeFromSurveys = yearSurveyModel.findByIdAndUpdate(surveys[dateOfSub.getUTCFullYear()], surveyUpdate, { new: true }).exec();
        let removedSurvey = await surveyModel.findByIdAndRemove(surveyID).exec();


        let updatePayload = {
            reason: "remove",
            newDebrisData: {},
            date: dateOfSub
        };
        updatePayload.newDebrisData = removedSurvey.getAllDebrisNeg();
        let statsUpdate = beaches.updateStats(beachID, updatePayload);

        return await Promise.all([removeFromSurveys, statsUpdate]);
    },
    /**
     *  changedInfo:{
     *      teamleader,email,slope,lastTide,nextTide,etc...
     *  }
     *
     * }
     */
    update: async function(surveyID, updatedFields) {

        let { newSRSDebris, newASDebris, oldSRSDebris, oldASDebris, changedInfo } = updatedFields;
        let update = {
            $set: {
                ...changedInfo,
                SRSDebris: newSRSDebris,
                ASDebris: newASDebris,
                srsDebrisLength: newSRSDebris.length,
                asDebrisLength: newASDebris.length
            }
        }

        let newSurvey = await surveyModel.findByIdAndUpdate(surveyID, update, { new: true }).exec();
        //update stats
        let updatePayload = {
            reason: "edit",
            newASTotal: 0,
            newSRSTotal: 0,
            newDebrisData: {},
            date: newSurvey.survDate
        };
        newSRSDebris.forEach(val => {
            updatePayload.newSRSTotal += val[1].fresh + val[1].weathered;
        });
        newASDebris.forEach(val => {
            updatePayload.newASTotal += val[1].fresh + val[1].weathered;
        });

        oldSRSDebris.forEach(oldVal => {
            let index = newSRSDebris.findIndex(val => val[0] === oldVal[0]);
            if (index == -1) {
                updatePayload.newDebrisData[oldVal[0]] = -oldVal[1].fresh - oldVal[1].weathered;
            } else {
                updatePayload.newDebrisData[oldVal[0]] = (oldVal[1].fresh + oldVal[1].weathered) -
                    (newSRSDebris[index][1].fresh + newSRSDebris[index][1].weathered)
            }
        });

        await beaches.updateStats(newSurvey.bID, updatePayload);

        return newSurvey;
    },
    addToBeach: async function(surveyData, beachID) {
        // add a survey to beach
        let survDate = new Date(surveyData.survDate);
        let survey = new surveyModel(surveyData);
        let update = {};
        let rtnMsg = null;
        survey.bID = beachID;
        let { surveys } = await beachModel.findById(beachID).select("surveys stats").exec();
        let surveyEntryData = {
            date: survDate.getUTCDate(),
            survey: survey._id
        };
        if (!surveys.has(`${survDate.getUTCFullYear()}`)) {
            //new year
            let ym = new yearSurveyModel({
                [survDate.getUTCMonth()]: [surveyEntryData]
            });
            update.$set = {
                [`surveys.${survDate.getUTCFullYear()}`]: ym._id,
                lastMod: Date.now()
            };
            let [, surv] = await Promise.all([ym.save(), survey.save()]);
            rtnMsg = surv;
        } else {
            //year already exists
            let yearSurveyID = surveys.get(`${survDate.getUTCFullYear()}`);
            let path = `${survDate.getUTCMonth()}`;
            let yearSurveyUpdate = {
                $push: {
                    [path]: surveyEntryData,
                    $sort: {
                        [`${path}.date`]: 1
                    }
                }
            }
            let find = {
                _id: yearSurveyID,
                [`${path}.date`]: { $ne: survDate.getUTCDate() }
            }
            let doc = await yearSurveyModel.findOneAndUpdate(find, yearSurveyUpdate).exec();

            if (doc) {
                await survey.save();
                update.$set = {
                    lastMod: Date.now()
                }
                rtnMsg = survey;

            } else {
                let error = new Error(`A survey already exists on that date`);
                throw error;
            }
        }

        await beachModel.findByIdAndUpdate(beachID, update).exec();
        let updatePayload = {
            reason: 'new',
            date: new Date(survDate.getTime()),
            ASTotal: 0,
            SRSTotal: 0,
            newDebrisData: {},
        };

        updatePayload.ASTotal = survey.getASTotal(updatePayload.newDebrisData);
        updatePayload.SRSTotal = survey.getSRSTotal(updatePayload.newDebrisData);
        await beaches.updateStats(beachID, updatePayload);
        return rtnMsg;
    }

}


let beaches = {
    updateStats: async function(beachID, updatePayload) {
        //update overall stats to beach
        let update = { beachUpdate: { $set: {} }, totalsUpdate: {} };
        let { date, reason: updateReason } = updatePayload;
        let totalsQuery = {};
        let projection = `stats.lastUp stats.TODF stats.ttls.${date.getUTCFullYear()}`;
        let { stats: oldStats } = await beachModel.findById(beachID).select(projection).exec();
        switch (updateReason) {
            case 'new':
                createdSurvey(update, totalsQuery, updatePayload, oldStats);
                break;
            case 'edit':
                editedSurvey(update, totalsQuery, updatePayload, oldStats);
                break;
            case 'remove':
                removedSurvey(update, totalsQuery, updatePayload, oldStats);
                break;
        }

        update.beachUpdate.$set['stats.lastUp'] = Date.now();

        let beachProm = beachModel.findByIdAndUpdate(beachID, update.beachUpdate, { new: true }).exec();
        let promises = [beachProm];

        if (totalsQuery._id) {
            promises.push(yearTotalsModel.findOneAndUpdate(totalsQuery, update.totalsUpdate, { new: true }).exec());
        }
        return await Promise.all(promises);
    },

    create: async function(beachData) {
        //create a new beach
        let location = new beachModel(beachData);
        let beachRt = await location.save();
        return beachRt;
    },
    getStats: async function(beachID, year) {
        // get the types of debris on beach 
        let projection = `stats.ttls.${year} stats.TODF stats.lastUp`;
        let { stats } = await beachModel.findById(beachID, projection).populate(`stats.ttls.${year}`).lean().exec();
        let keysToSort = Object.keys(stats.TODF); //Sort the keys based on their values
        keysToSort.sort((a, b) => { return stats.TODF[a] - stats.TODF[b] });
        let sortedKeys = {};
        // Construct a new object that will contain the object in sorted order
        for (let i = 0; i < keysToSort.length; i++) {
            sortedKeys[keysToSort[i]] = stats.TODF[keysToSort[i]];
        }
        return { totals: stats.ttls[year], typesOfDebrisFound: sortedKeys, lastUp: stats.lastUp };
    },

    remove: async function(beachID) {
        //remove beach and all surveys under it
        let removedBeach = await beachModel.findByIdAndDelete(beachID).exec();
        let surveyYearIterator = removedBeach.surveys.values();
        let totalYearIterator = removedBeach.stats.ttls.values();
        let promises = [surveyModel.deleteMany({ bID: removedBeach._id }).exec()];

        for (const surveyYearID of surveyYearIterator) {
            promises.push(yearSurveyModel.findByIdAndRemove(surveyYearID).exec());
        }
        for (const yearTotalID of totalYearIterator) {
            promises.push(yearTotalsModel.findByIdAndRemove(yearTotalID).exec());
        }

        await Promise.all(promises);

    },
    getSurveys: async function(beachID, surveyYear, surveyMonth, surveysSkip, numOfSurveys) {
        //get all surveys under a beach
        let projection = "surveys";
        let { surveys } = await beachModel.findById(beachID)
            .populate(`surveys`)
            .select(projection)
            .lean().exec();
        let res = [];
        surveys.forEach((ysm, key) => {
            for (const month in ysm) {
                if (month != '_id') {
                    const survs = ysm[month];
                    res = [...res, ...survs];
                }
            }

        });
        return res;
    },
    getSubmitYears: async function(beachID) {
        //get all years that contain a survey
        let doc = await beachModel.findById(beachID)
            .select("surveys")
            .populate('surveys')
            .exec();
        return [...doc.surveys.keys()];
    },
    getSubmitMonths: async function(beachID, year) {
        //get all months that contain a survey
        let doc = await beachModel.findById(beachID)
            .select(`surveys.${year}`)
            .populate("surveys")
            .lean().exec();

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
        //get surveys under a month
        let doc = await beachModel.findById(beachID)
            .select(`surveys.${year}.${month}`)
            .populate("surveys").lean().exec();
        let res;
        doc.surveys[year][month] ? res = doc.surveys[year][month] : res = [];
        return res;
    },
    getBeachNames: async function(skip) {
        //get all beach names skipping an amount of beaches
        let projection = `n lastMod`;
        let proj_mod = `stats.lastUp`;
        return await beachModel
            .find()
            .skip(skip)
            .limit(20)
            .select(projection)
            .sort([
                [proj_mod, -1]
            ])
            .exec();

    },
    getAllNames: async function() {
        //get all beach names
        return await beachModel.find({}, "n").exec();
    },
    getAllLonLat: async function() {
        //get all lat and lon of all beaches
        return await beachModel.find({}, "n lat lon").exec();
    },
    queryBeachNames: async function(query) {
        //find beach name that contains the query
        return await beachModel.find({ n: { $regex: `${query}`, $options: "i" } }).select("n lastMod").limit(10).exec();
    },
    getOneLonLat: async function(beachID) {
        //get lat lon of one beach
        let projection = `lat lon`
        return await beachModel
            .findById(beachID)
            .select(projection)
            .exec();
    },
    getAllStats: async function() {
        //let projection = `stats.TODF`;
        return await beachModel.find({}, 'stats.TODF').exec();
    },
    getInfo: async function(beachID) {
        return await beachModel.findById(beachID).select("n lat lon nroName nroDist lastMod").exec();
    },
    getClosestCoords: async function(latitude, longitude, callback) {
        /**
         * Use the Law of Cosines to find the beaches in the database within a five mile (or here, 8 km) 
         * radius of the given latitude and longitude of the beach. The callback function is just used 
         * to properly return the result of the function used within the exec() portion of the query.
         * 
         * This may have some work to be done in terms of optimization, but as of now all of the beaches stored
         * in the database are returned and iterated over. Their latitudes and longitudes are used to determine
         * the geospacial relation to the given latitude and longitude via the law of cosines.
         */
        await beachModel.find().exec(function(err, res) {
            if(err)
                return err;
            let beaches = res;
            let result = [];
            const lat1Rad = (Math.PI/180) * (latitude);
            const lon1Rad = (Math.PI/180) * (longitude);
            const earthRadius = 6371;
            const beachRadius = 8; //km
            var lat2Rad, lon2Rad, distance;
            for(const beach in beaches){
                lat2Rad = (Math.PI/180) * (beaches[beach].lat);
                lon2Rad = (Math.PI/180) * (beaches[beach].lon);
                // Law of Cosines
                distance = Math.acos(Math.sin(lat1Rad) * Math.sin(lat2Rad) 
                        + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad)) * earthRadius;
                if(distance <= beachRadius)
                    result.push(beaches[beach]);
            }
            callback(result); //Return back to the main function
        });
    }
}

function removedSurvey (update, totalsQuery, updatePayload, oldStats) {
    //survey was removed update stats
    let { TODF: prevDebrisData } = oldStats;
    let { newDebrisData, date } = updatePayload;
    let result = [];

    if (compareTrash(newDebrisData, prevDebrisData, result)) {
        update.beachUpdate.$set['stats.TODF'] = result;
    }
    let totalsID = oldStats.ttls.get(`${date.getUTCFullYear()}`);
    update.totalsUpdate.$pull = {
        [`${date.getUTCMonth()}`]: { date: date.getUTCDate() },
    };
    totalsQuery._id = totalsID;
}

function editedSurvey (update, totalsQuery, updatePayload, oldStats) {
    //edited survey
    let { TODF: prevDebrisData } = oldStats;
    let { newDebrisData, newASTotal, newSRSTotal, date } = updatePayload;

    let result = [];
    let path = `${date.getUTCMonth()}`
    if (compareTrash(newDebrisData, prevDebrisData, result)) {
        update.beachUpdate.$set['stats.TODF'] = result;
    }
    let totalsID = oldStats.ttls.get(`${date.getUTCFullYear()}`);
    update.totalsUpdate.$set = {
        [`${path}.$.AST`]: newASTotal,
        [`${path}.$.SRST`]: newSRSTotal,
    };
    totalsQuery._id = totalsID;
    totalsQuery[`${path}.date`] = date.getUTCDate();
}

function createdSurvey (update, totalsQuery, updatePayload, oldStats) {
    //new survey
    let { TODF: prevDebrisData } = oldStats;
    let { newDebrisData, ASTotal, SRSTotal, date } = updatePayload;
    let result = [];
    if (compareTrash(newDebrisData, prevDebrisData, result)) {
        update.beachUpdate.$set['stats.TODF'] = result;
    }
    if (oldStats.ttls.size <= 0) {
        //create new year
        let totals = new yearTotalsModel({
            [`${date.getUTCMonth()}`]: [{ date: date.getUTCDate(), AST: ASTotal, SRST: SRSTotal }]
        })
        update.beachUpdate.$set[`stats.ttls.${date.getUTCFullYear()}`] = totals._id;
        totals.save();
        return;
    }
    let totalsID = oldStats.ttls.get(`${date.getUTCFullYear()}`);
    update.totalsUpdate.$push = {
        [`${date.getUTCMonth()}`]: {
            $each: [{ date: date.getUTCDate(), AST: ASTotal, SRST: SRSTotal }],
            $sort: {
                date: 1
            }
        }
    };
    totalsQuery._id = totalsID;
}

function compareTrash (newDebrisData, prevDebrisData, result) {
    //check what trash was deleted or removed
    let trash = Object.keys(newDebrisData);
    if (trash.length > 0) {
        trash.forEach(trashName => {
            let newTrashAmnt = newDebrisData[trashName];
            if (prevDebrisData.has(trashName)) {
                let origAmnt = prevDebrisData.get(trashName);
                prevDebrisData.delete(trashName);
                let newTotal = newTrashAmnt + origAmnt;
                if (newTotal != 0) {
                    result.push([trashName, newTotal]);;
                }
            } else {
                result.push([trashName, newTrashAmnt]);;
            }
        });
        prevDebrisData.forEach((val, key) => {
            result.push([key, val]);
        });
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
        name: "testB4",
        lat: 36.9786,
        lon: -121.9385,
        nroName: "River t",
        nroDist: 3,
    }

    // let b = await beaches.create(beach);
    // console.log(b);
    // let subDate = new Date().setUTCHours(0, 0, 0, 0);
    // sur.survDate = subDate;
    // let survey = await surveys.addToBeach(sur, b._id, subDate);
    // console.log(`${survey}`);

    // console.log('REMOVE SURVEY');

    // let res = await surveys.remove(b._id, survey._id, subDate);
    // console.log(res);
    // sur.survDate = new Date().setUTCHours(25, 0, 0, 0);
    // survey = await surveys.addToBeach(sur, b._id, new Date().setUTCHours(25, 0, 0, 0));
}

//export our module to use in server.js
module.exports = {
    beaches,
    surveys,
    trash
};