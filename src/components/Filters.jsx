/**
 * @file Filters.jsx
 * @description Dropdown filters for Country and Position.
 */

import { CAREER_TYPES } from "../utils/constants.js";
import { GlobeIcon } from "./icons/GlobeIcon.jsx";
import { UserIcon } from "./icons/UserIcon.jsx";
import { StarIcon } from "./icons/StarIcon.jsx";
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
        <GlobeIcon />

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
        <UserIcon />

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
        <StarIcon />

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
