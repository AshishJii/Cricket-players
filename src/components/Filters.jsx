/**
 * @file Filters.jsx
 * @description Dropdown filters for Country and Position.
 */

import { CAREER_TYPES } from "../utils/constants.js";
import "../styles/components/Filters.css";

/**
 * @param {Object} props
 * @param {Array<Object>} props.countries - Array of country objects.
 * @param {Array<string>} props.positions - Array of unique position name strings.
 * @param {string} props.selectedCountry - Currently selected country ID.
 * @param {string} props.selectedPosition - Currently selected position name.
 * @param {string} props.selectedCareer - Currently selected career type.
 * @param {Function} props.onCountryChange - Called with new country ID.
 * @param {Function} props.onPositionChange - Called with new position name.
 * @param {Function} props.onCareerChange - Called with new career type.
 * @param {Function} props.onReset - Called when reset button is clicked.
 */
export function Filters({
  countries,
  positions,
  selectedCountry,
  selectedPosition,
  selectedCareer,
  onCountryChange,
  onPositionChange,
  onCareerChange,
  onReset,
}) {
  const hasActiveFilters =
    selectedCountry || selectedPosition || selectedCareer;

  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleCountryChange(e) {
    onCountryChange(e.target.value);
  }

  function handlePositionChange(e) {
    onPositionChange(e.target.value);
  }

  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleCareerChange(e) {
    onCareerChange(e.target.value);
  }

  return (
    <div className="filters" role="group" aria-label="Filter players">
      {/* Country filter */}
      <div className="filter-select-wrap">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>

        <select
          className="filter-select"
          id="filter-country"
          value={selectedCountry}
          onChange={handleCountryChange}
          aria-label="Filter by country"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country.id} value={String(country.id)}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Position filter */}
      <div className="filter-select-wrap">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>

        <select
          className="filter-select"
          id="filter-position"
          value={selectedPosition}
          onChange={handlePositionChange}
          aria-label="Filter by position"
        >
          <option value="">All Positions</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

      {/* Career Type filter */}
      <div className="filter-select-wrap">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>

        <select
          className="filter-select"
          id="filter-career"
          value={selectedCareer}
          onChange={handleCareerChange}
          aria-label="Filter by career type"
        >
          <option value="">All Tournament Types</option>
          {CAREER_TYPES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset button */}
      {hasActiveFilters && (
        <button
          className="filters__reset"
          onClick={onReset}
          aria-label="Reset all filters"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
