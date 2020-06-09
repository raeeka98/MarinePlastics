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
  fishingLineRope: "Fishing Line / Polypropylene Rope",
  plasticCups: "Plastic Cups",
  plasticStraws: "Plastic Straws",
  filmedPlastic: "Filmed Plastic",
  miscPlastic: "Misc. Plastic",
  plasticBottlesCaps: "Plastic Bottles / Plastic Caps",
  styrofoam: "Styrofoam",
  foodOrganic: "Food / Organic",
  urethaneFoam: "Urethane Foam",
  metal: "Metal",
  glass: "Glass",
  cottonCloth: "Cotton / Cloth",
  aluminumCans: "Aluminum Cans",
  hygieneItems: "Hygiene Items",
  tileBrick: "Tile / Brick",
  woodPaper: "Wood / Paper"
}

// maps id to name of any category that ever existed
const allDebrisInfo = {
  // current debris
  cigaretteButts: "Cigarette Butts",
  fishingLineRope: "Fishing Line / Polypropylene Rope",
  plasticCups: "Plastic Cups",
  plasticStraws: "Plastic Straws",
  filmedPlastic: "Filmed Plastic",
  miscPlastic: "Misc. Plastic",
  plasticBottlesCaps: "Plastic Bottles / Plastic Caps",
  styrofoam: "Styrofoam",
  foodOrganic: "Food / Organic",
  urethaneFoam: "Urethane Foam",
  metal: "Metal",
  glass: "Glass",
  cottonCloth: "Cotton / Cloth",
  aluminumCans: "Aluminum Cans",
  hygieneItems: "Hygiene Items",
  tileBrick: "Tile / Brick",
  woodPaper: "Wood / Paper",

  // past debris
  styrothane: "Styrofoam / Urethane",
  otherPlastic: "Other: Plastics",
  otherFood: "Other: Food / Organics",
  otherCotton: "Other: Cotton / Cloth",
  otherWood: "Other: Wood / Paper"
}

// maps name of category to id
const debrisInfoID = {
  "Cigarette Butts": "cigaretteButts",
  "Fishing Line / Polypropylene Rope": "fishingLineRope",
  "Plastic Cups": "plasticCups",
  "Plastic Straws": "plasticStraws",
  "Filmed Plastic": "filmedPlastic",
  "Misc. Plastic": "miscPlastic",
  "Plastic Bottles / Plastic Caps": "plasticBottlesCaps",
  "Styrofoam": "styrofoam",
  "Food / Organic": "foodOrganic",
  "Urethane Foam": "urethaneFoam",
  "Metal": "metal",
  "Glass": "glass",
  "Cotton / Cloth": "cottonCloth",
  "Aluminum Cans": "aluminumCans",
  "Hygiene Items": "hygieneItems",
  "Tile / Brick": "tileBrick",
  "Wood / Paper": "woodPaper"
}

// maps name of category to id for categories that ever existed
const allDebrisInfoID = {
  // current debris
  "Cigarette Butts": "cigaretteButts",
  "Fishing Line / Polypropylene Rope": "fishingLineRope",
  "Plastic Cups": "plasticCups",
  "Plastic Straws": "plasticStraws",
  "Filmed Plastic": "filmedPlastic",
  "Misc. Plastic": "miscPlastic",
  "Plastic Bottles / Plastic Caps": "plasticBottlesCaps",
  "Styrofoam": "styrofoam",
  "Food / Organic": "foodOrganic",
  "Urethane Foam": "urethaneFoam",
  "Metal": "metal",
  "Glass": "glass",
  "Cotton / Cloth": "cottonCloth",
  "Aluminum Cans": "aluminumCans",
  "Hygiene Items": "hygieneItems",
  "Tile / Brick": "tileBrick",
  "Wood / Paper": "woodPaper",

  // past debris
  "Styrofoam / Urethane": "styrothane",
  "Other: Plastics": "otherPlastic",
  "Other: Food / Organics": "otherFood",
  "Other: Cotton / Cloth": "otherCotton",
  "Other: Wood / Paper": "otherWood"
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