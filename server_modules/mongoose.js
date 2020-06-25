/**
 * mongoose.js
 * Defines functions that can be performed on schemas from mongooseSchemas.js.
 * These can be called when making api calls using axios.
 */
let {
  beachModel,
  surveyModel,
  yearSurveyModel,
  trashModel,
  yearTotalsModel
} = require('./mongooseSchemas');

/*--------------database helpers-------------------*/

// defines functions to use on trash model
let trash = {
  /**
   * Gets a certain type of trash.
   * @return trash
   */
  getMany: async function() {
    return await trashModel.find({}).exec();
  }
}

// defines functions to use on survey model
let surveys = {
  /**
   * Gets the user ID from the survey with the surveyID.
   * @param {any} surveyID
   * @return userID
   */
  getUserID: async function (surveyID) {
    return await surveyModel.findById(surveyID).select('userID').lean().exec();
  },
  /**
   * Gets the survey with the surveyID.
   * @param {any} surveyID
   * @return survey
   */
  get: async function (surveyID) {
    return await surveyModel.findById(surveyID).lean().exec();
  },
  /**
   * Gets the date the survey was created.
   * @param {any} surveyID
   * @return survDate
   */
  getDateCreated: async function (surveyID) {
    let dateObj = await surveyModel.findById(surveyID).lean().exec();
    let date = dateObj.survDate;
    return date;
  },
  /**
   * Removes a survey.
   * @params {any} beachID, {any} surveyID, {any} epochDateOfSubmit
   * @return the promise that the survey will be deleted, and the beach stats
   * will be updated to reflect the removal of the survey
   */
  remove: async function (beachID, surveyID, epochDateOfSubmit) {
    let dateOfSub = new Date(epochDateOfSubmit);
    let { stats, surveys } = await beachModel.findById(beachID,
      `stats.ttls.${dateOfSub.getUTCFullYear()} surveys.${dateOfSub.getUTCFullYear()}`)
      .lean().exec();

    let surveyUpdate = {
      $pull: {
        [`m${dateOfSub.getUTCMonth()}`]: { date: dateOfSub.getUTCDate() }
      }
    };
    let removeFromSurveys = yearSurveyModel
      .findByIdAndUpdate(surveys[dateOfSub.getUTCFullYear()],
        surveyUpdate, { new: true }).exec();
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
   * Updates a survey.
   * @params {any} surveyID, {any} updatedFields
   * @return the updated survey
   */
  update: async function (surveyID, updatedFields) {
    let {
      newSRSDebris,
      newASDebris,
      newMicroDebris,
      oldSRSDebris,
      oldASDebris,
      oldMicroDebris,
      changedInfo
    } = updatedFields;

    let update = {
      $set: {
        ...changedInfo,
        SRSDebris: newSRSDebris,
        ASDebris: newASDebris,
        MicroDebris: newMicroDebris,
        srsDebrisLength: newSRSDebris.length,
        asDebrisLength: newASDebris.length,
        microDebrisLength: newMicroDebris.length
      }
    }

    // updates survey data
    let newSurvey = await surveyModel.findByIdAndUpdate(surveyID, update,
      { new: true }).exec();
    // updates stats
    let updatePayload = {
      reason: "edit",
      newASTotal: 0,
      newMDSTotal: 0,
      newSRSTotal: 0,
      newDebrisData: {},
      date: newSurvey.survDate
    };
    // calculates the new total debris for the updated survey
    newSRSDebris.forEach(val => {
      let fresh = val[1].fresh;
      let weathered = val[1].weathered;

      // convert from string to number to prevent concatenation
      if (typeof fresh !== 'number') {
        fresh = Number(fresh);
      }
      if (typeof weathered != 'number') {
        weathered = Number(weathered);
      }
      updatePayload.newSRSTotal += fresh + weathered;
    });
    newASDebris.forEach(val => {
      let fresh = val[1].fresh;
      let weathered = val[1].weathered;

      if (typeof fresh !== 'number') {
        fresh = Number(fresh);
      }
      if (typeof weathered !== 'number') {
        weathered = Number(weathered);
      }

      updatePayload.newASTotal += fresh + weathered;
    });
    newMicroDebris.forEach(val => {
      let fresh = val[1].fresh;
      let weathered = val[1].weathered;

      if (typeof fresh !== 'number') {
        fresh = Number(fresh);
      }
      if (typeof weathered !== 'number') {
        weathered = Number(weathered);
      }
      updatePayload.newMDSTotal += fresh + weathered;
    });

    // calculates what the types of trash for the beach should now be
    findDiffDebris(oldSRSDebris, newSRSDebris, updatePayload.newDebrisData);
    findDiffDebris(oldASDebris, newASDebris, updatePayload.newDebrisData);
    findDiffDebris(oldMicroDebris, newMicroDebris, updatePayload.newDebrisData);

    /*
    oldSRSDebris.forEach(oldVal => {
      let index = newSRSDebris.findIndex(val => val[0] === oldVal[0]);
      if (index == -1) {
        let fresh = oldVal[1].fresh;
        let weathered = oldVal[1].weathered;

        if (typeof fresh !== 'number') {
          fresh = Number(fresh);
        }
        if (typeof weathered !== 'number') {
          weathered = Number(weathered);
        }

        updatePayload.newDebrisData[oldVal[0]] =
          -fresh - weathered;
      } else {
        let oldFresh = oldVal[1].fresh;
        let oldWeathered = oldVal[1].weathered;
        let newFresh = newSRSDebris[index][1].fresh;
        let newWeathered = newSRSDebris[index][1].weathered;

        if (typeof oldFresh !== 'number') {
          oldFresh = Number(oldFresh);
        }
        if (typeof oldWeathered !== 'number') {
          oldWeathered = Number(oldWeathered);
        }
        if (typeof newFresh !== 'number') {
          newFresh = Number(newFresh);
        }
        if (typeof newWeathered !== 'number') {
          newWeathered = Number(newWeathered);
        }

        updatePayload.newDebrisData[oldVal[0]] =
          (newFresh + newWeathered) -
          (oldFresh + oldWeathered);
      }
    });

    // add new debris that is in newSRSDebris but not oldSRSDebris
    newSRSDebris.forEach(newVal => {
      let index = oldSRSDebris.findIndex(val => val[0] === newVal[0]);

      // if debris in newSRSDebris that isn't in oldSRSDebris, add it
      let fresh = newVal[1].fresh;
      let weathered = newVal[1].weathered;

      if (typeof fresh !== 'number') {
        fresh = Number(fresh);
      }
      if (typeof weathered !== 'number') {
        weathered = Number(weathered);
      }

      updatePayload.newDebrisData[newVal[0]] = fresh + weathered;
    });


    // calculates what the types of trash for the beach should now be
    oldASDebris.forEach(oldVal => {
      let index = newASDebris.findIndex(val => val[0] === oldVal[0]);
      if (index == -1) {
        let fresh = oldVal[1].fresh;
        let weathered = oldVal[1].weathered;

        if (typeof fresh !== 'number') {
          fresh = Number(fresh);
        }
        if (typeof weathered !== 'number') {
          weathered = Number(weathered);
        }

        updatePayload.newDebrisData[oldVal[0]] =
          -fresh - weathered;
      } else {
        let oldFresh = oldVal[1].fresh;
        let oldWeathered = oldVal[1].weathered;
        let newFresh = newASDebris[index][1].fresh;
        let newWeathered = newASDebris[index][1].weathered;

        if (typeof oldFresh !== 'number') {
          oldFresh = Number(oldFresh);
        }
        if (typeof oldWeathered !== 'number') {
          oldWeathered = Number(oldWeathered);
        }
        if (typeof newFresh !== 'number') {
          newFresh = Number(newFresh);
        }
        if (typeof newWeathered !== 'number') {
          newWeathered = Number(newWeathered);
        }
        
        updatePayload.newDebrisData[oldVal[0]] =
          (newFresh + newWeathered) -
          (oldFresh + oldWeathered);
      }
    });
    oldMicroDebris.forEach(oldVal => {
      let index = newMicroDebris.findIndex(val => val[0] === oldVal[0]);
      if (index == -1) {
        let fresh = oldVal[1].fresh;
        let weathered = oldVal[1].weathered;

        if (typeof fresh !== 'number') {
          fresh = Number(fresh);
        }
        if (typeof weathered !== 'number') {
          weathered = Number(weathered);
        }

        updatePayload.newDebrisData[oldVal[0]] =
          -fresh - weathered;
      } else {
        let oldFresh = oldVal[1].fresh;
        let oldWeathered = oldVal[1].weathered;
        let newFresh = newMicroDebris[index][1].fresh;
        let newWeathered = newMicroDebris[index][1].weathered;

        if (typeof oldFresh !== 'number') {
          oldFresh = Number(oldFresh);
        }
        if (typeof oldWeathered !== 'number') {
          oldWeathered = Number(oldWeathered);
        }
        if (typeof newFresh !== 'number') {
          newFresh = Number(newFresh);
        }
        if (typeof newWeathered !== 'number') {
          newWeathered = Number(newWeathered);
        }

        updatePayload.newDebrisData[oldVal[0]] =
          (newFresh + newWeathered)
          - (oldFresh + oldWeathered);
      }
    });
    */

    // update beach data for types of trash and total trash per survey
    await beaches.updateStats(newSurvey.bID, updatePayload);

    return newSurvey;
  },
  /**
   * Adds a survey to beach. Also updates yearSurveys.
   * @params {any} surveyData, {any} beachID
   * @return the survey
   */
  addToBeach: async function (surveyData, beachID) {
    let survDate = new Date(surveyData.survDate);
    let survey = new surveyModel(surveyData);
    let update = {};
    let rtnMsg = null;
    survey.bID = beachID;
    let { surveys } = await beachModel.findById(beachID)
      .select("surveys stats").exec();
    let surveyEntryData = {
      date: survDate.getUTCDate(),
      survey: survey._id
    };
    if (!surveys.has(`${survDate.getUTCFullYear()}`)) {
      // new year
      let ym = new yearSurveyModel({
        ["m" + survDate.getUTCMonth()]: [surveyEntryData]
      });
      update.$set = {
        [`surveys.${survDate.getUTCFullYear()}`]: ym._id,
        lastMod: Date.now()
      };
      let [, surv] = await Promise.all([ym.save(), survey.save()]);
      rtnMsg = surv;
    } else {
      // year already exists
      let yearSurveyID = surveys.get(`${survDate.getUTCFullYear()}`);
      let path = `m${survDate.getUTCMonth()}`;
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
      let doc = await yearSurveyModel.findOneAndUpdate(find, yearSurveyUpdate)
        .exec();

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
      MDSTotal: 0,
      SRSTotal: 0,
      newDebrisData: {},
    };

    // calc total debris
    updatePayload.ASTotal = survey.getASTotal(updatePayload.newDebrisData);
    updatePayload.MDSTotal = survey.getMDSTotal(updatePayload.newDebrisData);
    updatePayload.SRSTotal = survey.getSRSTotal(updatePayload.newDebrisData);
    // update beach types of debris and total trash for the survey (yearTotals)
    await beaches.updateStats(beachID, updatePayload);
    return rtnMsg;
  }
}

// defines functions to use on beach model
let beaches = {
  /**
   * Updates overall stats to beach with beachID. Also updates yearTotalsModel
   * using updatePayload.
   * @params {any} beachID, {any} updatePayload
   * @return promise that the beach and totals for the survey are edited
   */
  updateStats: async function(beachID, updatePayload) {
    let update = { beachUpdate: { $set: {} }, totalsUpdate: {} };
    let { date, reason: updateReason } = updatePayload;
    let totalsQuery = {};
    let projection =
      `stats.lastUp stats.TODF stats.ttls.${date.getUTCFullYear()}`;
    let { stats: oldStats } = await beachModel.findById(beachID)
      .select(projection).exec();
    // updates types of trash and total trash
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

    let beachProm = beachModel
      .findByIdAndUpdate(beachID, update.beachUpdate, { new: true }).exec();
    let promises = [beachProm];

    if (totalsQuery._id) {
      promises.push(yearTotalsModel.findOneAndUpdate(totalsQuery,
        update.totalsUpdate, { new: true }).exec());
    }
    return await Promise.all(promises);
  },
  /**
   * Creates a new beach.
   * @param {any} beachData
   * @return the beach
   */
  create: async function(beachData) {
    let location = new beachModel(beachData);
    let beachRt = await location.save();
    return beachRt;
  },
  /**
   * Gets types of debris on beach with beachID for year
   * @params {any} beachID, {any} year
   * @return total trash for the year, types of debris found, and last date the
   * stats were updated
   */
  getStats: async function(beachID, year) {
    // get the types of debris on beach 
    let projection = `stats.ttls.${year} stats.TODF stats.lastUp`;
    let { stats } = await beachModel.findById(beachID, projection)
      .populate(`stats.ttls.${year}`).lean().exec();
    // Sort the keys based on their values
    let keysToSort = Object.keys(stats.TODF);
    keysToSort.sort((a, b) => { return stats.TODF[a] - stats.TODF[b] });
    let sortedKeys = {};
    // Construct a new object that will contain the object in sorted order
    for (let i = 0; i < keysToSort.length; i++) {
      sortedKeys[keysToSort[i]] = stats.TODF[keysToSort[i]];
    }
    return {
      totals: stats.ttls[year],
      typesOfDebrisFound: sortedKeys,
      lastUp: stats.lastUp
    };
  },
  /**
   * Removes beach with beachID and all surveys under it
   * @param {any} beachID
   */
  remove: async function(beachID) {
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
  /**
   * Gets all surveys under a beach with beachID.
   * @params {any} beachID, {any} surveyYear, {any} surveyMonth, {any}
   * surveysSkip, {any} numOfSurveys
   * @return array of surveys
   */
  getSurveys: async function (beachID) {
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
  /**
   * Gets all years that contain a survey on a beach with beachID
   * @param {any} beachID
   * @return array of years
   */
  getSubmitYears: async function(beachID) {
    let doc = await beachModel.findById(beachID)
      .select("surveys")
      .populate('surveys')
      .exec();
    return [...doc.surveys.keys()];
  },
  /**
   * Gets all months in year that contain a survey on a beach with beachID
   * @params {any} beachID, {any} year
   * @return array of months
   */
  getSubmitMonths: async function(beachID, year) {
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
  /**
   * Gets surveys made in a specific year and month, on a beach with beachID.
   * @params {any} beachID, {any} year, {any} month
   * @return array of surveys
   */
  getSurveysUnderMonth: async function(beachID, year, month) {
    let doc = await beachModel.findById(beachID)
      .select(`surveys.${year}.${month}`)
      .populate("surveys").lean().exec();
    let res;
    doc.surveys[year][month] ? res = doc.surveys[year][month] : res = [];
    return res;
  },
  /**
   * Gets all beach names skipping an amount of beaches given by skip.
   * @param {any} skip
   * @return beaches
   */
  getBeachNames: async function(skip) {
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
  /**
   * Gets all beach names.
   * @return beach names.
   */
  getAllNames: async function() {
    return await beachModel.find({}, "n").exec();
  },
  /**
   * Gets all lat and lon of all beaches.
   * @return beach names with their lat and lon
   */
  getAllLonLat: async function() {
    return await beachModel.find({}, "n lat lon").exec();
  },
  /**
   * Find beach name that contains the query.
   * @param {any} query
   * @return beach name
   */
  queryBeachNames: async function(query) {
    return await beachModel.find({ n: { $regex: `${query}`, $options: "i" } })
      .select("n lastMod").limit(10).exec();
  },
  /**
   * Get lat lon of the beach with beachID.
   * @param {any} beachID
   * @return lat and lon of beach
   */
  getOneLonLat: async function(beachID) {
    let projection = `lat lon`
    return await beachModel
      .findById(beachID)
      .select(projection)
      .exec();
  },
  /**
   * Get stats on types of trash of all beaches.
   * @return types of debris found
   */
  getAllStats: async function() {
    return await beachModel.find({}, 'stats.TODF').exec();
  },
  /**
   * Get information for beach with beachID that will be used as autofill.
   * @param {any} beachID
   * @return beach name, lat, lon, nearest river output name, nearest river
   * output distance, and last modified date
   */
  getInfo: async function(beachID) {
    return await beachModel.findById(beachID)
      .select("n lat lon nroName nroDist lastMod").exec();
  },
  /**
   * Uses the Law of Cosines to find the beaches in the database within a five
   * mile (or here, 8 km) radius of the given latitude and longitude of the
   * beach. The callback function is just used to properly return the result of
   * the function used within the exec() portion of the query. This may have
   * some work to be done in terms of optimization, but as of now all of the
   * beaches stored in the database are returned and iterated over. Their
   * latitudes and longitudes are used to determine the geospacial relation to
   * the given latitude and longitude via the law of cosines.
   * @params {any} latitude, {any} longitude, {any} callback
   */
  getClosestCoords: async function(latitude, longitude, callback) {
    await beachModel.find().exec(function(err, res) {
      if(err)
        return err;
      let beaches = res;
      let result = [];
      const lat1Rad = (Math.PI/180) * (latitude);
      const lon1Rad = (Math.PI/180) * (longitude);
      const earthRadius = 6371;
      // km
      const beachRadius = 8;
      var lat2Rad, lon2Rad, distance;
      for(const beach in beaches){
        lat2Rad = (Math.PI/180) * (beaches[beach].lat);
        lon2Rad = (Math.PI/180) * (beaches[beach].lon);
        // Law of Cosines
        distance = Math.acos(Math.sin(lat1Rad) * Math.sin(lat2Rad)
          + Math.cos(lat1Rad) * Math.cos(lat2Rad)
          * Math.cos(lon2Rad - lon1Rad)) * earthRadius;
        if(distance <= beachRadius)
          result.push(beaches[beach]);
      }
      // return back to the main function
      callback(result);
    });
  }
}

/**
 * Survey was removed, updates stats accordingly.
 * @params {any} update {any} totalsQuery {any} updatePayload {any} oldStats
 */
function removedSurvey (update, totalsQuery, updatePayload, oldStats) {
  let { TODF: prevDebrisData } = oldStats;
  let { newDebrisData, date } = updatePayload;
  let result = [];

  if (compareTrash(newDebrisData, prevDebrisData, result)) {
    update.beachUpdate.$set['stats.TODF'] = result;
  }
  let totalsID = oldStats.ttls.get(`${date.getUTCFullYear()}`);
  update.totalsUpdate.$pull = {
    [`m${date.getUTCMonth()}`]: { date: date.getUTCDate() },
  };
  totalsQuery._id = totalsID;
}

/**
 * Survey was edited, updates stats accordingly.
 * @params {any} update {any} totalsQuery {any} updatePayload {any} oldStats
 */
function editedSurvey (update, totalsQuery, updatePayload, oldStats) {
  let { TODF: prevDebrisData } = oldStats;
  let {
    newDebrisData,
    newASTotal,
    newMDSTotal,
    newSRSTotal,
    date
  } = updatePayload;

  let result = [];
  let path = `m${date.getUTCMonth()}`
  if (compareTrash(newDebrisData, prevDebrisData, result)) {
    update.beachUpdate.$set['stats.TODF'] = result;
  }
  let totalsID = oldStats.ttls.get(`${date.getUTCFullYear()}`);
  update.totalsUpdate.$set = {
    [`${path}.$.AST`]: newASTotal,
    [`${path}.$.MDST`]: newMDSTotal,
    [`${path}.$.SRST`]: newSRSTotal,
  };
  totalsQuery._id = totalsID;
  totalsQuery[`${path}.date`] = date.getUTCDate();
}

/**
 * New survey was created, updates stats accordingly.
 * @params {any} update {any} totalsQuery {any} updatePayload {any} oldStats
 */
function createdSurvey (update, totalsQuery, updatePayload, oldStats) {
  let { TODF: prevDebrisData } = oldStats;
  let { newDebrisData, ASTotal, MDSTotal, SRSTotal, date } = updatePayload;
  let result = [];
  if (compareTrash(newDebrisData, prevDebrisData, result)) {
    update.beachUpdate.$set['stats.TODF'] = result;
  }
  if (oldStats.ttls.size <= 0) {
    //create new year
    let totals = new yearTotalsModel({
      [`m${date.getUTCMonth()}`]: [{
        date: date.getUTCDate(),
        AST: ASTotal,
        MDST: MDSTotal,
        SRST: SRSTotal
      }]
    })
    update.beachUpdate.$set[`stats.ttls.${date.getUTCFullYear()}`] =
      totals._id;
    totals.save();
    return;
  }
  let totalsID = oldStats.ttls.get(`${date.getUTCFullYear()}`);
  update.totalsUpdate.$push = {
    [`m${date.getUTCMonth()}`]: {
      $each: [{
        date: date.getUTCDate(),
        AST: ASTotal,
        MDST: MDSTotal,
        SRST: SRSTotal
      }],
      $sort: {
        date: 1
      }
    }
  };
  totalsQuery._id = totalsID;
}

/**
 * Check what trash was deleted or removed using diff, and add the results in
 * result.
 * @params {any} diffs, {any} prevDebrisData, {any} result
 * @return true if the trash was not deleted, false otherwise
 */
function compareTrash(diffs, prevDebrisData, result) {
  let trash = Object.keys(diffs);
  // if nothing from diff, no changes were made, so no need to update stats
  if (trash.length === 0) {
    return false;
  }

  // for each item from diff
  trash.forEach(trashName => {
    let diff = diffs[trashName];
    // if trashName is in prevDebrisData, add the two together
    if (prevDebrisData.has(trashName)) {
      let origAmnt = prevDebrisData.get(trashName);
      // remove, since going to copy unaltered trash data later
      prevDebrisData.delete(trashName);
      let newTotal = diff + origAmnt;
      // remove trashName from stats if 0
      if (newTotal != 0) {
          result.push([trashName, newTotal]);;
      }
    } else {
      result.push([trashName, diff]);;
    }
  });

  // copy all remaining elements of prevDebrisData to result
  prevDebrisData.forEach((val, key) => {
    result.push([key, val]);
  });
  
  return true;
}

/**
 * Finds differences between the old debris and the new debris for determining
 * how to change the beach stats on total types of debris. Stores these
 * differences in diff. This is to be called for surface rib scan,
 * accumulation survey, and micro debris survey
 * @params {any} oldDebris, {any} newDebris, {any} diff
 */
function findDiffDebris(oldDebris, newDebris, diff) {
  // for each type of debris in newDebris
  newDebris.forEach(newVal => {
    let index = oldDebris.findIndex(val => val[0] === newVal[0]);
    // if type of debris in oldDebris
    if (index !== -1) {
      // if type of debris not in diff, add to diff with value 0
      if (!(newVal[0] in diff)) {
        diff[newVal[0]] = 0;
      }

      var oldFresh = oldDebris[index][1].fresh;
      var oldWeathered = oldDebris[index][1].weathered;
      var newFresh = newVal[1].fresh;
      var newWeathered = newVal[1].weathered;

      // in case data is in strings, not numbers, this prevents concatenation
      if (typeof oldFresh !== 'number') {
        oldFresh = Number(oldFresh);
      }
      if (typeof oldWeathered !== 'number') {
        oldWeathered = Number(oldWeathered);
      }
      if (typeof newFresh !== 'number') {
        newFresh = Number(newFresh);
      }
      if (typeof newWeathered !== 'number') {
        newWeathered = Number(newWeathered);
      }

      // add difference of newDebris and oldDebris to type of debris in diff
      diff[newVal[0]] += (newFresh + newWeathered - oldFresh - oldWeathered);
    }
    // if type of debris is not in oldDebris (was added)
    else {
      // if type of debris not in diff, add to diff with value 0
      if (!(newVal[0] in diff)) {
        diff[newVal[0]] = 0;
      }

      var fresh = newVal[1].fresh;
      var weathered = newVal[1].weathered;

      if (typeof fresh !== 'number') {
        fresh = Number(fresh);
      }
      if (typeof weathered !== 'number') {
        weathered = Number(weathered);
      }

      // add value of type of debris from newDebris to type of debris in diff
      diff[newVal[0]] += (fresh + weathered);
    }
  });

  // for each type of debris in oldDebris (to get any types of debris missed)
  oldDebris.forEach(oldVal => {
    let index = newDebris.findIndex(val => val[0] === oldVal[0]);
    // if type of debris not in newDebris (was deleted)
    if (index === -1) {
      // if type of debris not in diff, add to diff with value 0
      if (!(oldVal[0] in diff)) {
        diff[oldVal[0]] = 0;
      }

      var fresh = oldVal[1].fresh;
      var weathered = oldVal[1].weathered;

      if (typeof fresh !== 'number') {
        fresh = Number(fresh);
      }
      if (typeof weathered !== 'number') {
        weathered = Number(weathered);
      }

      // minus value of type of debris from oldDebris to type of debris in diff
      diff[oldVal[0]] += (-fresh - weathered);
    }
  });
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
    // survey = await surveys.addToBeach(sur, b._id, new Date()
    // .setUTCHours(25, 0, 0, 0));
}

//export our module to use in server.js
module.exports = {
  beaches,
  surveys,
  trash,
  // for testing
  compareTrash,
  findDiffDebris
};