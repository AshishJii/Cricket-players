/**
 * @file usePlayerDetail.js
 * @description Hook to load a single player with career stats.
 * Checks IndexedDB first, then fetches from the API.
 */

import { useState, useEffect } from 'react';
import { fetchPlayerById } from '../api/players.js';
import { getCachedPlayerDetail, setCachedPlayerDetail } from '../db/index.js';

/**
 * @typedef {Object} PlayerDetailResult
 * @property {Object|null} player - Player object with career array, or null during load.
 * @property {boolean} loading - True while fetching.
 * @property {string|null} error - Error message, or null.
 */

/**
 * Loads a single player with career stats by ID.
 *
 * @param {string|number} playerId - The player's unique ID.
 * @returns {PlayerDetailResult}
 */
export function usePlayerDetail(playerId) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        setPlayer(null);

        const cached = await getCachedPlayerDetail(playerId);
        if (cached) {
          if (!cancelled) {
            setPlayer(cached);
            setLoading(false);
          }
          return;
        }

        const data = await fetchPlayerById(playerId);
        await setCachedPlayerDetail(data);

        if (!cancelled) {
          setPlayer(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load player details.');
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
  }, [playerId]);

  return { player, loading, error };
}
