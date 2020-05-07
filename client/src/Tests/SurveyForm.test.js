/**
 * SurveyForm.test.js
 * Tests updateDisplayStrings() ../NewSurveyForm/SurveyForm.jsx.
 */
import SurveyForm from './../NewSurveyForm/SurveyForm';
import {
  testSurveyFormState1,
  testSurveyFormState2,
  testSurveyFormState3,
  testSurveyFormState4,
  testSurveyFormSurveyData1,
  testSurveyFormSurveyData2,
  testSurveyFormSurveyData3,
  testSurveyFormSurveyData4,
  testSurveyFormSurveyData5,
  testSurveyFormSurveyData6,
  updateDisplayStringExpected1,
  updateDisplayStringExpected2,
  updateDisplayStringExpected3,
  updateDisplayStringExpected4,
  updateDisplayStringExpected5,
  updateDisplayStringExpected6,
  testSurveyFormForm1,
  testSurveyFormForm2,
  testSurveyFormForm3,
  testSurveyFormForm4,
  testSurveyFormMDSData1,
  testSurveyFormMDSData2,
  testSurveyFormMDSData3,
  calcTotalsMDSExpected1,
  calcTotalsMDSExpected2,
  calcTotalsMDSExpected3,
  testSurveyFormStateMDS1,
  testSurveyFormStateMDS2,
  testSurveyFormStateMDS3,
  prepareFormMDSExpected1,
  prepareFormMDSExpected2,
  prepareFormMDSExpected3
} from './test-data';

/*
test("updateDisplayStrings() with one option selected each", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData1;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected1);
});

test("updateDisplayStrings() with two options selected each", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData2;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected2);
});

test("updateDisplayStrings() with other selected each", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData3;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected3);
});

test("updateDisplayStrings() with one option and other selected each", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData4;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected4);
});

test("updateDisplayStrings() with all options and other selected each", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData5;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected5);
});

test("updateDisplayStrings() without incomplete survey selected", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData6;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected6);
});

test("prepare() creates the correct form", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state = testSurveyFormState1;
  expect(surveyForm.prepareForm()).toEqual(testSurveyFormForm1);
});

test("prepare() creates the correct form using remote option in usage", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state = testSurveyFormState2;
  expect(surveyForm.prepareForm()).toEqual(testSurveyFormForm2);
});

test("prepare() creates the correct form using wind comments", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state = testSurveyFormState3;
  expect(surveyForm.prepareForm()).toEqual(testSurveyFormForm3);
});

test("prepare() creates the correct form using incomplete survey", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state = testSurveyFormState4;
  expect(surveyForm.prepareForm()).toEqual(testSurveyFormForm4);
<<<<<<< HEAD
});
*/

test("calcTotalsMDS() returns correct array with no micro debris data", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.MDSData = testSurveyFormMDSData1;
  expect(surveyForm.calcTotalsMDS()).toEqual(calcTotalsMDSExpected1);
});

test("calcTotalsMDS() returns correct array with micro debris zero", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.MDSData = testSurveyFormMDSData2;
  expect(surveyForm.calcTotalsMDS()).toEqual(calcTotalsMDSExpected2);
});

test("calcTotalsMDS() returns correct array with micro debris nonzero", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.MDSData = testSurveyFormMDSData3;
  expect(surveyForm.calcTotalsMDS()).toEqual(calcTotalsMDSExpected3);
});


test("prepareForm() returns correct object with no micro debris data", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state = testSurveyFormStateMDS1;
  expect(surveyForm.prepareForm()).toEqual(prepareFormMDSExpected1);
});

test("prepareForm() returns correct object with micro debris zero", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state = testSurveyFormStateMDS2;
  expect(surveyForm.prepareForm()).toEqual(prepareFormMDSExpected2);
});

test("prepareForm() returns correct object with micro debris nonzero", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state = testSurveyFormStateMDS3;
  expect(surveyForm.prepareForm()).toEqual(prepareFormMDSExpected3);
});

test("updateMDS(e) updates fresh rib 1", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  var e = {
    target: {
      id: "microFreshTotalRib1",
      value: 1
    }
  };
  var expectedMDSData = {
    microFreshTotalRib1: 1
  };
  surveyForm.updateMDS(e);
  expect(surveyForm.state.MDSData).toEqual(expectedMDSData)
});

test("updateMDS(e) updates fresh rib 2", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  var e = {
    target: {
      id: "microFreshTotalRib2",
      value: 1
    }
  };
  var expectedMDSData = {
    microFreshTotalRib2: 1
  };
  surveyForm.updateMDS(e);
  expect(surveyForm.state.MDSData).toEqual(expectedMDSData)
});

test("updateMDS(e) updates fresh rib 3", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  var e = {
    target: {
      id: "microFreshTotalRib3",
      value: 1
    }
  };
  var expectedMDSData = {
    microFreshTotalRib3: 1
  };
  surveyForm.updateMDS(e);
  expect(surveyForm.state.MDSData).toEqual(expectedMDSData)
});

test("updateMDS(e) updates fresh rib 4", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  var e = {
    target: {
      id: "microFreshTotalRib4",
      value: 1
    }
  };
  var expectedMDSData = {
    microFreshTotalRib4: 1
  };
  surveyForm.updateMDS(e);
  expect(surveyForm.state.MDSData).toEqual(expectedMDSData)
});

test("updateMDS(e) updates weathered rib 1", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  var e = {
    target: {
      id: "microWeatheredTotalRib1",
      value: 1
    }
  };
  var expectedMDSData = {
    microWeatheredTotalRib1: 1
  };
  surveyForm.updateMDS(e);
  expect(surveyForm.state.MDSData).toEqual(expectedMDSData)
});

test("updateMDS(e) updates weathered rib 2", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  var e = {
    target: {
      id: "microWeatheredTotalRib2",
      value: 1
    }
  };
  var expectedMDSData = {
    microWeatheredTotalRib2: 1
  };
  surveyForm.updateMDS(e);
  expect(surveyForm.state.MDSData).toEqual(expectedMDSData)
});

test("updateMDS(e) updates weathered rib 3", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  var e = {
    target: {
      id: "microWeatheredTotalRib3",
      value: 1
    }
  };
  var expectedMDSData = {
    microWeatheredTotalRib3: 1
  };
  surveyForm.updateMDS(e);
  expect(surveyForm.state.MDSData).toEqual(expectedMDSData)
});

test("updateMDS(e) updates weathered rib 4", () => {
  var props = {
    auth: {
      userProfile: {
        name: "stgibson@ucsc.edu",
        email: "stgibson@ucsc.edu",
        sub: "auth0|5e2f29b0285a700e93a1a53a"
      }
    }
  };
  var surveyForm = new SurveyForm(props);
  var e = {
    target: {
      id: "microWeatheredTotalRib4",
      value: 1
    }
  };
  var expectedMDSData = {
    microWeatheredTotalRib4: 1
  };
  surveyForm.updateMDS(e);
  expect(surveyForm.state.MDSData).toEqual(expectedMDSData)
});