const DebrisInfo = {
  cigaretteButts     : "Cigarette Butts"                  ,
  fishingLineRope    : "Fishing Line / Polypropylene Rope",
  plasticCups        : "Plastic Cups"                     ,
  plasticStraws      : "Plastic Straws"                   ,
  filmedPlastic      : "Filmed Plastic"                   ,
  miscPlastic        : "Misc. Plastic"                    ,
  plasticBottlesCaps : "Plastic Bottles / Plastic Caps"   ,
  styrofoam          : "Styrofoam"                        ,
  woodPaper          : "Wood / Paper"                     ,
  foodOrganic        : "Food / Organic"                   ,
  urethaneFoam       : "Urethane Foam"                    ,
  metal              : "Metal"                            ,
  glass              : "Glass"                            ,
  cottonCloth        : "Cotton / Cloth"                   ,
  aluminumCans       : "Aluminum Cans"                    ,
  hygieneItems       : "Hygiene Items"                    ,
  tileBrick          : "Tile / Brick"                     ,
  misc               : "Misc. (general)"
}

const DebrisInfoID = {
  "Cigarette Butts" : "cigaretteButts"                    ,
  "Fishing Line / Polypropylene Rope" : "fishingLineRope" ,
   "Plastic Cups"    : "plasticCups"                      ,
   "Plastic Straws"  : "plasticStraws"                    ,
   "Filmed Plastic"  : "filmedPlastic"                    ,
   "Misc. Plastic"   : "miscPlastic"                      ,
   "Plastic Bottles / Plastic Caps":"plasticBottlesCaps"  ,
   "Styrofoam"       :"styrofoam"                         ,
   "Wood / Paper"    :"woodPaper"                         ,
  "Food / Organic"   :"foodOrganic"                       ,
  "Urethane Foam"    :"urethaneFoam"                      ,
  "Metal"            :"metal"                             ,
  "Glass"            :"glass"                             ,
  "Cotton / Cloth"   :"cottonCloth"                       ,
  "Aluminum Cans"    :"aluminumCans"                      ,
  "Hygiene Items"    :"hygieneItems"                      ,
  "Tile / Brick"     :"tileBrick"                         ,
  "Misc. (general)"  :"misc"              
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
