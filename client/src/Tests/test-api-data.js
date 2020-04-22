/**
 * test-data.js
 * Contains sample survey data for testing communicating with the database.
 */

// data to be used to create and modify a new survey on the test database.
var testSurvey1 = {
  survData: {
    user: {
      f: "Sean",
      l: "Gibson"
    },
    email: "",
    userID: "",
    org: "Clean Oceans International",
    reason: "Known for Debris",
    survDate: new Date("2020-03-23T17:30:00.000Z"),
    st: "Sand",
    slope: "winter",
    cmpsDir: "180",
    lastTide: {
      type: "low",
      time: "12:00",
      height: "10"
    },
    nextTide: {
      type: "high",
      time: "16:00",
      height: "10"
    },
    wind: {
      dir: "s",
      spd: "10"
    },
    majorUse: "Recreation",
    numOfP: 0,
    SRSDebris: [
      [
        "cigaretteButts",
        {
          fresh: 20,
          weathered: 9
        }
      ],
      [
        "fishingLineRope",
        {
          fresh: 10,
          weathered: 7
        }
      ],
      [
        "plasticCups",
        {
          fresh: 8,
          weathered: 12
        }
      ],
      [
        "plasticStraws",
        {
          fresh: 4,
          weathered: 12
        }
      ],
      [
        "filmedPlastic",
        {
          fresh: 0,
          weathered: 0
        }
      ],
      [
        "miscPlastic",
        {
          fresh: 6,
          weathered: 3
        }
      ],
      [
        "plasticBottlesCaps",
        {
          fresh: 3,
          weathered: 10
        }
      ],
      [
        "styrofoam",
        {
          fresh: 2,
          weathered: 2
        }
      ],
      [
        "foodOrganic",
        {
          fresh: 5,
          weathered: 1
        }
      ],
      [
        "urethaneFoam",
        {
          fresh: 2,
          weathered: 2
        }
      ],
      [
        "metal",
        {
          fresh: 0,
          weathered: 1
        }
      ],
      [
        "glass",
        {
          fresh: 2,
          weathered: 0
        }
      ],
      [
        "cottonCloth",
        {
          fresh: 4,
          weathered: 8
        }
      ],
      [
        "aluminumCans",
        {
          fresh: 2,
          weathered: 1
        }
      ],
      [
        "hygieneItems",
        {
          fresh: 1,
          weathered: 1
        }
      ],
      [
        "tileBrick",
        {
          fresh: 3,
          weathered: 1
        }
      ],
      [
        "woodPaper",
        {
          fresh: 4,
          weathered: 4
        }
      ]
    ],
    ASDebris: [
      [
        "cigaretteButts",
        {
          fresh: 0,
          weathered: 10
        }
      ],
      [
        "fishingLineRope",
        {
          fresh: 0,
          weathered: 2
        }
      ],
      [
        "plasticCups",
        {
          fresh: 2,
          weathered: 0
        }
      ],
      [
        "plasticStraws",
        {
          fresh: 0,
          weathered: 13
        }
      ],
      [
        "filmedPlastic",
        {
          fresh: 2,
          weathered: 3
        }
      ],
      [
        "miscPlastic",
        {
          fresh: 0,
          weathered: 34
        }
      ],
      [
        "plasticBottlesCaps",
        {
          fresh: 1,
          weathered: 0
        }
      ],
      [
        "styrofoam",
        {
          fresh: 1,
          weathered: 4
        }
      ],
      [
        "foodOrganic",
        {
          fresh: 0,
          weathered: 3
        }
      ],
      [
        "urethaneFoam",
        {
          fresh: 1,
          weathered: 3
        }
      ],
      [
        "metal",
        {
          fresh: 2,
          weathered: 5
        }
      ],
      [
        "glass",
        {
          fresh: 0,
          weathered: 2
        }
      ],
      [
        "cottonCloth",
        {
          fresh: 0,
          weathered: 0
        }
      ],
      [
        "aluminumCans",
        {
          fresh: 1,
          weathered: 1
        }
      ],
      [
        "hygieneItems",
        {
          fresh: 0,
          weathered: 1
        }
      ],
      [
        "tileBrick",
        {
          fresh: 0,
          weathered: 3
        }
      ],
      [
        "woodPaper",
        {
          fresh: 0,
          weathered: 0
        }
      ]
    ]
  },
  beachData: {
    n: "Boardwalk_Beach",
    nroName: "Kawa_Rivera",
    lat: 36.95333333333333,
    lon: -122.0411111111111,
    nroDist: "10"
  },
  bID: undefined
};

export { testSurvey1 };