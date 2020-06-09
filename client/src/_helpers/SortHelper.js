/**
 * SortHelper.js
 * Functions used in ../Home/Home.jsx.
 */

/**
 * Accepts array of objects containing beach names and IDs, and sorts them by
 * the date they were last modified, with the last modified beach listed first.
 * @param {any} beaches
 * @return sorted list of beaches
 */
export function lastModFilter(beaches) {
  beaches.sort(function (a, b) {
    a = new Date(a.lastMod).getTime();
    b = new Date(b.lastMod).getTime();
    return a < b ? 1 : a > b ? -1 : 0;
  });

  return beaches;
}

/**
 * Sorts beaches by name.
 * @param {any} beaches
 * @return sorted list of beaches
 */
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
