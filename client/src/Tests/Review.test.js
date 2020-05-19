/**
 * Review.test.js
 * Tests Review component from 
 * ../NewSurveyForm/SurveySubsection/Review.jsx.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Review from './../NewSurveyForm/SurveySubsections/Review';
import {
  testSurveyFormState1,
  testSurveyFormState2,
  testSurveyFormState3,
  testSurveyFormState4
} from './test-data';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer';

afterEach(cleanup);

test("calculateWindDirection(direction)", () => {
  var review = new Review();

  expect(review.calculateWindDirection('n')).toBe('North');
  expect(review.calculateWindDirection('ne')).toBe('Northeast');
  expect(review.calculateWindDirection('e')).toBe('East');
  expect(review.calculateWindDirection('se')).toBe('Southeast');
  expect(review.calculateWindDirection('s')).toBe('South');
  expect(review.calculateWindDirection('sw')).toBe('Southwest');
  expect(review.calculateWindDirection('w')).toBe('West');
  expect(review.calculateWindDirection('nw')).toBe('Northwest');
});

test("Review renders without crashing", () => {
  const div = document.createElement("div");
  var state = testSurveyFormState1;
  ReactDOM.render(
    <Review
      data={state.surveyData}
      email={state.email}
      SRSData={state.SRSData}
      ASData={state.ASData}
      displayStrings={state.displayStrings}
    />,
    div
  );
});

test("Review renders without crashing using Remote/Unused option", () => {
  const div = document.createElement("div");
  var state = testSurveyFormState2;
  ReactDOM.render(
    <Review
      data={state.surveyData}
      email={state.email}
      SRSData={state.SRSData}
      ASData={state.ASData}
      displayStrings={state.displayStrings}
    />,
    div
  );
});

test("Review renders without crashing using wind comments", () => {
  const div = document.createElement("div");
  var state = testSurveyFormState3;
  ReactDOM.render(
    <Review
      data={state.surveyData}
      email={state.email}
      SRSData={state.SRSData}
      ASData={state.ASData}
      displayStrings={state.displayStrings}
    />,
    div
  );
});

test("Review renders without crashing no accumulation sweep", () => {
  const div = document.createElement("div");
  var state = testSurveyFormState4;
  ReactDOM.render(
    <Review
      data={state.surveyData}
      email={state.email}
      SRSData={state.SRSData}
      ASData={state.ASData}
      displayStrings={state.displayStrings}
    />,
    div
  );
});

test("matches snapshot 1", () => {
    var state = testSurveyFormState1;
    const tree = renderer.create(
        <Review
            data={state.surveyData}
            email={state.email}
            SRSData={state.SRSData}
            ASData={state.ASData}
            MDSData={state.MDSData}
            displayStrings={state.displayStrings}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test("matches snapshot 2", () => {
  var state = testSurveyFormState2;
  const tree = renderer.create(
    <Review
      data={state.surveyData}
      email={state.email}
      SRSData={state.SRSData}
      ASData={state.ASData}
      displayStrings={state.displayStrings}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("matches snapshot 3", () => {
  var state = testSurveyFormState3;
  const tree = renderer.create(
    <Review
      data={state.surveyData}
      email={state.email}
      SRSData={state.SRSData}
      ASData={state.ASData}
      displayStrings={state.displayStrings}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("matches snapshot 4", () => {
  var state = testSurveyFormState4;
  const tree = renderer.create(
    <Review
      data={state.surveyData}
      email={state.email}
      SRSData={state.SRSData}
      ASData={state.ASData}
      displayStrings={state.displayStrings}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});