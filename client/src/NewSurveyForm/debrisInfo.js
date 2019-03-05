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
  misc               : "Misc. (general)"                  ,
}

function getDebrisNameById(id){
    return DebrisInfo[id];
}

export { DebrisInfo, getDebrisNameById }
