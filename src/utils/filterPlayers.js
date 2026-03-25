/**
 * @file filterPlayers.js
 * @description Pure utility functions for filtering, sorting, and paginating players client-side.
 */

/** Number of players displayed per page. */
export const PAGE_SIZE = 12;

/**
 * Filters a players array based on search query, country ID, and position name.
 *
 * @param {Array<Object>} players - Full list of player objects.
 * @param {Object} filters - Filter criteria.
 * @param {string} filters.search - Substring to match against player last name (case-insensitive).
 * @param {string|number} filters.country - country_id to filter by, or '' for no filter.
 * @param {string} filters.position - Position name to filter by, or '' for no filter.
 * @param {string} filters.career - Career type to filter by, or '' for no filter.
 * @param {Object} [careerMap] - Optional map of `careerType -> array of playerIds`.
 * @returns {Array<Object>} Filtered array of players.
 */
export function filterPlayers(players, { search, country, position, career }, careerMap = null) {
  return players.filter((player) => {
    if (search) {
      const query = search.toLowerCase();
      const lastName = (player.lastname || "").toLowerCase();
      if (!lastName.includes(query)) return false;
    }

    if (country) {
      if (String(player.country_id) !== String(country)) return false;
    }

    if (position) {
      const positionName = player.position?.name || "";
      if (positionName !== position) return false;
    }

    if (career) {
      // If the map isn't loaded yet, return false to show zero/loading until mapped
      if (!careerMap) return false;
      const allowedIds = careerMap[career] || [];
      if (!allowedIds.includes(player.id)) return false;
    }

    return true;
  });
}

/**
 * Sorts an array of players based on a sort field and direction.
 *
 * @param {Array<Object>} players - Filtered list of players.
 * @param {string} sortField - Field to sort by: 'firstname' | 'id' | 'updated_at'.
 * @param {'asc'|'desc'} sortOrder - Sort direction.
 * @returns {Array<Object>} Sorted array of players (new array, original unmodified).
 */
export function sortPlayers(players, sortField, sortOrder) {
  const sorted = [...players].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if ("string" === typeof aVal) {
      aVal = aVal.toLowerCase();
      bVal = (bVal || "").toLowerCase();
    }

    if (aVal < bVal) return "asc" === sortOrder ? -1 : 1;
    if (aVal > bVal) return "asc" === sortOrder ? 1 : -1;
    return 0;
  });
  return sorted;
}

/**
 * Returns a single page of players.
 *
 * @param {Array<Object>} players - Sorted and filtered player list.
 * @param {number} page - 1-based page number.
 * @returns {Array<Object>} Players for the requested page.
 */
export function paginatePlayers(players, page) {
  const start = (page - 1) * PAGE_SIZE;
  return players.slice(start, start + PAGE_SIZE);
}

/**
 * Calculates the total number of pages.
 *
 * @param {number} totalCount - Total number of filtered players.
 * @returns {number} Total page count.
 */
export function getTotalPages(totalCount) {
  return Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
}

/**
 * Derives unique position options from a list of players.
 *
 * @param {Array<Object>} players - Full player list.
 * @returns {Array<string>} Sorted array of unique position names.
 */
export function derivePositionOptions(players) {
  const positions = new Set();
  players.forEach((player) => {
    if (player.position?.name) {
      positions.add(player.position.name);
    }
  });
  return Array.from(positions).sort();
}
