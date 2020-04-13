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

// list of categories of trash
const debrisNames = Object.values(debrisInfo);

/**
 * Gets name of category of trash by id
 * @param {any} id
 * @return name
 */
function getDebrisNameById(id) {
    return debrisInfo[id];
}

/**
 * Gets id by name of category of trash
 * @param {any} debrisName
 * @return id
 */
function getDebrisID (debrisName) {
    return debrisInfoID[debrisName];
}

/**
 * Gets mapping of id to name of category of trash
 * @return const debrisInfo
 */
function getDebrisMap () {
    return debrisInfo;
}

export {
    getDebrisNameById,
    getDebrisMap,
    debrisNames,
    getDebrisID
}