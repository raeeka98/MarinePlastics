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
  surveyEntry.state.surveyData = getCheckBoxDataSurveyData1;
  expect(surveyEntry.getCheckBoxData(getCheckBoxDataCategoryReason))
    .toEqual(getCheckBoxDataExpected1);
});