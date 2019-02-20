export function sumDebrisTypes (surveys) {
    let res = {};
    for (const survey in surveys) {
        const srsData = surveys[survey].SRSData;
        for (const trash in srsData) {
            const trashData = srsData[trash];
            if (!res.hasOwnProperty(trash))
                res[trash] = trashData.weathered + trashData.fresh;
            else
                res[trash] += trashData.weathered + trashData.fresh;
        }
    }
    return res;
}

export function sumTotals (surveys, isSRS) {
    let res = {};
    let date = new Date(0);
    let attr = isSRS ? 'SRSData' : 'ASData';
    for (const surveyDate in surveys) {
        const data = surveys[surveyDate][attr];
        date.setMilliseconds(surveyDate);
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

export function getTotalPounds (data) {
    let res = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].weight) res += data[i].weight;
    }
    return res;
}
