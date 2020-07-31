/**
 * surveyEntryEdit.test.js
 * Uses test variables from surveyEntryEdit-test-data.js to test
 * editSurveyCheckBoxes(e) from ../SurveyEntry/surveyEntryEdit.jsx.
 */
import SurveyEntryEdit from './../SurveyEntry/surveyEntryEdit';
import {
  editSurveyCheckBoxesEReasonProx,
  editSurveyCheckBoxesEReasonDebris,
  editSurveyCheckBoxesEMajorUseRec,
  editSurveyCheckBoxesEMajorUseCom,
  editSurveyCheckBoxesEMajorUseRem,
  editSurveyCheckBoxesEStS,
  editSurveyCheckBoxesEStP,
  editSurveyCheckBoxesEStRr,
  editSurveyCheckBoxesEStSea,
  editSurveyCheckBoxesSurveyData1,
  editSurveyCheckBoxesSurveyData2,
  editSurveyCheckBoxesSurveyData3,
  editSurveyCheckBoxesSurveyData4,
  editSurveyCheckBoxesSurveyData5,
  editSurveyCheckBoxesSurveyData6,
  editSurveyCheckBoxesSurveyData7,
  editSurveyCheckBoxesSurveyData8,
  editSurveyCheckBoxesSurveyData9,
  editSurveyCheckBoxesSurveyData10,
  editSurveyCheckBoxesSurveyData11,
  editSurveyCheckBoxesSurveyData12,
  editSurveyCheckBoxesSurveyData13,
  editSurveyCheckBoxesSurveyData14,
  editSurveyCheckBoxesSurveyData15,
  editSurveyCheckBoxesSurveyData16,
  editSurveyCheckBoxesSurveyData17,
  editSurveyCheckBoxesSurveyData18,
  editSurveyCheckBoxesExpectedOldData1,
  editSurveyCheckBoxesExpectedOldData2,
  editSurveyCheckBoxesExpectedOldData3,
  editSurveyCheckBoxesExpectedOldData4,
  editSurveyCheckBoxesExpectedOldData5,
  editSurveyCheckBoxesExpectedOldData6,
  editSurveyCheckBoxesExpectedOldData7,
  editSurveyCheckBoxesExpectedOldData8,
  editSurveyCheckBoxesExpectedOldData9,
  editSurveyCheckBoxesExpectedOldData10,
  editSurveyCheckBoxesExpectedOldData11,
  editSurveyCheckBoxesExpectedOldData12,
  editSurveyCheckBoxesExpectedOldData13,
  editSurveyCheckBoxesExpectedOldData14,
  editSurveyCheckBoxesExpectedOldData15,
  editSurveyCheckBoxesExpectedOldData16,
  editSurveyCheckBoxesExpectedOldData17,
  editSurveyCheckBoxesExpectedOldData18,
  editSurveyCheckBoxesExpectedSendingData1,
  editSurveyCheckBoxesExpectedSendingData2,
  editSurveyCheckBoxesExpectedSendingData3,
  editSurveyCheckBoxesExpectedSendingData4,
  editSurveyCheckBoxesExpectedSendingData5,
  editSurveyCheckBoxesExpectedSendingData6,
  editSurveyCheckBoxesExpectedSendingData7,
  editSurveyCheckBoxesExpectedSendingData8,
  editSurveyCheckBoxesExpectedSendingData9,
  editSurveyCheckBoxesExpectedSendingData10,
  editSurveyCheckBoxesExpectedSendingData11,
  editSurveyCheckBoxesExpectedSendingData12,
  editSurveyCheckBoxesExpectedSendingData13,
  editSurveyCheckBoxesExpectedSendingData14,
  editSurveyCheckBoxesExpectedSendingData15,
  editSurveyCheckBoxesExpectedSendingData16,
  editSurveyCheckBoxesExpectedSendingData17,
  editSurveyCheckBoxesExpectedSendingData18
} from './surveyEntryEdit-test-data';

test("editSurveyCheckBoxes(e) case 1", () => {
  var props = {
    location: {
      state: {
        beachName: "Coy Beach",
        info: {},
        surveyData: {
          reason: {
            prox: true
          },
          SRSDebris: {},
          ASDebris: {},
          MicroDebris: {}
        },
        userProfile: {
          name: "stgibson@ucsc.edu",
          email: "stgibson@ucsc.edu",
          sub: "auth0|5e2f29b0285a700e93a1a53a"
        }
      }
    }
  };
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEReasonProx))
    .toEqual(editSurveyCheckBoxesExpectedOldData1, editSurveyCheckBoxesExpectedSendingData1);
});