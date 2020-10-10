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

// state var surveyData for testing getCheckBoxData(category)
var getCheckBoxDataSurveyData1 = {
  reason: {
    prox: true
  }
};

var getCheckBoxDataSurveyData2 = {
  reason: {
    prox: true,
    debris: true
  }
};

var getCheckBoxDataSurveyData3 = {
  reason: {
    other: "Beautiful"
  }
};

var getCheckBoxDataSurveyData4 = {
  reason: {
    prox: true,
    other: "Beautiful"
  }
};

var getCheckBoxDataSurveyData5 = {
  reason: {
    prox: true,
    debris: true,
    other: "Beautiful"
  }
};

var getCheckBoxDataSurveyData6 = {
  majorUse: {
    rec: true
  }
};

var getCheckBoxDataSurveyData7 = {
  majorUse: {
    rec: true,
    com: true
  }
};

var getCheckBoxDataSurveyData8 = {
  majorUse: {
    other: "Military"
  }
};

var getCheckBoxDataSurveyData9 = {
  majorUse: {
    rec: true,
    other: "Military"
  }
};

var getCheckBoxDataSurveyData10 = {
  majorUse: {
    rec: true,
    com: true,
    rem: true,
    other: "Military"
  }
};

var getCheckBoxDataSurveyData11 = {
  st: {
    s: true
  }
};

var getCheckBoxDataSurveyData12 = {
  st: {
    s: true,
    p: true
  }
};

var getCheckBoxDataSurveyData13 = {
  st: {
    other: "Dirt"
  }
};

var getCheckBoxDataSurveyData14 = {
  st: {
    s: true,
    other: "Dirt"
  }
};

var getCheckBoxDataSurveyData15 = {
  st: {
    s: true,
    p: true,
    rr: true,
    sea: true,
    other: "Dirt"
  }
};

var getCheckBoxDataSurveyData16 = {
  incompleteSurvey: {}
};

var getCheckBoxDataSurveyData17 = {
  incompleteSurvey: {
    time: true
  }
};

var getCheckBoxDataSurveyData18 = {
  incompleteSurvey: {
    time: true,
    people: true
  }
};

var getCheckBoxDataSurveyData19 = {
  incompleteSurvey: {
    other: "Storm"
  }
};

var getCheckBoxDataSurveyData20 = {
  incompleteSurvey: {
    time: true,
    other: "Storm"
  }
};

var getCheckBoxDataSurveyData21 = {
  incompleteSurvey: {
    time: true,
    people: true,
    area: true,
    trash: true,
    other: "Storm"
  }
};

// expected return values from getCheckBoxData(category)
var getCheckBoxDataExpected1 = "Proximity";

var getCheckBoxDataExpected2 = "Proximity, Debris";

var getCheckBoxDataExpected3 = "Beautiful";

var getCheckBoxDataExpected4 = "Proximity, Beautiful";

var getCheckBoxDataExpected5 = "Proximity, Debris, Beautiful";

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
  getCheckBoxDataSurveyData12,
  getCheckBoxDataSurveyData13,
  getCheckBoxDataSurveyData14,
  getCheckBoxDataSurveyData15,
  getCheckBoxDataSurveyData16,
  getCheckBoxDataSurveyData17,
  getCheckBoxDataSurveyData18,
  getCheckBoxDataSurveyData19,
  getCheckBoxDataSurveyData20,
  getCheckBoxDataSurveyData21,
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