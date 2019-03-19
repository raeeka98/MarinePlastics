// Accepts array of objects containing beach names and IDs
// Returns array similar to input but sorted by last modified date
export function lastModFilter(beaches) {
  
  beaches.sort(function (a, b) {

    a = new Date(a.lastMod).getTime();
    b = new Date(b.lastMod).getTime();
    return a < b ? 1 : a > b ? -1 : 0;
  });

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
