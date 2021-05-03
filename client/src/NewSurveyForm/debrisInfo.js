/**
 * debrisInfo.js
 * Contains information on the categories of trash. Used by
 * SurveySubsections/SurfaceRibScan.jsx,
 * SurveySubsections/AccumulationSurvey.jsx, SurveySubsections/Review.jsx,
 * ../Location/Location.jsx, ../SurveyEntry/SurveyEntry.jsx,
 * ../SurveyEntry/editableTable.jsx, and ../SurveyEntry/surveyEntryEdit.jsx.
 */

// maps id to name of category
const debrisInfo = {
  cigaretteButts: "Cigarette Butts",
  fishingLine: "Fishing Line",
  polypropyleneRope: "Polypropylene Rope",
  plasticCupsLids: "Plastic Cups and Lids",
  plasticStraws: "Plastic Straws",
  filmPlastic: "Film Plastic",
  miscPlastic: "Misc. Plastic",
  plasticBottles: "Plastic Bottles",
  plasticMetalBottleCaps: "Plastic or Metal Bottle Caps",
  urethaneFoam: "Urethane Foam",
  styrofoam: "Styrofoam",
  plasticCloth: "Plastic base cloth such as nylon/polyester",
  plasticHygieneItems: "Plastic Hygiene Items",
  plasticPPE: "Plastic PPE",
  other: "Other"
}

// maps id to name of any category that ever existed
const allDebrisInfo = {
  // current debris
  cigaretteButts: "Cigarette Butts",
  fishingLine: "Fishing Line",
  polypropyleneRope: "Polypropylene Rope",
  plasticCupsLids: "Plastic Cups and Lids",
  plasticStraws: "Plastic Straws",
  filmPlastic: "Film Plastic",
  miscPlastic: "Misc. Plastic",
  plasticBottles: "Plastic Bottles",
  plasticMetalBottleCaps: "Plastic or Metal Bottle Caps",
  urethaneFoam: "Urethane Foam",
  styrofoam: "Styrofoam",
  plasticCloth: "Plastic base cloth such as nylon/polyester",
  plasticHygieneItems: "Plastic Hygiene Items",
  plasticPPE: "Plastic PPE",
  other: "Other",

  // past debris
  styrothane: "Styrofoam / Urethane",
  otherPlastic: "Other: Plastics",
  otherFood: "Other: Food / Organics",
  otherCotton: "Other: Cotton / Cloth",
  otherWood: "Other: Wood / Paper",
  fishingLineRope: "Fishing Line / Polypropylene Rope",
  plasticCups: "Plastic Cups",
  filmedPlastic: "Filmed Plastic",
  plasticBottlesCaps: "Plastic Bottles / Plastic Caps",
  foodOrganic: "Food / Organic",
  metal: "Metal",
  glass: "Glass",
  cottonCloth: "Cotton / Cloth",
  aluminumCans: "Aluminum Cans",
  hygieneItems: "Hygiene Items",
  tileBrick: "Tile / Brick",
  woodPaper: "Wood / Paper",
}

// maps name of category to id
const debrisInfoID = {
  "Cigarette Butts": "cigaretteButts",
  "Fishing Line": "fishingLine",
  "Polypropylene Rope": "polypropyleneRope",
  "Plastic Cups and Lids": "plasticCupsLids",
  "Plastic Straws": "plasticStraws",
  "Film Plastic": "filmPlastic",
  "Misc. Plastic": "miscPlastic",
  "Plastic Bottles": "plasticBottles",
  "Plastic or Metal Bottle Caps": "plasticMetalBottleCaps",
  "Urethane Foam": "urethaneFoam",
  "Styrofoam": "styrofoam",
  "Plastic base cloth such as nylon/polyester": "plasticCloth",
  "Plastic Hygiene Items": "plasticHygieneItems",
  "Plastic PPE": "plasticPPE",
  "Other": "other"
}

// maps name of category to id for categories that ever existed
const allDebrisInfoID = {
  // current debris
  "Cigarette Butts": "cigaretteButts",
  "Fishing Line": "fishingLine",
  "Polypropylene Rope": "polypropyleneRope",
  "Plastic Cups and Lids": "plasticCupsLids",
  "Plastic Straws": "plasticStraws",
  "Film Plastic": "filmPlastic",
  "Misc. Plastic": "miscPlastic",
  "Plastic Bottles": "plasticBottles",
  "Plastic or Metal Bottle Caps": "plasticMetalBottleCaps",
  "Urethane Foam": "urethaneFoam",
  "Styrofoam": "styrofoam",
  "Plastic base cloth such as nylon/polyester": "plasticCloth",
  "Plastic Hygiene Items": "plasticHygieneItems",
  "Plastic PPE": "plasticPPE",
  "Other": "other",

  // past debris
  "Styrofoam / Urethane": "styrothane",
  "Other: Plastics": "otherPlastic",
  "Other: Food / Organics": "otherFood",
  "Other: Cotton / Cloth": "otherCotton",
  "Other: Wood / Paper": "otherWood",
  "Fishing Line / Polypropylene Rope": "fishingLineRope",
  "Plastic Cups": "plasticCups",
  "Filmed Plastic": "filmedPlastic",
  "Plastic Bottles / Plastic Caps": "plasticBottlesCaps",
  "Food / Organic": "foodOrganic",
  "Metal": "metal",
  "Glass": "glass",
  "Cotton / Cloth": "cottonCloth",
  "Aluminum Cans": "aluminumCans",
  "Hygiene Items": "hygieneItems",
  "Tile / Brick": "tileBrick",
  "Wood / Paper": "woodPaper"
}

// list of categories of trash
const debrisNames = Object.values(debrisInfo);

// list of categories of trash for categories that ever existed
const allDebrisNames = Object.values(allDebrisInfo);

/**
 * Gets name of category of trash by id.
 * @param {any} id
 * @return name
 */
function getDebrisNameById(id) {
  return debrisInfo[id];
}

/**
 * Gets name of category of trash by id for categories that ever existed.
 * @param {any} id
 * @return name
 */
function getAllDebrisNameById(id) {
  return allDebrisInfo[id];
}

/**
 * Gets id by name of category of trash.
 * @param {any} debrisName
 * @return id
 */
function getDebrisID (debrisName) {
  return debrisInfoID[debrisName];
}

/**
 * Gets id by name of category of trash for categories that ever existed.
 * @param {any} debrisName
 * @return id
 */
function getAllDebrisID(debrisName) {
  return allDebrisInfoID[debrisName];
}

/**
 * Gets mapping of id to name of category of trash.
 * @return const debrisInfo
 */
function getDebrisMap () {
  return debrisInfo;
}

/**
 * Gets mapping of id to name of category of trash for categories that ever
 * existed.
 * @return const allDebrisInfo
 */
function getAllDebrisMap() {
  return allDebrisInfo;
}

export {
  getDebrisNameById,
  getDebrisMap,
  debrisNames,
  getDebrisID,
  getAllDebrisNameById,
  getAllDebrisMap,
  allDebrisNames,
  getAllDebrisID
}