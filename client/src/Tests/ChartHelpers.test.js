/**
 * ChartHelpers.test.js
 * Tests sumTotals(surveys, type) in ../_helpers/ChartHelpers.js. Uses test
 * data in ChartHelpers-test-data.js.
 */
import { sumTotals } from './../_helpers/ChartHelpers';
import {
  sumTotalsSurveys1,
  sumTotalsSurveys2,
  sumTotalsSurveys3,
  sumTotalsExpectedSRS,
  sumTotalsExpectedAS,
  sumTotalsExpectedMDS1,
  sumTotalsExpectedMDS2,
  sumTotalsExpectedMDS3
} from './ChartHelpers-test-data.js'

test("sumTotals(surveys, type) SRS", () => {
  var surveys = sumTotalsSurveys1;
  expect(sumTotals(surveys, 'SRS')).toEqual(sumTotalsExpectedSRS);
});

test("sumTotals(surveys, type) AS", () => {
  var surveys = sumTotalsSurveys1;
  expect(sumTotals(surveys, 'AS')).toEqual(sumTotalsExpectedAS);
});

test("sumTotals(surveys, type) MDS but no data", () => {
  var surveys = sumTotalsSurveys1;
  expect(sumTotals(surveys, 'MDS')).toEqual(sumTotalsExpectedMDS1);
});

test("sumTotals(surveys, type) MDS 0", () => {
  var surveys = sumTotalsSurveys2;
  expect(sumTotals(surveys, 'MDS')).toEqual(sumTotalsExpectedMDS2);
});

test("sumTotals(surveys, type) MDS nonzero", () => {
  var surveys = sumTotalsSurveys3;
  expect(sumTotals(surveys, 'MDS')).toEqual(sumTotalsExpectedMDS3);
});