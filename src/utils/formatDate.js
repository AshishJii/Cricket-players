/**
 * @file formatDate.js
 * @description Date formatting utilities.
 */

/**
 * Formats a date string (e.g. '1991-11-23') into a human-readable format.
 *
 * @param {string|null|undefined} dateString - ISO date string to format.
 * @param {string} [locale='en-GB'] - BCP 47 locale tag.
 * @returns {string} Formatted date string, or '—' if input is falsy.
 */
export function formatDate(dateString, locale = 'en-GB') {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculates age from a date of birth string.
 *
 * @param {string|null|undefined} dateOfBirth - ISO date string of birth date.
 * @returns {number|null} Age in years, or null if input is invalid.
 */
export function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const birth = new Date(dateOfBirth);
  if (isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (0 > monthDiff || (0 === monthDiff && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
