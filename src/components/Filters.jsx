/**
 * @file Filters.jsx
 * @description Dropdown filters for Country and Position.
 */

import '../styles/components/Filters.css';

/**
 * @param {Object} props
 * @param {Array<Object>} props.countries - Array of country objects.
 * @param {Array<string>} props.positions - Array of unique position name strings.
 * @param {string} props.selectedCountry - Currently selected country ID.
 * @param {string} props.selectedPosition - Currently selected position name.
 * @param {Function} props.onCountryChange - Called with new country ID.
 * @param {Function} props.onPositionChange - Called with new position name.
 * @param {Function} props.onReset - Called when reset button is clicked.
 */
export function Filters({
  countries,
  positions,
  selectedCountry,
  selectedPosition,
  onCountryChange,
  onPositionChange,
  onReset,
}) {
  const hasActiveFilters = selectedCountry || selectedPosition;

  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleCountryChange(e) {
    onCountryChange(e.target.value);
  }

  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handlePositionChange(e) {
    onPositionChange(e.target.value);
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

      {/* Reset button */}
      {hasActiveFilters && (
        <button className="filters__reset" onClick={onReset} aria-label="Reset all filters">
          Reset filters
        </button>
      )}
    </div>
  );
}
