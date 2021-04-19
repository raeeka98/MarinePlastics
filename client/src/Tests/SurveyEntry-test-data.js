/**
 * SurveyEntry-test-data.js
 * Contains sample state variables for automated testing. Used in
 * surveyEntry.test.js.
 */

// different options for category parameter in getCheckBoxData(category)
var getCheckBoxDataCategoryReason = "reason";

var getCheckBoxDataCategoryMajorUse = "majorUse";

var getCheckBoxDataCategorySt = "st";

var getCheckBoxDataCategoryIncompleteSurvey = "incompleteSurvey";

// state var for testing getCheckBoxData(category)
var getCheckBoxDataInfo1 = {
  reason: {
    prox: true
  }
};

var getCheckBoxDataInfo2 = {
  reason: {
    prox: true,
    debris: true
  }
};

var getCheckBoxDataInfo3 = {
  reason: {
    other: "Beautiful"
  }
};

var getCheckBoxDataInfo4 = {
  reason: {
    prox: true,
    other: "Beautiful"
  }
};

var getCheckBoxDataInfo5 = {
  reason: {
    prox: true,
    debris: true,
    other: "Beautiful"
  }
};

var getCheckBoxDataInfo6 = {
  majorUse: {
    rec: true
  }
};

var getCheckBoxDataInfo7 = {
  majorUse: {
    rec: true,
    com: true
  }
};

var getCheckBoxDataInfo8 = {
  majorUse: {
    other: "Military"
  }
};

var getCheckBoxDataInfo9 = {
  majorUse: {
    rec: true,
    other: "Military"
  }
};

var getCheckBoxDataInfo10 = {
  majorUse: {
    rec: true,
    com: true,
    rem: true,
    other: "Military"
  }
};

var getCheckBoxDataSurveyData1 = {
  st: {
    s: true
  }
};

var getCheckBoxDataSurveyData2 = {
  st: {
    s: true,
    p: true
  }
};

var getCheckBoxDataSurveyData3 = {
  st: {
    other: "Dirt"
  }
};

var getCheckBoxDataSurveyData4 = {
  st: {
    s: true,
    other: "Dirt"
  }
};

var getCheckBoxDataSurveyData5 = {
  st: {
    s: true,
    p: true,
    rr: true,
    sea: true,
    other: "Dirt"
  }
};

var getCheckBoxDataSurveyData6 = {
  incompleteSurvey: {}
};

var getCheckBoxDataSurveyData7 = {
  incompleteSurvey: {
    time: true
  }
};

var getCheckBoxDataSurveyData8 = {
  incompleteSurvey: {
    time: true,
    people: true
  }
};

var getCheckBoxDataSurveyData9 = {
  incompleteSurvey: {
    other: "Storm"
  }
};

var getCheckBoxDataSurveyData10 = {
  incompleteSurvey: {
    time: true,
    other: "Storm"
  }
};

var getCheckBoxDataSurveyData11 = {
  incompleteSurvey: {
    time: true,
    people: true,
    area: true,
    trash: true,
    other: "Storm"
  }
};

// expected return values from getCheckBoxData(category)
var getCheckBoxDataExpected1 = "Proximity/Convenience";

var getCheckBoxDataExpected2 = "Proximity/Convenience, Debris";

var getCheckBoxDataExpected3 = "Beautiful";

var getCheckBoxDataExpected4 = "Proximity/Convenience, Beautiful";

var getCheckBoxDataExpected5 = "Proximity/Convenience, Debris, Beautiful";

var getCheckBoxDataExpected6 = "Recreation";

var getCheckBoxDataExpected7 = "Recreation, Commercial";

var getCheckBoxDataExpected8 = "Military";

var getCheckBoxDataExpected9 = "Recreation, Military";

var getCheckBoxDataExpected10 =
  "Recreation, Commercial, Remote/Unused, Military";

var getCheckBoxDataExpected11 = "Sand";

var getCheckBoxDataExpected12 = "Sand, Pebble";

var getCheckBoxDataExpected13 = "Dirt";

var getCheckBoxDataExpected14 = "Sand, Dirt";

var getCheckBoxDataExpected15 = "Sand, Pebble, Rip Rap, Seaweed, Dirt";

var getCheckBoxDataExpected16 = "";

var getCheckBoxDataExpected17 = "Not enough time";

var getCheckBoxDataExpected18 = "Not enough time, Not enough people";

var getCheckBoxDataExpected19 = "Storm";

var getCheckBoxDataExpected20 = "Not enough time, Storm";

var getCheckBoxDataExpected21 =
  "Not enough time, Not enough people, Too much area, Too much trash, Storm";

export {
  getCheckBoxDataCategoryReason,
  getCheckBoxDataCategoryMajorUse,
  getCheckBoxDataCategorySt,
  getCheckBoxDataCategoryIncompleteSurvey,
  getCheckBoxDataInfo1,
  getCheckBoxDataInfo2,
  getCheckBoxDataInfo3,
  getCheckBoxDataInfo4,
  getCheckBoxDataInfo5,
  getCheckBoxDataInfo6,
  getCheckBoxDataInfo7,
  getCheckBoxDataInfo8,
  getCheckBoxDataInfo9,
  getCheckBoxDataInfo10,
  getCheckBoxDataSurveyData1,
  getCheckBoxDataSurveyData2,
  getCheckBoxDataSurveyData3,
  getCheckBoxDataSurveyData4,
  getCheckBoxDataSurveyData5,
  getCheckBoxDataSurveyData6,
  getCheckBoxDataSurveyData7,
  getCheckBoxDataSurveyData8,
  getCheckBoxDataSurveyData9,
  getCheckBoxDataSurveyData10,
  getCheckBoxDataSurveyData11,
  getCheckBoxDataExpected1,
  getCheckBoxDataExpected2,
  getCheckBoxDataExpected3,
  getCheckBoxDataExpected4,
  getCheckBoxDataExpected5,
  getCheckBoxDataExpected6,
  getCheckBoxDataExpected7,
  getCheckBoxDataExpected8,
  getCheckBoxDataExpected9,
  getCheckBoxDataExpected10,
  getCheckBoxDataExpected11,
  getCheckBoxDataExpected12,
  getCheckBoxDataExpected13,
  getCheckBoxDataExpected14,
  getCheckBoxDataExpected15,
  getCheckBoxDataExpected16,
  getCheckBoxDataExpected17,
  getCheckBoxDataExpected18,
  getCheckBoxDataExpected19,
  getCheckBoxDataExpected20,
  getCheckBoxDataExpected21
};