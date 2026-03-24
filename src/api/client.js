/**
 * @file client.js
 * @description Base API client for SportMonks Cricket REST API.
 * Injects api_token into every request automatically.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v2.0';
const API_KEY = import.meta.env.VITE_API_KEY || '';

/**
 * Builds a full API URL with the api_token appended.
 *
 * @param {string} path - The API endpoint path (e.g. '/players').
 * @param {Record<string, string>} [params={}] - Additional query parameters.
 * @returns {string} The fully constructed URL string.
 */
function buildUrl(path, params = {}) {
  // If API_BASE_URL is a relative path (like /api/v2.0 for proxy), we must provide a base url
  const base = API_BASE_URL.startsWith('http') ? undefined : window.location.origin;
  const url = new URL(`${API_BASE_URL}${path}`, base);
  url.searchParams.set('api_token', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (null !== value && undefined !== value && '' !== value) {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

/**
 * Makes a GET request to the SportMonks API.
 *
 * @param {string} path - The API endpoint path.
 * @param {Record<string, string>} [params={}] - Additional query parameters.
 * @returns {Promise<any>} Parsed JSON response data.
 * @throws {Error} When the network response is not OK.
 */
export async function apiGet(path, params = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}
