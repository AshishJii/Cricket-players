/**
 * @file index.js
 * @description IndexedDB singleton using the `idb` library.
 * Stores players, countries, and player details with cache timestamps.
 *
 * DB name: cricket_app
 * Version: 1
 *
 * Stores:
 *  - players       – keyPath: 'key' (stores {key:'all', data:[], cachedAt:timestamp})
 *  - countries     – keyPath: 'key'
 *  - player_details – keyPath: 'id'  (stores individual player objects with career)
 */

import { openDB } from 'idb';

/** Cache time-to-live in milliseconds (24 hours). */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

/** @type {Promise<import('idb').IDBPDatabase>|null} */
let dbPromise = null;

/**
 * Returns the singleton IndexedDB database instance.
 * Opens the database on first call, reuses it on subsequent calls.
 *
 * @returns {Promise<import('idb').IDBPDatabase>} The IDB database instance.
 */
function getDb() {
  if (null === dbPromise) {
    dbPromise = openDB('cricket_app', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('players')) {
          db.createObjectStore('players', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('countries')) {
          db.createObjectStore('countries', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('player_details')) {
          db.createObjectStore('player_details', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

/**
 * Checks whether a cached entry is still valid (within TTL).
 *
 * @param {number|undefined} cachedAt - Unix timestamp in ms when data was cached.
 * @returns {boolean} True if cache is still fresh.
 */
function isCacheValid(cachedAt) {
  if (!cachedAt) return false;
  return Date.now() - cachedAt < CACHE_TTL_MS;
}

/**
 * Retrieves all players from cache.
 *
 * @returns {Promise<Array<Object>|null>} Cached player array, or null if missing/stale.
 */
export async function getCachedPlayers() {
  const db = await getDb();
  const entry = await db.get('players', 'all');
  if (entry && isCacheValid(entry.cachedAt)) {
    return entry.data;
  }
  return null;
}

/**
 * Stores the full players list in IndexedDB.
 *
 * @param {Array<Object>} players - The full list of player objects.
 * @returns {Promise<void>}
 */
export async function setCachedPlayers(players) {
  const db = await getDb();
  await db.put('players', { key: 'all', data: players, cachedAt: Date.now() });
}

/**
 * Retrieves all countries from cache.
 *
 * @returns {Promise<Array<Object>|null>} Cached country array, or null if missing/stale.
 */
export async function getCachedCountries() {
  const db = await getDb();
  const entry = await db.get('countries', 'all');
  if (entry && isCacheValid(entry.cachedAt)) {
    return entry.data;
  }
  return null;
}

/**
 * Stores the full countries list in IndexedDB.
 *
 * @param {Array<Object>} countries - The list of country objects.
 * @returns {Promise<void>}
 */
export async function setCachedCountries(countries) {
  const db = await getDb();
  await db.put('countries', { key: 'all', data: countries, cachedAt: Date.now() });
}

/**
 * Retrieves a cached individual player detail record.
 *
 * @param {number|string} playerId - The player's unique ID.
 * @returns {Promise<Object|null>} Cached player with career, or null if missing/stale.
 */
export async function getCachedPlayerDetail(playerId) {
  const db = await getDb();
  const entry = await db.get('player_details', Number(playerId));
  if (entry && isCacheValid(entry.cachedAt)) {
    return entry;
  }
  return null;
}

/**
 * Stores a player detail (with career) in IndexedDB.
 *
 * @param {Object} player - The player object including career stats.
 * @returns {Promise<void>}
 */
export async function setCachedPlayerDetail(player) {
  const db = await getDb();
  await db.put('player_details', { ...player, cachedAt: Date.now() });
}
