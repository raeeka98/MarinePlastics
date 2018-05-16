import geolib from 'geolib';

export function locationSort(data) {
  let sorted = [];
  for (let i = 0; i < data.length; i++) {
    const findIndex = sorted.findIndex((a) => {
      const distance = geolib.getDistance(
        {latitude: a.lat, longitude: a.lon},
        {latitude: data[i].lat, longitude: data[i].lon}
      );
      // if distance is less than 1500 meters (approx 1 mile), probably same beach
      return distance < 1500;
    });
    
    if (findIndex > -1){
      sorted[findIndex].entries.push(data[i]);
    }else {
      sorted.push(
        {
          name: data[i].beach,
          lat: data[i].lat,
          lon: data[i].lon,
          entries: [data[i]]
        }
      );
    }
  }
  return sorted;
}
