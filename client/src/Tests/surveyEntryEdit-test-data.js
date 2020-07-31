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

// props for SurveyEntryEdit(props) when reason.prox is checked
var editSurveyCheckBoxesProps1 = {
  location: {
    state: {
      beachName: "",
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

// props for SurveyEntryEdit(props) when reason.prox is unchecked
var editSurveyCheckBoxesProps2 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        reason: {
          prox: false
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

// props for SurveyEntryEdit(props) when reason.debris is checked
var editSurveyCheckBoxesProps3 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        reason: {
          debris: true
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

// props for SurveyEntryEdit(props) when reason.debris is unchecked
var editSurveyCheckBoxesProps4 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        reason: {
          debris: false
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

// props for SurveyEntryEdit(props) when majorUse.rec is checked
var editSurveyCheckBoxesProps5 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        majorUse: {
          rec: true
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

// props for SurveyEntryEdit(props) when majorUse.rec is unchecked
var editSurveyCheckBoxesProps6 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        majorUse: {
          rec: false
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

// props for SurveyEntryEdit(props) when majorUse.com is checked
var editSurveyCheckBoxesProps7 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        majorUse: {
          com: true
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

// props for SurveyEntryEdit(props) when majorUse.com is unchecked
var editSurveyCheckBoxesProps8 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        majorUse: {
          com: false
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

// props for SurveyEntryEdit(props) when majorUse.rem is checked
var editSurveyCheckBoxesProps9 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        majorUse: {
          rem: true
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

// props for SurveyEntryEdit(props) when majorUse.rem is unchecked
var editSurveyCheckBoxesProps10 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        majorUse: {
          rem: false
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

// props for SurveyEntryEdit(props) when st.s is checked
var editSurveyCheckBoxesProps11 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        st: {
          s: true
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

// props for SurveyEntryEdit(props) when st.s is unchecked
var editSurveyCheckBoxesProps12 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        st: {
          s: false
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

// props for SurveyEntryEdit(props) when st.p is checked
var editSurveyCheckBoxesProps13 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        st: {
          p: true
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

// props for SurveyEntryEdit(props) when st.p is unchecked
var editSurveyCheckBoxesProps14 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        st: {
          p: false
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

// props for SurveyEntryEdit(props) when st.rr is checked
var editSurveyCheckBoxesProps15 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        st: {
          rr: true
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

// props for SurveyEntryEdit(props) when st.rr is unchecked
var editSurveyCheckBoxesProps16 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        st: {
          rr: false
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

// props for SurveyEntryEdit(props) when st.sea is checked
var editSurveyCheckBoxesProps17 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        st: {
          sea: true
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

// props for SurveyEntryEdit(props) when st.sea is unchecked
var editSurveyCheckBoxesProps18 = {
  location: {
    state: {
      beachName: "",
      info: {},
      surveyData: {
        st: {
          sea: false
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
};