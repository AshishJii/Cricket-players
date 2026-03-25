/**
 * @file useCountries.js
 * @description Hook to load all countries from IndexedDB cache, falling back to the API.
 */

import { useState, useEffect } from "react";
import { fetchAllCountries } from "../api/countries.js";
import { getCachedCountries, setCachedCountries } from "../db/index.js";

/**
 * @typedef {Object} CountriesResult
 * @property {Array<Object>} countries - Full list of country objects.
 * @property {Object} countryMap - Map of country_id => country object for fast lookup.
 * @property {boolean} loading - True while data is being fetched.
 * @property {string|null} error - Error message, or null.
 */

/**
 * Loads all countries. Checks IndexedDB first, then fetches from API.
 *
 * @returns {CountriesResult}
 */
export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const cached = await getCachedCountries();
        if (cached) {
          if (!cancelled) {
            setCountries(cached);
            setLoading(false);
          }
          return;
        }

        const data = await fetchAllCountries();
        await setCachedCountries(data);

        if (!cancelled) {
          setCountries(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load countries.");
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

  /** @type {Object} */
  const countryMap = countries.reduce((map, country) => {
    map[country.id] = country;
    return map;
  }, {});

  return { countries, countryMap, loading, error };
}
