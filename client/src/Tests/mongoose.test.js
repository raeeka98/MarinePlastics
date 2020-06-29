/**
 * mongoose.test.js
 * Tests findDiffDebris(oldDebris, newDebris, diff) and
 * compareTrash(diff, prevDebrisData, result) in
 * ../../../server_modules/mongoose.js.
 */
import { findDiffsDebris, compareTrash } from './../../../server_modules/mongoose';
import {
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
} from './mongoose-test-data';

test("findDiffsDebris(oldDebris, newDebris, diffs) case 1", () => {
  var oldDebris = testFindDiffsDebrisOldDebris1;
  var newDebris = testFindDiffsDebrisNewDebris1;
  var diffs = testFindDiffsDebrisDiffs1;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs1);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 2", () => {
  var oldDebris = testFindDiffsDebrisOldDebris2;
  var newDebris = testFindDiffsDebrisNewDebris2;
  var diffs = testFindDiffsDebrisDiffs2;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs2);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 3", () => {
  var oldDebris = testFindDiffsDebrisOldDebris3;
  var newDebris = testFindDiffsDebrisNewDebris3;
  var diffs = testFindDiffsDebrisDiffs3;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs3);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 4", () => {
  var oldDebris = testFindDiffsDebrisOldDebris4;
  var newDebris = testFindDiffsDebrisNewDebris4;
  var diffs = testFindDiffsDebrisDiffs4;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs4);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 5", () => {
  var oldDebris = testFindDiffsDebrisOldDebris5;
  var newDebris = testFindDiffsDebrisNewDebris5;
  var diffs = testFindDiffsDebrisDiffs5;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs5);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 6", () => {
  var oldDebris = testFindDiffsDebrisOldDebris6;
  var newDebris = testFindDiffsDebrisNewDebris6;
  var diffs = testFindDiffsDebrisDiffs6;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs6);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 7", () => {
  var oldDebris = testFindDiffsDebrisOldDebris7;
  var newDebris = testFindDiffsDebrisNewDebris7;
  var diffs = testFindDiffsDebrisDiffs7;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs7);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 8", () => {
  var oldDebris = testFindDiffsDebrisOldDebris8;
  var newDebris = testFindDiffsDebrisNewDebris8;
  var diffs = testFindDiffsDebrisDiffs8;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs8);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 9", () => {
  var oldDebris = testFindDiffsDebrisOldDebris9;
  var newDebris = testFindDiffsDebrisNewDebris9;
  var diffs = testFindDiffsDebrisDiffs9;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs9);
});

test("findDiffsDebris(oldDebris, newDebris, diffs) case 10", () => {
  var oldDebris = testFindDiffsDebrisOldDebris10;
  var newDebris = testFindDiffsDebrisNewDebris10;
  var diffs = testFindDiffsDebrisDiffs10;

  findDiffsDebris(oldDebris, newDebris, diffs);

  expect(diffs).toEqual(expectedFindDiffsDebrisDiffs10);
});

test("compareTrash(diffs, prevDebrisData, result) case 1", () => {
  var diffs = testCompareTrashDiffs1;
  var prevDebrisData = testCompareTrashPrevDebrisData1;
  var result = [];

  compareTrash(diffs, prevDebrisData, result);

  expect(result).toEqual(expectedCompareTrashResult1);
});


test("compareTrash(diffs, prevDebrisData, result) case 2", () => {
  var diffs = testCompareTrashDiffs2;
  var prevDebrisData = testCompareTrashPrevDebrisData2;
  var result = [];

  compareTrash(diffs, prevDebrisData, result);

  expect(result).toEqual(expectedCompareTrashResult2);
});

test("compareTrash(diffs, prevDebrisData, result) case 3", () => {
  var diffs = testCompareTrashDiffs3;
  var prevDebrisData = testCompareTrashPrevDebrisData3;
  var result = [];

  compareTrash(diffs, prevDebrisData, result);

  expect(result).toEqual(expectedCompareTrashResult3);
});

test("compareTrash(diffs, prevDebrisData, result) case 4", () => {
  var diffs = testCompareTrashDiffs4;
  var prevDebrisData = testCompareTrashPrevDebrisData4;
  var result = [];

  compareTrash(diffs, prevDebrisData, result);

  expect(result).toEqual(expectedCompareTrashResult4);
});

test("compareTrash(diffs, prevDebrisData, result) case 5", () => {
  var diffs = testCompareTrashDiffs5;
  var prevDebrisData = testCompareTrashPrevDebrisData5;
  var result = [];

  compareTrash(diffs, prevDebrisData, result);

  expect(result).toEqual(expectedCompareTrashResult5);
});