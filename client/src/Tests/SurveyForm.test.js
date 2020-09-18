import { describe } from 'joi';
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
  updateDisplayStringAndCheckboxAnswersExpected1,
  updateDisplayStringAndCheckboxAnswersExpected2,
  updateDisplayStringAndCheckboxAnswersExpected3,
  updateDisplayStringAndCheckboxAnswersExpected4,
  updateDisplayStringAndCheckboxAnswersExpected5,
  updateDisplayStringAndCheckboxAnswersExpected6,
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
  prepareFormMDSExpected3,
  validateSRSData1,
  validateSRSData2,
  validateSRSData3,
  validateSRSData4,
  validateSRSData5,
  validateASData1,
  validateASData2,
  validateASData3,
  validateASData4,
  validateASData5,
  validateMDSData1,
  validateMDSData2,
  validateMDSData3,
  validateMDSData4,
  validateMDSData5,
  updateShowOthersE1,
  updateShowOthersE2,
  updateShowOthersE3,
  updateShowOthersE4,
  updateShowOthersE5,
  updateShowOthersE6,
  updateShowOthersE7,
  updateShowOthersE8,
  updateShowOthersExpected1,
  updateShowOthersExpected2,
  updateShowOthersExpected3,
  updateShowOthersExpected4,
  updateShowOthersExpected5,
  updateShowOthersExpected6,
  updateShowOthersExpected7,
  updateShowOthersExpected8
} from './SurveyForm-test-data';

test("updateDisplayStringsAndCheckboxAnswers() 1 option selected",
  () => {
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
  surveyForm.state.surveyData = testSurveyFormSurveyData1;
  expect(surveyForm.updateDisplayStringsAndCheckboxAnswers())
    .toEqual(updateDisplayStringAndCheckboxAnswersExpected1);
});

test("updateDisplayStringsAndCheckboxAnswers() 2 options selected",
  () => {
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
  surveyForm.state.surveyData = testSurveyFormSurveyData2;
  expect(surveyForm.updateDisplayStringsAndCheckboxAnswers())
    .toEqual(updateDisplayStringAndCheckboxAnswersExpected2);
});

test("updateDisplayStringsAndCheckboxAnswers() other selected",
  () => {
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
  surveyForm.state.surveyData = testSurveyFormSurveyData3;
  expect(surveyForm.updateDisplayStringsAndCheckboxAnswers())
    .toEqual(updateDisplayStringAndCheckboxAnswersExpected3);
});

test("updateDisplayStringsAndCheckboxAnswers() 1 option & other selected",
  () => {
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
  surveyForm.state.surveyData = testSurveyFormSurveyData4;
  expect(surveyForm.updateDisplayStringsAndCheckboxAnswers())
    .toEqual(updateDisplayStringAndCheckboxAnswersExpected4);
});

test("updateDisplayStringsAndCheckboxAnswers() all options & other selected",
  () => {
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
  surveyForm.state.surveyData = testSurveyFormSurveyData5;
  expect(surveyForm.updateDisplayStringsAndCheckboxAnswers())
    .toEqual(updateDisplayStringAndCheckboxAnswersExpected5);
});

test("updateDisplayStringsAndCheckboxAnswers() no incomplete survey selected",
  () => {
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
  surveyForm.state.surveyData = testSurveyFormSurveyData6;
  expect(surveyForm.updateDisplayStringsAndCheckboxAnswers())
    .toEqual(updateDisplayStringAndCheckboxAnswersExpected6);
});

test("prepare() creates the correct form", () => {
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
  surveyForm.state = testSurveyFormState1;
  expect(surveyForm.prepareForm()).toEqual(testSurveyFormForm1);
});

test("prepare() creates the correct form using remote option in usage", () => {
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
  surveyForm.state = testSurveyFormState2;
  expect(surveyForm.prepareForm()).toEqual(testSurveyFormForm2);
});

test("prepare() creates the correct form using wind comments", () => {
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
  surveyForm.state = testSurveyFormState3;
  expect(surveyForm.prepareForm()).toEqual(testSurveyFormForm3);
});

test("prepare() creates the correct form using incomplete survey", () => {
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
  surveyForm.state = testSurveyFormState4;
  expect(surveyForm.prepareForm()).toEqual(testSurveyFormForm4);
});

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

test("validateEntry(entryNumber) for a letter", () => {
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
  expect(surveyForm.validateEntry("s")).toBeFalsy();
});

test("validateEntry(entryNumber) for a negative number", () => {
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
  expect(surveyForm.validateEntry("-1")).toBeFalsy();
});

test("validateEntry(entryNumber) for a decimal", () => {
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
  expect(surveyForm.validateEntry("2.3")).toBeFalsy();
});

test("validateEntry(entryNumber) for 0", () => {
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
  expect(surveyForm.validateEntry("0")).toBeTruthy();
});

test("validateEntry(entryNumber) for a positive number", () => {
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
  expect(surveyForm.validateEntry("4")).toBeTruthy();
});

test("validateSRSData() for no items", () => {
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
  surveyForm.state.SRSData = validateSRSData1;
  expect(surveyForm.validateSRSData()).toBeTruthy();
});

test("validateSRSData() for one valid item", () => {
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
  surveyForm.state.SRSData = validateSRSData2;
  expect(surveyForm.validateSRSData()).toBeTruthy();
});

test("validateSRSData() for one invalid item", () => {
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
  surveyForm.state.SRSData = validateSRSData3;
  expect(surveyForm.validateSRSData()).toBeFalsy();
});

test("validateSRSData() for one valid item and one invalid item", () => {
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
  surveyForm.state.SRSData = validateSRSData4;
  expect(surveyForm.validateSRSData()).toBeFalsy();
});

test("validateSRSData() for three valid items", () => {
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
  surveyForm.state.SRSData = validateSRSData5;
  expect(surveyForm.validateSRSData()).toBeTruthy();
});

test("validateASData() for no items", () => {
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
  surveyForm.state.ASData = validateASData1;
  expect(surveyForm.validateASData()).toBeTruthy();
});

test("validateASData() for one valid item", () => {
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
  surveyForm.state.ASData = validateASData2;
  expect(surveyForm.validateASData()).toBeTruthy();
});

test("validateASData() for one invalid item", () => {
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
  surveyForm.state.ASData = validateASData3;
  expect(surveyForm.validateASData()).toBeFalsy();
});

test("validateASData() for one valid item and one invalid item", () => {
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
  surveyForm.state.ASData = validateASData4;
  expect(surveyForm.validateASData()).toBeFalsy();
});

test("validateASData() for three valid items", () => {
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
  surveyForm.state.ASData = validateASData5;
  expect(surveyForm.validateASData()).toBeTruthy();
});

test("validateMDSData() for no items", () => {
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
  surveyForm.state.MDSData = validateMDSData1;
  expect(surveyForm.validateMDSData()).toBeTruthy();
});

test("validateMDSData() for one valid item", () => {
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
  surveyForm.state.MDSData = validateMDSData2;
  expect(surveyForm.validateMDSData()).toBeTruthy();
});

test("validateMDSData() for one invalid item", () => {
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
  surveyForm.state.MDSData = validateMDSData3;
  expect(surveyForm.validateMDSData()).toBeFalsy();
});

test("validateMDSData() for one valid item and one invalid item", () => {
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
  surveyForm.state.MDSData = validateMDSData4;
  expect(surveyForm.validateMDSData()).toBeFalsy();
});

test("validateMDSData() for three valid items", () => {
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
  surveyForm.state.MDSData = validateMDSData5;
  expect(surveyForm.validateMDSData()).toBeTruthy();
});

test("usage checked", () => {
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
  var e = updateShowOthersE1;
  expect(surveyForm.updateShowOthers(e)).toEqual(updateShowOthersExpected1);
});

test("usage unchecked", () => {
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
  var e = updateShowOthersE2;
  expect(surveyForm.updateShowOthers(e)).toEqual(updateShowOthersExpected2);
});

test("reason checked", () => {
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
  var e = updateShowOthersE3;
  expect(surveyForm.updateShowOthers(e)).toEqual(updateShowOthersExpected3);
});

test("reason unchecked", () => {
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
  var e = updateShowOthersE4;
  expect(surveyForm.updateShowOthers(e)).toEqual(updateShowOthersExpected4);
});

test("st checked", () => {
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
  var e = updateShowOthersE4;
  expect(surveyForm.updateShowOthers(e)).toEqual(updateShowOthersExpected4);
});

test("st unchecked", () => {
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
  var e = updateShowOthersE6;
  expect(surveyForm.updateShowOthers(e)).toEqual(updateShowOthersExpected6);
});

test("incompleteSurvey checked", () => {
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
  var e = updateShowOthersE7;
  expect(surveyForm.updateShowOthers(e)).toEqual(updateShowOthersExpected7);
});

test("incompleteSurvey unchecked", () => {
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
  var e = updateShowOthersE8;
  expect(surveyForm.updateShowOthers(e)).toEqual(updateShowOthersExpected8);
});