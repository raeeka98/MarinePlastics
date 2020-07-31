/**
 * surveyEntryEdit-test-data.js
 * Contains sample state variables for automated testing. Used in
 * surveyEntryEdit.test.js.
 */

// for testing editSurveyCheckBoxes(e) on clicking reason.prox checkbox
var editSurveyCheckBoxesEReasonProx = {
  target: {
    name: "reason.prox"
  }
};

// for testing editSurveyCheckBoxes(e) on clicking reason.debris checkbox
var editSurveyCheckBoxesEReasonDebris = {
  target: {
    name: "reason.debris"
  }
};

// for testing editSurveyCheckBoxes(e) on clicking majorUse.rec checkbox
var editSurveyCheckBoxesEMajorUseRec = {
  target: {
    name: "majorUse.rec"
  }
};

// for testing editSurveyCheckBoxes(e) on clicking majorUse.com checkbox
var editSurveyCheckBoxesEMajorUseCom = {
  target: {
    name: "majorUse.com"
  }
};

// for testing editSurveyCheckBoxes(e) on clicking majorUse.rem checkbox
var editSurveyCheckBoxesEMajorUseRem = {
  target: {
    name: "majorUse.rem"
  }
};

// for testing editSurveyCheckBoxes(e) on clicking st.s checkbox
var editSurveyCheckBoxesEStS = {
  target: {
    name: "st.s"
  }
};

// for testing editSurveyCheckBoxes(e) on clicking st.p checkbox
var editSurveyCheckBoxesEStP = {
  target: {
    name: "st.p"
  }
};

// for testing editSurveyCheckBoxes(e) on clicking st.rr checkbox
var editSurveyCheckBoxesEStRr = {
  target: {
    name: "st.rr"
  }
};

// for testing editSurveyCheckBoxes(e) on clicking st.sea checkbox
var editSurveyCheckBoxesEStSea = {
  target: {
    name: "st.sea"
  }
};

// state.surveyData for reason.prox when it is checked
var editSurveyCheckBoxesSurveyData1 = {
  reason: {
    prox: true
  }
};

// state.surveyData for clicking reason.prox when it is unchecked
var editSurveyCheckBoxesSurveyData2 = {
  reason: {
    prox: false
  }
};

// state.surveyData for clicking reason.debris when it is checked
var editSurveyCheckBoxesSurveyData3 = {
  reason: {
    debris: true
  }
};

// state.surveyData for clicking reason.debris when it is unchecked
var editSurveyCheckBoxesSurveyData4 = {
  reason: {
    debris: false
  }
};

// state.surveyData for clicking majorUse.rec when it is checked
var editSurveyCheckBoxesSurveyData5 = {
  major: {
    rec: true
  }
};

// state.surveyData for clicking majorUse.rec when it is unchecked
var editSurveyCheckBoxesSurveyData6 = {
  majorUse: {
    rec: false
  }
};

// state.surveyData for clicking majorUse.com when it is checked
var editSurveyCheckBoxesSurveyData7 = {
  majorUse: {
    com: true
  }
};

// state.surveyData for clicking majorUse.com when it is unchecked
var editSurveyCheckBoxesSurveyData8 = {
  majorUse: {
    com: false
  }
};

// state.surveyData for clicking majorUse.rem when it is checked
var editSurveyCheckBoxesSurveyData9 = {
  majorUse: {
    rem: true
  }
};

// state.surveyData for clicking majorUse.rem when it is unchecked
var editSurveyCheckBoxesSurveyData10 = {
  majorUse: {
    rem: false
  }
};

// state.surveyData for clicking st.s when it is checked
var editSurveyCheckBoxesSurveyData11 = {
  st: {
    s: true
  }
};

// state.surveyData for clicking st.s when it is unchecked
var editSurveyCheckBoxesSurveyData12 = {
  st: {
    s: false
  }
};

// state.surveyData for clicking st.p when it is checked
var editSurveyCheckBoxesSurveyData13 = {
  st: {
    p: true
  }
};

// state.surveyData for clicking st.p when it is unchecked
var editSurveyCheckBoxesSurveyData14 = {
  st: {
    p: false
  }
};

// state.surveyData for clicking st.rr when it is checked
var editSurveyCheckBoxesSurveyData15 = {
  st: {
    rr: true
  }
};

// state.surveyData for clicking st.rr when it is unchecked
var editSurveyCheckBoxesSurveyData16 = {
  st: {
    rr: false
  }
};

// state.surveyData for clicking st.sea when it is checked
var editSurveyCheckBoxesSurveyData17 = {
  st: {
    sea: true
  }
};

// state.surveyData for clicking st.sea when it is unchecked
var editSurveyCheckBoxesSurveyData18 = {
  st: {
    sea: false
  }
};

// expected value of oldData.reason.prox when it is unchecked
var editSurveyCheckBoxesExpectedOldData1 = {
  "reason.prox": false
};

// expected value of oldData.reason.prox when it is checked
var editSurveyCheckBoxesExpectedOldData2 = {
  reason: {
    prox: true
  }
};

// expected value of oldData.reason.debris when it is unchecked
var editSurveyCheckBoxesExpectedOldData3 = {
  reason: {
    debris: false
  }
};

// expected value of oldData.reason.debris when it is checked
var editSurveyCheckBoxesExpectedOldData4 = {
  reason: {
    debris: true
  }
};

// expected value of oldData.majorUse.rec when it is unchecked
var editSurveyCheckBoxesExpectedOldData5 = {
  majorUse: {
    rec: false
  }
};

// expected value of oldData.majorUse.rec when it is checked
var editSurveyCheckBoxesExpectedOldData6 = {
  majorUse: {
    rec: true
  }
};

// expected value of oldData.majorUse.com when it is unchecked
var editSurveyCheckBoxesExpectedOldData7 = {
  majorUse: {
    com: false
  }
};

// expected value of oldData.majorUse.com when it is checked
var editSurveyCheckBoxesExpectedOldData8 = {
  majorUse: {
    com: true
  }
};

// expected value of oldData.majorUse.rem when it is unchecked
var editSurveyCheckBoxesExpectedOldData9 = {
  majorUse: {
    rem: false
  }
};

// expected value of oldData.majorUse.rem when it is checked
var editSurveyCheckBoxesExpectedOldData10 = {
  majorUse: {
    rem: true
  }
};

// expected value of oldData.st.s when it is unchecked
var editSurveyCheckBoxesExpectedOldData11 = {
  st: {
    s: false
  }
};

// expected value of oldData.st.s when it is checked
var editSurveyCheckBoxesExpectedOldData12 = {
  st: {
    s: true
  }
};

// expected value of oldData.st.p when it is unchecked
var editSurveyCheckBoxesExpectedOldData13 = {
  st: {
    p: false
  }
};

// expected value of oldData.st.p when it is checked
var editSurveyCheckBoxesExpectedOldData14 = {
  st: {
    p: true
  }
};

// expected value of oldData.st.rr when it is unchecked
var editSurveyCheckBoxesExpectedOldData15 = {
  st: {
    rr: false
  }
};

// expected value of oldData.st.rr when it is checked
var editSurveyCheckBoxesExpectedOldData16 = {
  st: {
    rr: true
  }
};

// expected value of oldData.st.sea when it is unchecked
var editSurveyCheckBoxesExpectedOldData17 = {
  st: {
    sea: false
  }
};

// expected value of oldData.st.sea when it is checked
var editSurveyCheckBoxesExpectedOldData18 = {
  st: {
    sea: true
  }
};

// expected value of sendingData.reason.prox when it is unchecked
var editSurveyCheckBoxesExpectedSendingData1 = {
  "reason.prox": false
};

// expected value of sendingData.reason.prox when it is checked
var editSurveyCheckBoxesExpectedSendingData2 = {
  reason: {
    prox: true
  }
};

// expected value of sendingData.reason.debris when it is unchecked
var editSurveyCheckBoxesExpectedSendingData3 = {
  reason: {
    debris: false
  }
};

// expected value of sendingData.reason.debris when it is checked
var editSurveyCheckBoxesExpectedSendingData4 = {
  reason: {
    debris: true
  }
};

// expected value of sendingData.majorUse.rec when it is unchecked
var editSurveyCheckBoxesExpectedSendingData5 = {
  majorUse: {
    rec: false
  }
};

// expected value of sendingData.majorUse.rec when it is checked
var editSurveyCheckBoxesExpectedSendingData6 = {
  majorUse: {
    rec: true
  }
};

// expected value of sendingData.majorUse.com when it is unchecked
var editSurveyCheckBoxesExpectedSendingData7 = {
  majorUse: {
    com: false
  }
};

// expected value of sendingData.majorUse.com when it is checked
var editSurveyCheckBoxesExpectedSendingData8 = {
  majorUse: {
    com: true
  }
};

// expected value of sendingData.majorUse.rem when it is unchecked
var editSurveyCheckBoxesExpectedSendingData9 = {
  majorUse: {
    rem: false
  }
};

// expected value of sendingData.majorUse.rem when it is checked
var editSurveyCheckBoxesExpectedSendingData10 = {
  majorUse: {
    rem: true
  }
};

// expected value of sendingData.st.s when it is unchecked
var editSurveyCheckBoxesExpectedSendingData11 = {
  st: {
    s: false
  }
};

// expected value of sendingData.st.s when it is checked
var editSurveyCheckBoxesExpectedSendingData12 = {
  st: {
    s: true
  }
};

// expected value of sendingData.st.p when it is unchecked
var editSurveyCheckBoxesExpectedSendingData13 = {
  st: {
    p: false
  }
};

// expected value of sendingData.st.p when it is checked
var editSurveyCheckBoxesExpectedSendingData14 = {
  st: {
    p: true
  }
};

// expected value of sendingData.st.rr when it is unchecked
var editSurveyCheckBoxesExpectedSendingData15 = {
  st: {
    rr: false
  }
};

// expected value of sendingData.st.rr when it is checked
var editSurveyCheckBoxesExpectedSendingData16 = {
  st: {
    rr: true
  }
};

// expected value of sendingData.st.sea when it is unchecked
var editSurveyCheckBoxesExpectedSendingData17 = {
  st: {
    sea: false
  }
};

// expected value of sendingData.st.sea when it is checked
var editSurveyCheckBoxesExpectedSendingData18 = {
  st: {
    sea: true
  }
};

export {
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
};