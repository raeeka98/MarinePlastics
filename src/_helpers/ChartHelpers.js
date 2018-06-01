import react from "react";

export function sumDebrisTypes (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].SRSdata; j++) {
          let foundIndex = sumHelper(SRSdata[i].type, res);
          if (foundIndex > -1) {
            res[foundIndex].value += (SRSdata[i].weathered + SRSdata[i].fresh);
          }
          else {
              res.push({
                  key:SRSdata.type, 
                  value:SRSdata.weathered + SRSdata.fresh
              })
          }
      }
    }
}

function sumHelper (value, arr) {
    var found = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === value) {
          found = i;
      }
    }
    return found;
}