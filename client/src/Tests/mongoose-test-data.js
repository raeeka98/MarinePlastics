/**
 * mongoose-test-data.js
 * Contains test variables for automated testing. Used by mongoose.test.js.
 */

// variables to test findDiffDebris(oldDebris, newDebris, diff)

// oldDebris, newDebris, and diff: empty
var testFindDiffDebrisOldDebris1 = [];

var testFindDiffDebrisNewDebris1 = [];

var testFindDiffDebrisDiff1 = {};

var expectedFindDiffDebrisDiff1 = {};

// oldDebris and diff: empty; newDebris: 1 item
var testFindDiffDebrisOldDebris2 = [];

var testFindDiffDebrisNewDebris2 = [
  [
    "cigaretteButts",
    {
      fresh: 20,
      weathered: 9
    }
  ]
];

var testFindDiffDebrisDiff2 = {};

var expectedFindDiffDebrisDiff2 = {
  "cigaretteButts": 29
};

// newDebris and diff: empty; oldDebris: 1 item
var testFindDiffDebrisOldDebris3 = [
  [
    "cigaretteButts",
    {
      fresh: 20,
      weathered: 9
    }
  ]
];

var testFindDiffDebrisNewDebris3 = [];

var testFindDiffDebrisDiff3 = {};

var expectedFindDiffDebrisDiff3 = {
  "cigaretteButts": -29
};

// oldDebris: 3 items; newDebris: same 3 items; diff: empty
var testFindDiffDebrisOldDebris4 = [
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
  ]
];

var testFindDiffDebrisNewDebris4 = [
  [
    "cigaretteButts",
    {
      fresh: 22,
      weathered: 9
    }
  ],
  [
    "fishingLineRope",
    {
      fresh: 6,
      weathered: 7
    }
  ],
  [
    "plasticCups",
    {
      fresh: 8,
      weathered: 2
    }
  ]
];

var testFindDiffDebrisDiff4 = {};

var expectedFindDiffDebrisDiff4 = {
  "cigaretteButts": 2,
  "fishingLineRope": -4,
  "plasticCups": -10
};

// oldDebris: 3 items; newDebris: 2 items in oldDebris, 1 new item; diff: empty
var testFindDiffDebrisOldDebris5 = [
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
  ]
];

var testFindDiffDebrisNewDebris5 = [
  [
    "cigaretteButts",
    {
      fresh: 22,
      weathered: 9
    }
  ],
  [
    "fishingLineRope",
    {
      fresh: 6,
      weathered: 7
    }
  ],
  [
    "plasticStraws",
    {
      fresh: 4,
      weathered: 12
    }
  ]
];

var testFindDiffDebrisDiff5 = {};

var expectedFindDiffDebrisDiff5 = {
  "cigaretteButts": 2,
  "fishingLineRope": -4,
  "plasticCups": -20,
  "plasticStraws":  16
};

// oldDebris, newDebris: empty; diff: not empty
var testFindDiffDebrisOldDebris6 = [];

var testFindDiffDebrisNewDebris6 = [];

var testFindDiffDebrisDiff6 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff6 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: empty; newDebris: 1 item, diff: not empty
var testFindDiffDebrisOldDebris7 = [];

var testFindDiffDebrisNewDebris7 = [
  [
    "cigaretteButts",
    {
      fresh: 0,
      weathered: 10
    }
  ]
];

var testFindDiffDebrisDiff7 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff7 = {
  "cigaretteButts": 12,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// newDebris: empty; oldDebris: 1 item; diff: not empty
var testFindDiffDebrisOldDebris8 = [
  [
    "cigaretteButts",
    {
      fresh: 0,
      weathered: 10
    }
  ]
];

var testFindDiffDebrisNewDebris8 = [];

var testFindDiffDebrisDiff8 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff8 = {
  "cigaretteButts": -8,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: 3 items; newDebris: same 3 items; diff: not empty
var testFindDiffDebrisOldDebris9 = [
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
  ]
];

var testFindDiffDebrisNewDebris9 = [
  [
    "cigaretteButts",
    {
      fresh: 0,
      weathered: 9
    }
  ],
  [
    "fishingLineRope",
    {
      fresh: 2,
      weathered: 2
    }
  ],
  [
    "plasticCups",
    {
      fresh: 4,
      weathered: 0
    }
  ]
];

var testFindDiffDebrisDiff9 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff9 = {
  "cigaretteButts": 1,
  "fishingLineRope": 2,
  "plasticCups": -22,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: 3 items; newDebris: 2 items in oldDebris, 1 new item; diff: !mt
var testFindDiffDebrisOldDebris10 = [
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
  ]
];

var testFindDiffDebrisNewDebris10 = [
  [
    "cigaretteButts",
    {
      fresh: 0,
      weathered: 9
    }
  ],
  [
    "fishingLineRope",
    {
      fresh: 2,
      weathered: 2
    }
  ],
  [
    "plasticStraws",
    {
      fresh: 0,
      weathered: 13
    }
  ]
];

var testFindDiffDebrisDiff10 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff10 = {
  "cigaretteButts": 1,
  "fishingLineRope": 2,
  "plasticCups": -2,
  "plasticStraws": 13,
  "filmedPlastic": 3
};

export {
  testFindDiffDebrisOldDebris1,
  testFindDiffDebrisOldDebris2,
  testFindDiffDebrisOldDebris3,
  testFindDiffDebrisOldDebris4,
  testFindDiffDebrisOldDebris5,
  testFindDiffDebrisOldDebris6,
  testFindDiffDebrisOldDebris7,
  testFindDiffDebrisOldDebris8,
  testFindDiffDebrisOldDebris9,
  testFindDiffDebrisOldDebris10,
  testFindDiffDebrisNewDebris1,
  testFindDiffDebrisNewDebris2,
  testFindDiffDebrisNewDebris3,
  testFindDiffDebrisNewDebris4,
  testFindDiffDebrisNewDebris5,
  testFindDiffDebrisNewDebris6,
  testFindDiffDebrisNewDebris7,
  testFindDiffDebrisNewDebris8,
  testFindDiffDebrisNewDebris9,
  testFindDiffDebrisNewDebris10,
  testFindDiffDebrisDiff1,
  testFindDiffDebrisDiff2,
  testFindDiffDebrisDiff3,
  testFindDiffDebrisDiff4,
  testFindDiffDebrisDiff5,
  testFindDiffDebrisDiff6,
  testFindDiffDebrisDiff7,
  testFindDiffDebrisDiff8,
  testFindDiffDebrisDiff9,
  testFindDiffDebrisDiff10,
  expectedFindDiffDebrisDiff1,
  expectedFindDiffDebrisDiff2,
  expectedFindDiffDebrisDiff3,
  expectedFindDiffDebrisDiff4,
  expectedFindDiffDebrisDiff5,
  expectedFindDiffDebrisDiff6,
  expectedFindDiffDebrisDiff7,
  expectedFindDiffDebrisDiff8,
  expectedFindDiffDebrisDiff9,
  expectedFindDiffDebrisDiff10
};