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
  testSurveyFormForm4
} from './test-data';

test("updateDisplayStrings() with one option selected each", () => {
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
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected1);
});

test("updateDisplayStrings() with two options selected each", () => {
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
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected2);
});

test("updateDisplayStrings() with other selected each", () => {
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
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected3);
});

test("updateDisplayStrings() with one option and other selected each", () => {
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
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected4);
});

test("updateDisplayStrings() with all options and other selected each", () => {
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
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected5);
});

test("updateDisplayStrings() without incomplete survey selected", () => {
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
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected6);
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