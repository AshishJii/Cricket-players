/**
 * @file players.js
 * @description API functions for fetching cricket player data from SportMonks.
 */

import { apiGet } from './client.js';

/**
 * Fetches all players from the SportMonks API.
 * Returns the full list in one response (no pagination on this endpoint).
 *
 * @returns {Promise<Array<Object>>} Array of player objects.
 */
export async function fetchAllPlayers() {
  return apiGet('/players');
}

/**
 * Fetches a single player by ID, including their career stats.
 *
 * @param {number|string} playerId - The player's unique ID.
 * @returns {Promise<Object>} Player object with nested career array.
 */
export async function fetchPlayerById(playerId) {
  return apiGet(`/players/${playerId}`, { include: 'career' });
}
