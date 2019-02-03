export function sumDebrisTypes(data) {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    let currEntrySRS = data[i].SRSData;
    for (let j = 0; j < currEntrySRS.length; j++) {
      let foundIndex = nSumHelper(currEntrySRS[j].name, res, 'key');
      if (foundIndex > -1) {
        res[foundIndex][1] += (currEntrySRS[j].weathered + currEntrySRS[j].fresh);
      }
      else {
        let name = currEntrySRS[j].name;
        let total = currEntrySRS[j].fresh + currEntrySRS[j].weathered;
        res.push([
           name,
           total,
        ]);
      }
    }
  }
  return res;
}

export function sumTotals(data, isSRS) {
  let res = [];
  let attr = isSRS ? 'SRSTotal' : 'ASTotal';
  for (let i = 0; i < data.length; i++) {
    let date = data[i].date;
    let total = data[i][attr] || 0; 
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

function nSumHelper (value, arr, key) {
  let found = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === value) found = i;
  }
  return found;
}