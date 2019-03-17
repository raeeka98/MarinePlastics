import geolib from 'geolib';
import axios from 'axios';

// can export as many functions as you want from one file
// can use locationSort anywhere if put: import { locationSort } from '/path/to/_helpers/SortHelper'

// export function locationSort(data) {
//   console.log("locationSort called");
//   let sorted = [];
//   for (let i = 0; i < data.length; i++) {
//     // if data[i] matches anything in sorted, returns the index of the match in sorted
//     console.log(data[i])
//     const findIndex = sorted.findIndex((a) => {
//       let distance;
//       // if the lat and lon of elements in sorted and data[i] are present
//       if (a.lat && a.lon && data[i].lat && data[i].lon) {
//         // get the distance between the 2 points
//         distance = geolib.getDistance(
//           {latitude: a.lat, longitude: a.lon},
//           {latitude: data[i].lat, longitude: data[i].lon}
//         );
//       } 
//       // if there is no lat, lon data : if their names are the same assume the distance is 0
//       else if (a.name === data[i].beach) distance = 0;
//       // otherwise assume the distance is more than 1 mile (that it is not a match)
//       else distance = 1501;
//       // if distance is less than 1500 meters (approx 1 mile), probably same beach
//       return distance < 1500;
//     });
    
//     // if there is a match for data[i] in sorted (the index is not -1)
//     if (findIndex > -1){
//       // push data[i] to the entries of the match object
//       sorted[findIndex].entries.push(data[i]); 
//       /* There may need to be a change here if the long & lats will remain different for each beach*/
//     } else {
//       // if no match, push a new object to sorted
//       sorted.push(
//         {
//           name: data[i].beach,
//           lat: data[i].lat,
//           lon: data[i].lon,
//           entries: [data[i]]
//         }
//       );
//     }
//   }
//   console.log(sorted)
//   return sorted;
// }

// export function dateFind(locations, searchTerm) {
//   console.log("dateFind called");
//   let res = [];
//   return res;
// }

// export function locationFind(locations, searchTerm){
//   if (searchTerm === '') {
//     return locations;
//   } else {
//     const normalizedST = searchTerm.replace(/\s/g, '').toLowerCase();
//     let res = [];
//       for (let i = 0; i < locations.length; i++) {
//         if (locations[i].name.toLowerCase().includes(normalizedST)) {
//           res.push(locations[i]);
//         }
//       }
//     return res;
//   }
// }

// Accepts array of objects containing beach names and IDs
// Returns array similar to input but sorted by last modified date
export function lastModFilter(beaches) {
  
  beaches.sort(function (a, b) {

    a = new Date(a.lastMod).getTime();
    b = new Date(b.lastMod).getTime();
    console.log(a);
    return a < b ? 1 : a > b ? -1 : 0;
  });
  console.log(beaches);

  return beaches;
}

export function beachNameFilter(beaches) {
  beaches.sort(function (a, b) {
    if (a.n < b.n) {
      return -1;
    } else if (a.n > b.n) {
      return 1;
    } else {
      return 0;
    }
  });
  return beaches;
}

// export function debrisFind(locations, searchTerm){
//   console.log("debrisFind called");
//   if (searchTerm === ''){ return locations; } 
//   else {
//     const normalizedST = searchTerm.replace(/\s/g, '').toLowerCase();
//     let res = [];
//     for (let i = 0; i < locations.length; i++) {
//       for (let j = 0; j < locations[i].SRSData.length; j++){
//         let isMatch = debrisFindHELP(normalizedST, locations[i].SRSData[j].name, locations[i], res);
//         if (isMatch) {
//           res.push(locations[i]);
//           break;
//         }
//       }
//       for (let j = 0; j < locations[i].ASData.length; j++){
//         let isMatch = debrisFindHELP(normalizedST, locations[i].ASData[j].name, locations[i], res);
//         if (isMatch) {
//           res.push(locations[i]);
//           break;
//         }
//       }
//     }
//     return locationSort(res);
//   }
// }


// export function userFind(locations, searchTerm){
//   if (searchTerm === ''){ return locations; } 
//   else {
//     const normalizedST = searchTerm.replace(/\s/g, '').toLowerCase();
//     let res = [];
//     for (let i = 0; i < locations.length; i++) {
//       let isMatch = compare(normalizedST, locations[i].user);
//       if (isMatch) res.push(locations[i]);
//     }
//     return locationSort(res); 
//   }
// }

// export function orgFind(locations, searchTerm){
//   if (searchTerm === ''){ return locations; } 
//   else {
//     const normalizedST = searchTerm.replace(/\s/g, '').toLowerCase();
//     let res = [];
//     for (let i = 0; i < locations.length; i++) {
//       if (locations[i].org) {
//         let isMatch = compare(normalizedST, locations[i].org);
//         if (isMatch) res.push(locations[i]);
//       }
//     }
//     return locationSort(res); 
//   }
// }

// function debrisFindHELP(searchTerm, currName, entry, res) {
//   let isMatch = false;
//   const normalizedDN = currName.replace(/\s/g, '').replace(/_/, '').toLowerCase();
//   if (normalizedDN.includes(searchTerm) && !res.includes(entry)) isMatch = true;
//   return isMatch;
// }

// function compare(searchTerm, currName){
//   let isMatch = false;
//   const normalizedDN = currName.replace(/\s/g, '').replace(/_/, '').toLowerCase();
//   if (normalizedDN.includes(searchTerm)) isMatch = true;
//   return isMatch;
// }
