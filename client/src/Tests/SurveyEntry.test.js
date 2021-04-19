/**
 * surveyEntry.test.js
 * Uses test variables from surveyEntry-test-data.js to test
 * getCheckBoxData(category) from ../SurveyEntry/surveyEntry.jsx.
 */
import SurveyEntry from './../SurveyEntry/SurveyEntry';
import {
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
} from './SurveyEntry-test-data';

test("Testing getCheckBoxData(category) case 1", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo1;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryReason))
    .toEqual(getCheckBoxDataExpected1);
});

test("Testing getCheckBoxData(category) case 2", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo2;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryReason))
    .toEqual(getCheckBoxDataExpected2);
});

test("Testing getCheckBoxData(category) case 3", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo3;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryReason))
    .toEqual(getCheckBoxDataExpected3);
});

test("Testing getCheckBoxData(category) case 4", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo4;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryReason))
    .toEqual(getCheckBoxDataExpected4);
});

test("Testing getCheckBoxData(category) case 5", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo5;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryReason))
    .toEqual(getCheckBoxDataExpected5);
});

test("Testing getCheckBoxData(category) case 6", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo6;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryMajorUse))
    .toEqual(getCheckBoxDataExpected6);
});

test("Testing getCheckBoxData(category) case 7", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo7;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryMajorUse))
    .toEqual(getCheckBoxDataExpected7);
});

test("Testing getCheckBoxData(category) case 8", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo8;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryMajorUse))
    .toEqual(getCheckBoxDataExpected8);
});

test("Testing getCheckBoxData(category) case 9", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo9;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryMajorUse))
    .toEqual(getCheckBoxDataExpected9);
});

test("Testing getCheckBoxData(category) case 10", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.info = getCheckBoxDataInfo10;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryMajorUse))
    .toEqual(getCheckBoxDataExpected10);
});

test("Testing getCheckBoxData(category) case 11", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData1;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategorySt))
    .toEqual(getCheckBoxDataExpected11);
});

test("Testing getCheckBoxData(category) case 12", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData2;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategorySt))
    .toEqual(getCheckBoxDataExpected12);
});

test("Testing getCheckBoxData(category) case 13", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData3;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategorySt))
    .toEqual(getCheckBoxDataExpected13);
});

test("Testing getCheckBoxData(category) case 14", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData4;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategorySt))
    .toEqual(getCheckBoxDataExpected14);
});

test("Testing getCheckBoxData(category) case 15", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData5;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategorySt))
    .toEqual(getCheckBoxDataExpected15);
});

test("Testing getCheckBoxData(category) case 16", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData6;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryIncompleteSurvey))
    .toEqual(getCheckBoxDataExpected16);
});

test("Testing getCheckBoxData(category) case 17", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData7;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryIncompleteSurvey))
    .toEqual(getCheckBoxDataExpected17);
});

test("Testing getCheckBoxData(category) case 18", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData8;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryIncompleteSurvey))
    .toEqual(getCheckBoxDataExpected18);
});

test("Testing getCheckBoxData(category) case 19", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData9;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryIncompleteSurvey))
    .toEqual(getCheckBoxDataExpected19);
});

test("Testing getCheckBoxData(category) case 20", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData10;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryIncompleteSurvey))
    .toEqual(getCheckBoxDataExpected20);
});

test("Testing getCheckBoxData(category) case 21", () => {
  var props = {
    match: {
      params: {
        surveyID: ""
      }
    },
    location: {
      state: {
        info: {},
        userProfile: {}
      }
    }
  }
  var surveyEntry = new SurveyEntry(props);
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData11;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryIncompleteSurvey))
    .toEqual(getCheckBoxDataExpected21);
});