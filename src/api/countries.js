/**
 * @file countries.js
 * @description API functions for fetching country data from SportMonks.
 */

import { apiGet } from './client.js';

/**
 * Fetches all countries from the SportMonks API.
 *
 * @returns {Promise<Array<Object>>} Array of country objects.
 */
export async function fetchAllCountries() {
  return apiGet('/countries');
}
