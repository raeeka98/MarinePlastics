/**
 * Review.test.js
 * Tests Review component from 
 * ../NewSurveyForm/SurveySubsection/Review.jsx.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Review from './../NewSurveyForm/SurveySubsections/Review';
import { testSurveyFormState1 } from './test-data';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("Review renders without crashing", () => {
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

it("matches snapshot", () => {
    var state = testSurveyFormState1;
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
