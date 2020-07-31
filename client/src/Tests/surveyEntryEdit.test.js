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
  editSurveyCheckBoxesProps1,
  editSurveyCheckBoxesProps2,
  editSurveyCheckBoxesProps3,
  editSurveyCheckBoxesProps4,
  editSurveyCheckBoxesProps5,
  editSurveyCheckBoxesProps6,
  editSurveyCheckBoxesProps7,
  editSurveyCheckBoxesProps8,
  editSurveyCheckBoxesProps9,
  editSurveyCheckBoxesProps10,
  editSurveyCheckBoxesProps11,
  editSurveyCheckBoxesProps12,
  editSurveyCheckBoxesProps13,
  editSurveyCheckBoxesProps14,
  editSurveyCheckBoxesProps15,
  editSurveyCheckBoxesProps16,
  editSurveyCheckBoxesProps17,
  editSurveyCheckBoxesProps18,
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
  var props = editSurveyCheckBoxesProps1;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEReasonProx))
    .toEqual(editSurveyCheckBoxesExpectedOldData1, editSurveyCheckBoxesExpectedSendingData1);
});