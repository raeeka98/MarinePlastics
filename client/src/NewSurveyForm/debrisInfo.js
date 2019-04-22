const DebrisInfo = {
  cigaretteButts     : "Cigarette Butts"                  ,
  fishingLineRope    : "Fishing Line / Polypropylene Rope",
  plasticStraws      : "Plastic Straws"                   ,
  filmedPlastic      : "Filmed Plastic"                   ,
  plasticBottlesCaps : "Plastic Bottles / Plastic Caps"   ,
  styrofoamUrethane  : "Styrofoam / Urethane"             ,
  otherPlastics      : "Other : Plastics"                 ,
  otherFoodOrganics  : "Other : Food / Organics"          ,
  otherCottonCloth   : "Other : Cotton / Cloth"           ,
  otherWoodPaper     : "Other : Wood / Paper"
}

const DebrisInfoID = {
  "Cigarette Butts"                   : "cigaretteButts"      ,
  "Fishing Line / Polypropylene Rope" : "fishingLineRope"     ,
  "Plastic Straws"                    : "plasticStraws"       ,
  "Filmed Plastic"                    : "filmedPlastic"       ,
  "Plastic Bottles / Plastic Caps"    : "plasticBottlesCaps"  ,
  "Styrofoam / Urethane"              : "styrofoamUrethane"   ,
  "Other : Plastics"                  : "otherPlastics"       ,
  "Other : Food / Organics"           : "otherFoodOrganics"   ,
  "Other : Cotton / Cloth"            : "otherCottonCloth"    ,
  "Other : Wood / Paper"              : "otherWoodPaper"
}

const debrisNames = Object.values(DebrisInfo);

function getDebrisNameById(id){
    return DebrisInfo[id];
}

function getDebrisID(debrisName){
  return DebrisInfoID[debrisName];
}

function getDebrisMap(){
    return DebrisInfo;
}

export { getDebrisNameById, getDebrisMap , debrisNames ,getDebrisID}
