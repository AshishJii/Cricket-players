/**
 * @file useFilters.js
 * @description Custom hook that syncs filter state (search, country, position, sort, order, page)
 * with URL search parameters for shareable links.
 */

import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/** @typedef {'firstname'|'id'|'updated_at'} SortField */
/** @typedef {'asc'|'desc'} SortOrder */

/**
 * @typedef {Object} Filters
 * @property {string} search - Last name search query.
 * @property {string} country - Country ID to filter by.
 * @property {string} position - Position name to filter by.
 * @property {SortField} sort - Field to sort by.
 * @property {SortOrder} order - Sort direction.
 * @property {number} page - Current page number (1-based).
 */

/**
 * Returns current filter values from URL params and a setter function.
 *
 * @returns {{ filters: Filters, setFilter: Function, resetFilters: Function }}
 */
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  /** @type {Filters} */
  const filters = {
    search: searchParams.get('search') || '',
    country: searchParams.get('country') || '',
    position: searchParams.get('position') || '',
    sort: searchParams.get('sort') || 'firstname',
    order: searchParams.get('order') || 'asc',
    page: parseInt(searchParams.get('page') || '1', 10),
  };

  /**
   * Updates one or more filter values in the URL. Resets page to 1 on filter changes
   * unless page is being explicitly set.
   *
   * @param {Partial<Filters>} updates - Key/value pairs to update.
   */
  const setFilter = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (null === value || '' === value) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        });
        // Reset to page 1 when anything other than page itself changes
        if (!('page' in updates)) {
          next.set('page', '1');
        }
        return next;
      });
    },
    [setSearchParams]
  );

  /**
   * Resets all filters to their default values, clearing the URL.
   */
  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return { filters, setFilter, resetFilters };
}
