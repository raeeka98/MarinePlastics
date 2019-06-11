const DebrisInfo = {
    cigaretteButts: "Cigarette Butts",
    fishingLineRope: "Fishing Line / Polypropylene Rope",
    plasticStraws: "Plastic Straws",
    filmedPlastic: "Filmed Plastic",
    plasticBottlesCaps: "Plastic Bottles / Plastic Caps",
    styrofoamUrethane: "Styrofoam / Urethane",
    otherPlastics: "Other : Plastics",
    otherFoodOrganics: "Other : Food / Organics",
    otherCottonCloth: "Other : Cotton / Cloth",
    otherWoodPaper: "Other : Wood / Paper"
}

const DebrisInfoID = {
    "Cigarette Butts": "cigaretteButts",
    "Fishing Line / Polypropylene Rope": "fishingLineRope",
    "Plastic Straws": "plasticStraws",
    "Filmed Plastic": "filmedPlastic",
    "Plastic Bottles / Plastic Caps": "plasticBottlesCaps",
    "Styrofoam / Urethane": "styrofoamUrethane",
    "Other : Plastics": "otherPlastics",
    "Other : Food / Organics": "otherFoodOrganics",
    "Other : Cotton / Cloth": "otherCottonCloth",
    "Other : Wood / Paper": "otherWoodPaper"
}

const AllDebris = {
    cigaretteButts: "Cigarette Butts",
    fishingLineRope: "Fishing Line / Polypropylene Rope",
    plasticCups: "Plastic Cups",
    plasticStraws: "Plastic Straws",
    filmedPlastic: "Filmed Plastic",
    miscPlastic: "Misc. Plastic",
    plasticBottlesCaps: "Plastic Bottles / Plastic Caps",
    styrofoam: "Styrofoam",
    woodPaper: "Wood / Paper",
    foodOrganic: "Food / Organic",
    urethaneFoam: "Urethane Foam",
    metal: "Metal",
    glass: "Glass",
    cottonCloth: "Cotton / Cloth",
    aluminumCans: "Aluminum Cans",
    hygieneItems: "Hygiene Items",
    tileBrick: "Tile / Brick",
    styrothane: "Styrofoam / Urethane",
    otherPlastic: "Other : Plastics",
    otherFood: "Other : Food / Organics",
    otherCotton: "Other : Cotton / Cloth",
    otherWood: "Other : Wood / Paper",
    misc: "Misc. (general)"
}

const AllDebrisID = {
    "Cigarette Butts": "cigaretteButts",
    "Fishing Line / Polypropylene Rope": "fishingLineRope",
    "Plastic Cups": "plasticCups",
    "Plastic Straws": "plasticStraws",
    "Filmed Plastic": "filmedPlastic",
    "Misc. Plastic": "miscPlastic",
    "Plastic Bottles / Plastic Caps": "plasticBottlesCaps",
    "Styrofoam": "styrofoam",
    "Wood / Paper": "woodPaper",
    "Food / Organic": "foodOrganic",
    "Urethane Foam": "urethaneFoam",
    "Metal": "metal",
    "Glass": "glass",
    "Cotton / Cloth": "cottonCloth",
    "Aluminum Cans": "aluminumCans",
    "Hygiene Items": "hygieneItems",
    "Tile / Brick": "tileBrick",
    "Styrofoam / Urethane": "styrothane",
    "Other : Plastics": "otherPlastics",
    "Other : Food / Organics": "otherFoodOrganics",
    "Other : Cotton / Cloth": "otherCottonCloth",
    "Other : Wood / Paper": "otherWoodPaper",
}

const debrisNames = Object.values(DebrisInfo);
const allDebrisNames = Object.values(AllDebris);

function getDebrisNameById (id) {
    return DebrisInfo[id];
}

function getDebrisID (debrisName) {
    return DebrisInfoID[debrisName];
}

function getDebrisMap () {
    return DebrisInfo;
}

function getAllDebris () {
    return AllDebris;
}

function getAllDebrisID () {
    return AllDebrisID;
}

export {
    getDebrisNameById,
    getDebrisMap,
    debrisNames,
    getDebrisID,
    getAllDebris,
    getAllDebrisID,
    allDebrisNames
}