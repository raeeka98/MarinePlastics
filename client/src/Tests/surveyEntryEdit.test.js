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
    .toEqual(editSurveyCheckBoxesExpectedOldData1,
      editSurveyCheckBoxesExpectedSendingData1);
});

test("editSurveyCheckBoxes(e) case 2", () => {
  var props = editSurveyCheckBoxesProps2;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEReasonProx))
    .toEqual(editSurveyCheckBoxesExpectedOldData2,
      editSurveyCheckBoxesExpectedSendingData2);
});

test("editSurveyCheckBoxes(e) case 3", () => {
  var props = editSurveyCheckBoxesProps3;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit
    .editSurveyCheckBoxes(editSurveyCheckBoxesEReasonDebris))
    .toEqual(editSurveyCheckBoxesExpectedOldData3,
      editSurveyCheckBoxesExpectedSendingData3);
});

test("editSurveyCheckBoxes(e) case 4", () => {
  var props = editSurveyCheckBoxesProps4;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit
    .editSurveyCheckBoxes(editSurveyCheckBoxesEReasonDebris))
    .toEqual(editSurveyCheckBoxesExpectedOldData4,
      editSurveyCheckBoxesExpectedSendingData4);
});

test("editSurveyCheckBoxes(e) case 5", () => {
  var props = editSurveyCheckBoxesProps5;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit
    .editSurveyCheckBoxes(editSurveyCheckBoxesEMajorUseRec))
    .toEqual(editSurveyCheckBoxesExpectedOldData5,
      editSurveyCheckBoxesExpectedSendingData5);
});

test("editSurveyCheckBoxes(e) case 6", () => {
  var props = editSurveyCheckBoxesProps6;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit
    .editSurveyCheckBoxes(editSurveyCheckBoxesEMajorUseRec))
    .toEqual(editSurveyCheckBoxesExpectedOldData6,
      editSurveyCheckBoxesExpectedSendingData6);
});

test("editSurveyCheckBoxes(e) case 7", () => {
  var props = editSurveyCheckBoxesProps7;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit
    .editSurveyCheckBoxes(editSurveyCheckBoxesEMajorUseCom))
    .toEqual(editSurveyCheckBoxesExpectedOldData7,
      editSurveyCheckBoxesExpectedSendingData7);
});

test("editSurveyCheckBoxes(e) case 8", () => {
  var props = editSurveyCheckBoxesProps8;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit
    .editSurveyCheckBoxes(editSurveyCheckBoxesEMajorUseCom))
    .toEqual(editSurveyCheckBoxesExpectedOldData8,
      editSurveyCheckBoxesExpectedSendingData8);
});

test("editSurveyCheckBoxes(e) case 9", () => {
  var props = editSurveyCheckBoxesProps9;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit
    .editSurveyCheckBoxes(editSurveyCheckBoxesEMajorUseRem))
    .toEqual(editSurveyCheckBoxesExpectedOldData9,
      editSurveyCheckBoxesExpectedSendingData9);
});

test("editSurveyCheckBoxes(e) case 10", () => {
  var props = editSurveyCheckBoxesProps10;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit
    .editSurveyCheckBoxes(editSurveyCheckBoxesEMajorUseRem))
    .toEqual(editSurveyCheckBoxesExpectedOldData10,
      editSurveyCheckBoxesExpectedSendingData10);
});

test("editSurveyCheckBoxes(e) case 11", () => {
  var props = editSurveyCheckBoxesProps11;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEStS))
    .toEqual(editSurveyCheckBoxesExpectedOldData11,
      editSurveyCheckBoxesExpectedSendingData11);
});

test("editSurveyCheckBoxes(e) case 12", () => {
  var props = editSurveyCheckBoxesProps12;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEStS))
    .toEqual(editSurveyCheckBoxesExpectedOldData12,
      editSurveyCheckBoxesExpectedSendingData12);
});

test("editSurveyCheckBoxes(e) case 13", () => {
  var props = editSurveyCheckBoxesProps13;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEStP))
    .toEqual(editSurveyCheckBoxesExpectedOldData13,
      editSurveyCheckBoxesExpectedSendingData13);
});

test("editSurveyCheckBoxes(e) case 14", () => {
  var props = editSurveyCheckBoxesProps14;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEStP))
    .toEqual(editSurveyCheckBoxesExpectedOldData14,
      editSurveyCheckBoxesExpectedSendingData14);
});

test("editSurveyCheckBoxes(e) case 15", () => {
  var props = editSurveyCheckBoxesProps15;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEStRr))
    .toEqual(editSurveyCheckBoxesExpectedOldData15,
      editSurveyCheckBoxesExpectedSendingData15);
});

test("editSurveyCheckBoxes(e) case 16", () => {
  var props = editSurveyCheckBoxesProps16;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEStRr))
    .toEqual(editSurveyCheckBoxesExpectedOldData16,
      editSurveyCheckBoxesExpectedSendingData16);
});

test("editSurveyCheckBoxes(e) case 17", () => {
  var props = editSurveyCheckBoxesProps17;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEStSea))
    .toEqual(editSurveyCheckBoxesExpectedOldData17,
      editSurveyCheckBoxesExpectedSendingData17);
});

test("editSurveyCheckBoxes(e) case 18", () => {
  var props = editSurveyCheckBoxesProps18;
  var surveyEntryEdit = new SurveyEntryEdit(props);
  expect(surveyEntryEdit.editSurveyCheckBoxes(editSurveyCheckBoxesEStSea))
    .toEqual(editSurveyCheckBoxesExpectedOldData18,
      editSurveyCheckBoxesExpectedSendingData18);
});