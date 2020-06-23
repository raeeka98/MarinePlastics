/**
 * mongoose.test.js
 * Tests findDiffDebris(oldDebris, newDebris, diff) and
 * compareTrash(diff, prevDebrisData, result) in
 * ../../../server_modules/mongoose.js.
 */
import { findDiffDebris, compareTrash } from './../../../server_modules/mongoose';
import {
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
} from './mongoose-test-data';

test("findDiffDebris(oldDebris, newDebris, diff) case 1", () => {
  var oldDebris = testFindDiffDebrisOldDebris1;
  var newDebris = testFindDiffDebrisNewDebris1;
  var diff = testFindDiffDebrisDiff1;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff1);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 2", () => {
  var oldDebris = testFindDiffDebrisOldDebris2;
  var newDebris = testFindDiffDebrisNewDebris2;
  var diff = testFindDiffDebrisDiff2;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff2);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 3", () => {
  var oldDebris = testFindDiffDebrisOldDebris3;
  var newDebris = testFindDiffDebrisNewDebris3;
  var diff = testFindDiffDebrisDiff3;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff3);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 4", () => {
  var oldDebris = testFindDiffDebrisOldDebris4;
  var newDebris = testFindDiffDebrisNewDebris4;
  var diff = testFindDiffDebrisDiff4;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff4);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 5", () => {
  var oldDebris = testFindDiffDebrisOldDebris5;
  var newDebris = testFindDiffDebrisNewDebris5;
  var diff = testFindDiffDebrisDiff5;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff5);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 6", () => {
  var oldDebris = testFindDiffDebrisOldDebris6;
  var newDebris = testFindDiffDebrisNewDebris6;
  var diff = testFindDiffDebrisDiff6;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff6);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 7", () => {
  var oldDebris = testFindDiffDebrisOldDebris7;
  var newDebris = testFindDiffDebrisNewDebris7;
  var diff = testFindDiffDebrisDiff7;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff7);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 8", () => {
  var oldDebris = testFindDiffDebrisOldDebris8;
  var newDebris = testFindDiffDebrisNewDebris8;
  var diff = testFindDiffDebrisDiff8;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff8);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 9", () => {
  var oldDebris = testFindDiffDebrisOldDebris9;
  var newDebris = testFindDiffDebrisNewDebris9;
  var diff = testFindDiffDebrisDiff9;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff9);
});

test("findDiffDebris(oldDebris, newDebris, diff) case 10", () => {
  var oldDebris = testFindDiffDebrisOldDebris10;
  var newDebris = testFindDiffDebrisNewDebris10;
  var diff = testFindDiffDebrisDiff10;

  findDiffDebris(oldDebris, newDebris, diff);

  expect(diff).toEqual(expectedFindDiffDebrisDiff10);
});