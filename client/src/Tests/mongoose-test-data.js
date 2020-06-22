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

var expectedFindDiffDebrisDiff3 = {};

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
var testFindDiffDebrisOldDebris1 = [];

var testFindDiffDebrisNewDebris1 = [];

var testFindDiffDebrisDiff1 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff1 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: empty; newDebris: 1 item, diff: not empty
var testFindDiffDebrisOldDebris2 = [];

var testFindDiffDebrisNewDebris2 = [
  [
    "cigaretteButts",
    {
      fresh: 0,
      weathered: 10
    }
  ]
];

var testFindDiffDebrisDiff2 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff2 = {
  "cigaretteButts": 12,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// newDebris: empty; oldDebris: 1 item; diff: not empty
var testFindDiffDebrisOldDebris3 = [
  [
    "cigaretteButts",
    {
      fresh: 0,
      weathered: 10
    }
  ]
];

var testFindDiffDebrisNewDebris3 = [];

var testFindDiffDebrisDiff3 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff3 = {
  "cigaretteButts": -8,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: 3 items; newDebris: same 3 items; diff: not empty
var testFindDiffDebrisOldDebris4 = [
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

var testFindDiffDebrisNewDebris4 = [
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

var testFindDiffDebrisDiff4 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff4 = {
  "cigaretteButts": 1,
  "fishingLineRope": 2,
  "plasticCups": -22,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: 3 items; newDebris: 2 items in oldDebris, 1 new item; diff: !mt
var testFindDiffDebrisOldDebris5 = [
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

var testFindDiffDebrisNewDebris5 = [
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

var testFindDiffDebrisDiff5 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffDebrisDiff5 = {
  "cigaretteButts": 1,
  "fishingLineRope": 2,
  "plasticCups": -2,
  "plasticStraws": 13,
  "filmedPlastic": 3
};