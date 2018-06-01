export function sumDebrisTypes (data) {
  let res = [];
  for (let i = 0; i < data.entries.length; i++) {
    for (let j = 0; j < data.entries[i].SRSData.length; j++) {
      let currEntrySRS = data.entries[i].SRSData;
      let foundIndex = sumHelper(currEntrySRS[j].name, res);
      if (foundIndex > -1) {
        res[foundIndex].value += (currEntrySRS[j].weathered + currEntrySRS[j].fresh);
      }
      else {
        let name = currEntrySRS[j].name;
        let total = currEntrySRS[j].fresh + currEntrySRS[j].weathered;
        res.push({
          key: name,
          value: total,
        });
      }
    }
  }
  return res;
}

function sumHelper (value, arr) {
  let found = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].key === value) found = i;
  }
  return found;
}
