/**
 * @file buildCareerMap.js
 * @description Background task utility to fetch all players with careers and build a type-to-id map.
 */

import { fetchAllPlayersWithCareer } from "../api/players.js";
import { getCachedCareerMap, setCachedCareerMap } from "../db/index.js";

/**
 * Triggers the background builder. If cache exists, it does nothing.
 * If cache is missing, it fetches the massive players endpoint,
 * parses out career types, and stores a map like: { "ODI": [1,2,3], "": [4,5] }
 *
 * @returns {Promise<Object>} The parsed map
 */
export async function triggerCareerMapBuild() {
  const existing = await getCachedCareerMap();
  if (existing) {
    return existing;
  }

  const players = await fetchAllPlayersWithCareer();

  // Initialize map
  const map = {};

  players.forEach((p) => {
    if (!p.career || 0 === p.career.length) {
      // Uncategorised
      if (!map["uncategorised"]) map["uncategorised"] = [];
      map["uncategorised"].push(p.id);
    } else {
      // Collect all unique career types for this specific player
      const typesSet = new Set(p.career.map((c) => c.type));
      typesSet.forEach((type) => {
        if (type) {
          if (!map[type]) map[type] = [];
          map[type].push(p.id);
        }
      });
    }
  });

  // Save to indexedDB
  await setCachedCareerMap(map);

  return map;
}
