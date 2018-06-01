export function sumDebrisTypes(data) {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].SRSData.length; j++) {
      let currEntrySRS = data[i].SRSData;
      let foundIndex = sumHelper(currEntrySRS[j].name, res, 'key');
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

export function sumTotals(data, isSRS) {
  let res = [];
  let attr = isSRS ? 'SRSTotal' : 'AStotal';
  for (let i = 0; i < data.length; i++) {
    let date = data[i].date;
    let total = data[i][attr];
    let foundIndex = sumHelper(date, res, 'x');
    if (foundIndex > -1) {
      res[foundIndex].y += total;
    } else {
      res.push({
        x: date,
        y: total
      });
    }
  }
  return res;
}

export function getTotalPounds(data) {
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].weight) res += data[i].weight;
  }
  return res;
}

function sumHelper (value, arr, key) {
  let found = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) found = i;
  }
  return found;
}
