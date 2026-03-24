/**
 * @file usePlayersData.js
 * @description Hook to load all players from IndexedDB cache, falling back to the API.
 * On first load, fetches ~10MB from SportMonks and persists in IndexedDB (24h TTL).
 */

import { useState, useEffect } from 'react';
import { fetchAllPlayers } from '../api/players.js';
import { getCachedPlayers, setCachedPlayers } from '../db/index.js';

/**
 * @typedef {Object} PlayersDataResult
 * @property {Array<Object>} players - Full list of players.
 * @property {boolean} loading - True while data is being fetched.
 * @property {string|null} error - Error message, or null if none.
 */

/**
 * Loads all cricket players. Checks IndexedDB first, then fetches from API
 * and persists the result for subsequent loads.
 *
 * @returns {PlayersDataResult}
 */
export function usePlayersData() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const cached = await getCachedPlayers();
        if (cached) {
          if (!cancelled) {
            setPlayers(cached);
            setLoading(false);
          }
          return;
        }

        const data = await fetchAllPlayers();
        await setCachedPlayers(data);

        if (!cancelled) {
          setPlayers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load players.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { players, loading, error };
}
