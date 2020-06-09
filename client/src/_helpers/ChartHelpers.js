/**
 * ChartHelpers.js
 * Functions used in ../Location/Charts.jsx.
 */

/**
 * Adds fresh and weathered for each type of debris and puts in object res.
 * Only does this for SRS and is not used.
 * @param {any} surveys
 * @return res
 */
export function sumDebrisTypes(surveys) {
  let res = {};
  for (const survey in surveys) {
    const srsDebris = surveys[survey].SRSDebris;
    for (const trash in srsDebris) {
      const trashData = srsDebris[trash];
      if (!res.hasOwnProperty(trash))
        res[trash] = trashData.weathered + trashData.fresh;
      else
        res[trash] += trashData.weathered + trashData.fresh;
    }
  }
  return res;
}

/**
 * Sums the total debris for each survey and creates object res, which maps
 * survey date with its total debris. The total debris calculated is for SRS if
 * isSRS is true, and AS if isSRS is false.
 * @params {any} surveys, {any} isSRS
 * @return res
 */
export function sumTotals(surveys, type) {
  let res = {};
  let date = new Date(0);
  let attr = '';
  switch(type) {
    case 'SRS':
      attr = 'SRSDebris';
      break;
    case 'AS':
      attr = 'ASDebris';
      break;
    case 'MDS':
      attr = 'MicroDebris';
      break;
    default: attr = '';
  }
  for (const surveyDate in surveys) {
    const data = surveys[surveyDate][attr];
    date = new Date(surveys[surveyDate].survDate);
    let localDate = date.toLocaleDateString();
    for (const trash in data) {
      const trashData = data[trash];
      if (!res.hasOwnProperty(localDate))
        res[localDate] = trashData.weathered + trashData.fresh;
      else
        res[localDate] += trashData.weathered + trashData.fresh;
    }
  }
  return res;
}

/**
 * Calculates the total weight in pounds in data and puts it in res. This
 * function is unused.
 * @param {any} data
 * @return res
 */
export function getTotalPounds(data) {
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].weight) res += data[i].weight;
  }
  return res;
}