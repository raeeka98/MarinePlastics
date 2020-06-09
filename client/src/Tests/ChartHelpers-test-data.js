/**
 * ChartHelpers-test-data.js
 * Stores test variables for ChartHelpers.test.js.
 */

// test survey for sumTotals(surveys, type) with no micro debris
var sumTotalsSurveys1 = [
  {
    _id: "5ea770d4ddb0653a2431eed7",
    user: {
      f: "Sean",
      l: "Gibson"
    },
    email: "stgibson@ucsc.edu",
    org: "Clean Oceans International",
    reason: {
      debris: true
    },
    survDate: "2020-03-23T17:30:00.000Z",
    st: {
      s: true
    },
    slope: "winter",
    cmpsDir: 180,
    lastTide: {
      type: "low",
      time: "12:00",
      height: 10
    },
    nextTide: {
      type: "high",
      time: "16:00",
      height: 10
    },
    wind: {
      dir: "s",
      spd: 10
    },
    majorUse: {
      rec: true
    },
    numOfP: 0,
    SRSDebris: {
      cigaretteButts: {
        fresh: 20,
        weathered: 9
      },
      fishingLineRope: {
        fresh: 10,
        weathered: 7
      },
      plasticCups: {
        fresh: 8,
        weathered: 12
      },
      plasticStraws: {
        fresh: 4,
        weathered: 12
      },
      filmedPlastic: {
        fresh: 0,
        weathered: 0
      },
      miscPlastic: {
        fresh: 6,
        weathered: 3
      },
      plasticBottlesCaps: {
        fresh: 3,
        weathered: 10
      },
      styrofoam: {
        fresh: 2,
        weathered: 2
      },
      foodOrganic: {
        fresh: 5,
        weathered: 1
      },
      urethaneFoam: {
        fresh: 2,
        weathered: 2
      },
      metal: {
        fresh: 0,
        weathered: 1
      },
      glass: {
        fresh: 2,
        weathered: 0
      },
      cottonCloth: {
        fresh: 4,
        weathered: 8
      },
      aluminumCans: {
        fresh: 2,
        weathered: 1
      },
      hygieneItems: {
        fresh: 1,
        weathered: 1
      },
      tileBrick: {
        fresh: 3,
        weathered: 1
      },
      woodPaper: {
        fresh: 4,
        weathered: 4
      }
    },
    ASDebris: {
      cigaretteButts: {
        fresh: 0,
        weathered: 10
      },
      fishingLineRope: {
        fresh: 0,
        weathered: 2
      },
      plasticCups: {
        fresh: 2,
        weathered: 0
      },
      plasticStraws: {
        fresh: 0,
        weathered: 13
      },
      filmedPlastic: {
        fresh: 2,
        weathered: 3
      },
      miscPlastic: {
        fresh: 0,
        weathered: 34
      },
      plasticBottlesCaps: {
        fresh: 1,
        weathered: 0
      },
      styrofoam: {
        fresh: 1,
        weathered: 4
      },
      foodOrganic: {
        fresh: 0,
        weathered: 3
      },
      urethaneFoam: {
        fresh: 1,
        weathered: 3
      },
      metal: {
        fresh: 2,
        weathered: 5
      },
      glass: {
        fresh: 0,
        weathered: 2
      },
      cottonCloth: {
        fresh: 0,
        weathered: 0
      },
      aluminumCans: {
        fresh: 1,
        weathered: 1
      },
      hygieneItems: {
        fresh: 0,
        weathered: 1
      },
      tileBrick: {
        fresh: 0,
        weathered: 3
      },
      woodPaper: {
        fresh: 0,
        weathered: 0
      }
    },
    MicroDebris: {},
    bID: "5ea770d4ddb0653a2431eed6"
  }
];

// expected response from sumTotals(surveys, type) with SRS using above survey
var sumTotalsExpectedSRS = {
  "3/23/2020": 150
};

// expected response from sumTotals(surveys, type) with AS using above survey
var sumTotalsExpectedAS = {
  "3/23/2020": 94
};

// expected response from sumTotals(surveys, type) with MDS using above survey
var sumTotalsExpectedMDS1 = {};

// test survey for sumTotals(surveys, type) with micro debris 0 data
var sumTotalsSurveys2 = [
  {
    _id: "5ea770d4ddb0653a2431eed7",
    user: {
      f: "Sean",
      l: "Gibson"
    },
    email: "stgibson@ucsc.edu",
    org: "Clean Oceans International",
    reason: {
      debris: true
    },
    survDate: "2020-03-23T17:30:00.000Z",
    st: {
      s: true
    },
    slope: "winter",
    cmpsDir: 180,
    lastTide: {
      type: "low",
      time: "12:00",
      height: 10
    },
    nextTide: {
      type: "high",
      time: "16:00",
      height: 10
    },
    wind: {
      dir: "s",
      spd: 10
    },
    majorUse: {
      rec: true
    },
    numOfP: 0,
    SRSDebris: {
      cigaretteButts: {
        fresh: 20,
        weathered: 9
      },
      fishingLineRope: {
        fresh: 10,
        weathered: 7
      },
      plasticCups: {
        fresh: 8,
        weathered: 12
      },
      plasticStraws: {
        fresh: 4,
        weathered: 12
      },
      filmedPlastic: {
        fresh: 0,
        weathered: 0
      },
      miscPlastic: {
        fresh: 6,
        weathered: 3
      },
      plasticBottlesCaps: {
        fresh: 3,
        weathered: 10
      },
      styrofoam: {
        fresh: 2,
        weathered: 2
      },
      foodOrganic: {
        fresh: 5,
        weathered: 1
      },
      urethaneFoam: {
        fresh: 2,
        weathered: 2
      },
      metal: {
        fresh: 0,
        weathered: 1
      },
      glass: {
        fresh: 2,
        weathered: 0
      },
      cottonCloth: {
        fresh: 4,
        weathered: 8
      },
      aluminumCans: {
        fresh: 2,
        weathered: 1
      },
      hygieneItems: {
        fresh: 1,
        weathered: 1
      },
      tileBrick: {
        fresh: 3,
        weathered: 1
      },
      woodPaper: {
        fresh: 4,
        weathered: 4
      }
    },
    ASDebris: {
      cigaretteButts: {
        fresh: 0,
        weathered: 10
      },
      fishingLineRope: {
        fresh: 0,
        weathered: 2
      },
      plasticCups: {
        fresh: 2,
        weathered: 0
      },
      plasticStraws: {
        fresh: 0,
        weathered: 13
      },
      filmedPlastic: {
        fresh: 2,
        weathered: 3
      },
      miscPlastic: {
        fresh: 0,
        weathered: 34
      },
      plasticBottlesCaps: {
        fresh: 1,
        weathered: 0
      },
      styrofoam: {
        fresh: 1,
        weathered: 4
      },
      foodOrganic: {
        fresh: 0,
        weathered: 3
      },
      urethaneFoam: {
        fresh: 1,
        weathered: 3
      },
      metal: {
        fresh: 2,
        weathered: 5
      },
      glass: {
        fresh: 0,
        weathered: 2
      },
      cottonCloth: {
        fresh: 0,
        weathered: 0
      },
      aluminumCans: {
        fresh: 1,
        weathered: 1
      },
      hygieneItems: {
        fresh: 0,
        weathered: 1
      },
      tileBrick: {
        fresh: 0,
        weathered: 3
      },
      woodPaper: {
        fresh: 0,
        weathered: 0
      }
    },
    MicroDebris: {
      microDebris: {
        fresh: 0,
        weathered: 0
      }
    },
    bID: "5ea770d4ddb0653a2431eed6"
  }
];

// expected response from sumTotals(surveys, type) with MDS using above survey
var sumTotalsExpectedMDS2 = {
  "3/23/2020": 0
};

// test survey for sumTotals(surveys, type) with micro debris nonzero
var sumTotalsSurveys3 = [
  {
    _id: "5ea770d4ddb0653a2431eed7",
    user: {
      f: "Sean",
      l: "Gibson"
    },
    email: "stgibson@ucsc.edu",
    org: "Clean Oceans International",
    reason: {
      debris: true
    },
    survDate: "2020-03-23T17:30:00.000Z",
    st: {
      s: true
    },
    slope: "winter",
    cmpsDir: 180,
    lastTide: {
      type: "low",
      time: "12:00",
      height: 10
    },
    nextTide: {
      type: "high",
      time: "16:00",
      height: 10
    },
    wind: {
      dir: "s",
      spd: 10
    },
    majorUse: {
      rec: true
    },
    numOfP: 0,
    SRSDebris: {
      cigaretteButts: {
        fresh: 20,
        weathered: 9
      },
      fishingLineRope: {
        fresh: 10,
        weathered: 7
      },
      plasticCups: {
        fresh: 8,
        weathered: 12
      },
      plasticStraws: {
        fresh: 4,
        weathered: 12
      },
      filmedPlastic: {
        fresh: 0,
        weathered: 0
      },
      miscPlastic: {
        fresh: 6,
        weathered: 3
      },
      plasticBottlesCaps: {
        fresh: 3,
        weathered: 10
      },
      styrofoam: {
        fresh: 2,
        weathered: 2
      },
      foodOrganic: {
        fresh: 5,
        weathered: 1
      },
      urethaneFoam: {
        fresh: 2,
        weathered: 2
      },
      metal: {
        fresh: 0,
        weathered: 1
      },
      glass: {
        fresh: 2,
        weathered: 0
      },
      cottonCloth: {
        fresh: 4,
        weathered: 8
      },
      aluminumCans: {
        fresh: 2,
        weathered: 1
      },
      hygieneItems: {
        fresh: 1,
        weathered: 1
      },
      tileBrick: {
        fresh: 3,
        weathered: 1
      },
      woodPaper: {
        fresh: 4,
        weathered: 4
      }
    },
    ASDebris: {
      cigaretteButts: {
        fresh: 0,
        weathered: 10
      },
      fishingLineRope: {
        fresh: 0,
        weathered: 2
      },
      plasticCups: {
        fresh: 2,
        weathered: 0
      },
      plasticStraws: {
        fresh: 0,
        weathered: 13
      },
      filmedPlastic: {
        fresh: 2,
        weathered: 3
      },
      miscPlastic: {
        fresh: 0,
        weathered: 34
      },
      plasticBottlesCaps: {
        fresh: 1,
        weathered: 0
      },
      styrofoam: {
        fresh: 1,
        weathered: 4
      },
      foodOrganic: {
        fresh: 0,
        weathered: 3
      },
      urethaneFoam: {
        fresh: 1,
        weathered: 3
      },
      metal: {
        fresh: 2,
        weathered: 5
      },
      glass: {
        fresh: 0,
        weathered: 2
      },
      cottonCloth: {
        fresh: 0,
        weathered: 0
      },
      aluminumCans: {
        fresh: 1,
        weathered: 1
      },
      hygieneItems: {
        fresh: 0,
        weathered: 1
      },
      tileBrick: {
        fresh: 0,
        weathered: 3
      },
      woodPaper: {
        fresh: 0,
        weathered: 0
      }
    },
    MicroDebris: {
      microDebris: {
        fresh: 7,
        weathered: 8
      }
    },
    bID: "5ea770d4ddb0653a2431eed6"
  }
];

// expected response from sumTotals(surveys, type) with MDS using above survey
var sumTotalsExpectedMDS3 = {
  "3/23/2020": 15
};

export {
  sumTotalsSurveys1,
  sumTotalsSurveys2,
  sumTotalsSurveys3,
  sumTotalsExpectedSRS,
  sumTotalsExpectedAS,
  sumTotalsExpectedMDS1,
  sumTotalsExpectedMDS2,
  sumTotalsExpectedMDS3
};