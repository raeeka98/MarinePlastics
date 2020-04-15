/**
 * SurveyForm.test.js
 * Tests updateDisplayStrings() ../NewSurveyForm/SurveyForm.jsx.
 */
import React from 'react';
import SurveyForm from './../NewSurveyForm/SurveyForm';
import {
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
} from './test-data';
// import { cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'
// import renderer from 'react-test-renderer';

// afterEach(cleanup);

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
  surveyForm.state.surveyData = testSurveyFormSurveyData1;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected1);
});

test("updateDisplayStrings() with other selected each", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData1;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected1);
});

test("updateDisplayStrings() with one option and other selected each", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData1;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected1);
});

test("updateDisplayStrings() with all options and other selected each", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData1;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected1);
});

test("updateDisplayStrings() without incomplete survey selected", () => {
  var props = {
    auth: undefined
  };
  var surveyForm = new SurveyForm(props);
  surveyForm.state.surveyData = testSurveyFormSurveyData1;
  expect(surveyForm.updateDisplayStrings())
    .toEqual(updateDisplayStringExpected1);
});