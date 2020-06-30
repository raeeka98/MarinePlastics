/**
 * mongoose-test-data.js
 * Contains test variables for automated testing. Used by mongoose.test.js.
 */

// variables to test findDiffDebris(oldDebris, newDebris, diff)

// oldDebris, newDebris, and diffs: empty
var testFindDiffsDebrisOldDebris1 = [];

var testFindDiffsDebrisNewDebris1 = [];

var testFindDiffsDebrisDiffs1 = {};

var expectedFindDiffsDebrisDiffs1 = {};

// oldDebris and diffs: empty; newDebris: 1 item
var testFindDiffsDebrisOldDebris2 = [];

var testFindDiffsDebrisNewDebris2 = [
  [
    "cigaretteButts",
    {
      fresh: 20,
      weathered: 9
    }
  ]
];

var testFindDiffsDebrisDiffs2 = {};

var expectedFindDiffsDebrisDiffs2 = {
  "cigaretteButts": 29
};

// newDebris and diffs: empty; oldDebris: 1 item
var testFindDiffsDebrisOldDebris3 = [
  [
    "cigaretteButts",
    {
      fresh: 20,
      weathered: 9
    }
  ]
];

var testFindDiffsDebrisNewDebris3 = [];

var testFindDiffsDebrisDiffs3 = {};

var expectedFindDiffsDebrisDiffs3 = {
  "cigaretteButts": -29
};

// oldDebris: 3 items; newDebris: same 3 items; diffs: empty
var testFindDiffsDebrisOldDebris4 = [
  [
    "cigaretteButts",
    {
      fresh: "20",
      weathered: "9"
    }
  ],
  [
    "fishingLineRope",
    {
      fresh: "10",
      weathered: "7"
    }
  ],
  [
    "plasticCups",
    {
      fresh: "8",
      weathered: "12"
    }
  ]
];

var testFindDiffsDebrisNewDebris4 = [
  [
    "cigaretteButts",
    {
      fresh: "22",
      weathered: "9"
    }
  ],
  [
    "fishingLineRope",
    {
      fresh: "6",
      weathered: "7"
    }
  ],
  [
    "plasticCups",
    {
      fresh: "8",
      weathered: "2"
    }
  ]
];

var testFindDiffsDebrisDiffs4 = {};

var expectedFindDiffsDebrisDiffs4 = {
  "cigaretteButts": 2,
  "fishingLineRope": -4,
  "plasticCups": -10
};

// oldDebris: 3 items; newDebris: 3 items, 1 not in oldDebris; diffs: empty
var testFindDiffsDebrisOldDebris5 = [
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

var testFindDiffsDebrisNewDebris5 = [
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

var testFindDiffsDebrisDiffs5 = {};

var expectedFindDiffsDebrisDiffs5 = {
  "cigaretteButts": 2,
  "fishingLineRope": -4,
  "plasticCups": -20,
  "plasticStraws":  16
};

// oldDebris, newDebris: empty; diffs: not empty
var testFindDiffsDebrisOldDebris6 = [];

var testFindDiffsDebrisNewDebris6 = [];

var testFindDiffsDebrisDiffs6 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffsDebrisDiffs6 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: empty; newDebris: 1 item, diffs: not empty
var testFindDiffsDebrisOldDebris7 = [];

var testFindDiffsDebrisNewDebris7 = [
  [
    "cigaretteButts",
    {
      fresh: 0,
      weathered: 10
    }
  ]
];

var testFindDiffsDebrisDiffs7 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffsDebrisDiffs7 = {
  "cigaretteButts": 12,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// newDebris: empty; oldDebris: 1 item; diffs: not empty
var testFindDiffsDebrisOldDebris8 = [
  [
    "cigaretteButts",
    {
      fresh: 0,
      weathered: 10
    }
  ]
];

var testFindDiffsDebrisNewDebris8 = [];

var testFindDiffsDebrisDiffs8 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffsDebrisDiffs8 = {
  "cigaretteButts": -8,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: 3 items; newDebris: same 3 items; diffs: not empty
var testFindDiffsDebrisOldDebris9 = [
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

var testFindDiffsDebrisNewDebris9 = [
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

var testFindDiffsDebrisDiffs9 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffsDebrisDiffs9 = {
  "cigaretteButts": 1,
  "fishingLineRope": 2,
  "plasticCups": -18,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

// oldDebris: 3 items; newDebris: 2 items in oldDebris, 1 new item; diffs: !mt
var testFindDiffsDebrisOldDebris10 = [
  [
    "cigaretteButts",
    {
      fresh: "0",
      weathered: "10"
    }
  ],
  [
    "fishingLineRope",
    {
      fresh: "0",
      weathered: "2"
    }
  ],
  [
    "plasticCups",
    {
      fresh: "2",
      weathered: "0"
    }
  ]
];

var testFindDiffsDebrisNewDebris10 = [
  [
    "cigaretteButts",
    {
      fresh: "0",
      weathered: "9"
    }
  ],
  [
    "fishingLineRope",
    {
      fresh: "2",
      weathered: "2"
    }
  ],
  [
    "plasticStraws",
    {
      fresh: "0",
      weathered: "13"
    }
  ]
];

var testFindDiffsDebrisDiffs10 = {
  "cigaretteButts": 2,
  "plasticCups": -20,
  "plasticStraws": 16,
  "filmedPlastic": 3
};

var expectedFindDiffsDebrisDiffs10 = {
  "cigaretteButts": 1,
  "fishingLineRope": 2,
  "plasticCups": -22,
  "plasticStraws": 29,
  "filmedPlastic": 3
};

// variables to test compareTrash(diffs, prevDebrisData, result)

// diffs and prevDebrisData empty
var testCompareTrashDiffs1 = {};

// when retrieved from database, shows up as Map
var testCompareTrashPrevDebrisData1 = new Map();

var expectedCompareTrashResult1 = [];

// diffs 1 item, prevDebrisData empty
var testCompareTrashDiffs2 = {
  "cigaretteButts": 29
};

var testCompareTrashPrevDebrisData2 = new Map();

var expectedCompareTrashResult2 = [
  [
    "cigaretteButts",
    29
  ]
];

// diffs empty, prevDebrisData 1 item
var testCompareTrashDiffs3 = {};

var testCompareTrashPrevDebrisData3 = new Map();
testCompareTrashPrevDebrisData3.set("cigaretteButts", 29);

var expectedCompareTrashResult3 = [];

// diffs 3 items, prevDebrisData 3 items
var testCompareTrashDiffs4 = {
  "cigaretteButts": 2,
  "fishingLineRope": -4,
  "plasticCups": -10
};

var testCompareTrashPrevDebrisData4 = new Map();
testCompareTrashPrevDebrisData4.set("cigaretteButts", 29);
testCompareTrashPrevDebrisData4.set("fishingLineRope", 17);
testCompareTrashPrevDebrisData4.set("plasticCups", 20);

var expectedCompareTrashResult4 = [
  [
    "cigaretteButts",
    31
  ],
  [
    "fishingLineRope",
    13
  ],
  [
    "plasticCups",
    10
  ]
];

// diffs 3 items, prevDebrisData, 3 items, one item not shared between two vars
var testCompareTrashDiffs5 = {
  "cigaretteButts": 2,
  "fishingLineRope": -4,
  "plasticStraws": 16
};

var testCompareTrashPrevDebrisData5 = new Map();
testCompareTrashPrevDebrisData5.set("cigaretteButts", 29);
testCompareTrashPrevDebrisData5.set("fishingLineRope", 17);
testCompareTrashPrevDebrisData5.set("plasticCups", 20);

var expectedCompareTrashResult5 = [
  [
    "cigaretteButts",
    31
  ],
  [
    "fishingLineRope",
    13
  ],
  [
    "plasticStraws",
    16
  ],
  [
    "plasticCups",
    20
  ]
];

export {
  testFindDiffsDebrisOldDebris1,
  testFindDiffsDebrisOldDebris2,
  testFindDiffsDebrisOldDebris3,
  testFindDiffsDebrisOldDebris4,
  testFindDiffsDebrisOldDebris5,
  testFindDiffsDebrisOldDebris6,
  testFindDiffsDebrisOldDebris7,
  testFindDiffsDebrisOldDebris8,
  testFindDiffsDebrisOldDebris9,
  testFindDiffsDebrisOldDebris10,
  testFindDiffsDebrisNewDebris1,
  testFindDiffsDebrisNewDebris2,
  testFindDiffsDebrisNewDebris3,
  testFindDiffsDebrisNewDebris4,
  testFindDiffsDebrisNewDebris5,
  testFindDiffsDebrisNewDebris6,
  testFindDiffsDebrisNewDebris7,
  testFindDiffsDebrisNewDebris8,
  testFindDiffsDebrisNewDebris9,
  testFindDiffsDebrisNewDebris10,
  testFindDiffsDebrisDiffs1,
  testFindDiffsDebrisDiffs2,
  testFindDiffsDebrisDiffs3,
  testFindDiffsDebrisDiffs4,
  testFindDiffsDebrisDiffs5,
  testFindDiffsDebrisDiffs6,
  testFindDiffsDebrisDiffs7,
  testFindDiffsDebrisDiffs8,
  testFindDiffsDebrisDiffs9,
  testFindDiffsDebrisDiffs10,
  expectedFindDiffsDebrisDiffs1,
  expectedFindDiffsDebrisDiffs2,
  expectedFindDiffsDebrisDiffs3,
  expectedFindDiffsDebrisDiffs4,
  expectedFindDiffsDebrisDiffs5,
  expectedFindDiffsDebrisDiffs6,
  expectedFindDiffsDebrisDiffs7,
  expectedFindDiffsDebrisDiffs8,
  expectedFindDiffsDebrisDiffs9,
  expectedFindDiffsDebrisDiffs10,
  testCompareTrashDiffs1,
  testCompareTrashDiffs2,
  testCompareTrashDiffs3,
  testCompareTrashDiffs4,
  testCompareTrashDiffs5,
  testCompareTrashPrevDebrisData1,
  testCompareTrashPrevDebrisData2,
  testCompareTrashPrevDebrisData3,
  testCompareTrashPrevDebrisData4,
  testCompareTrashPrevDebrisData5,
  expectedCompareTrashResult1,
  expectedCompareTrashResult2,
  expectedCompareTrashResult3,
  expectedCompareTrashResult4,
  expectedCompareTrashResult5
};