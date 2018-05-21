import geolib from 'geolib';

export function locationSort(data) {
  let sorted = [];
  for (let i = 0; i < data.length; i++) {
    const findIndex = sorted.findIndex((a) => {
      let distance;
      if (a.lat && a.lon && data[i].lat && data[i].lon) {
        distance = geolib.getDistance(
          {latitude: a.lat, longitude: a.lon},
          {latitude: data[i].lat, longitude: data[i].lon}
        );
      } 
      else if (a.name === data[i].name) distance = 0;
      else distance = 1501;
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

export function locationFilter(data){
  if(document.getElementById("searchBar") === null){
    console.log("null");
  } else {
    let input = document.getElementById("searchBar").value;
    console.log(input);
    /*for (let i = 0; i < data.locations.length; i++){
      let name = data.locations[i].name;
      console.log(name);
      let a = name.getElementsByTagName('a')[0];
      if(a.innerHTML.toUpperCase().indexOf(input.toUpperCase()) > -1){
        data.locations[i].style.display="";
      } else {
        data.locations[i].style.display="none";
      }
    }*/
  }
}
