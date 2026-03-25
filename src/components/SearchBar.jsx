/**
 * @file SearchBar.jsx
 * @description Real-time search bar with debouncing (300ms) and submit support.
 */

import { useRef, useEffect, useState } from "react";
import { SearchIcon } from "./icons/SearchIcon.jsx";
import { XIcon } from "./icons/XIcon.jsx";
import "../styles/components/SearchBar.css";

const DEBOUNCE_MS = 300;

/**
 * @param {Object} props
 * @param {string} props.value - Current controlled search value.
 * @param {Function} props.onChange - Called with debounced value on change.
 */
export function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef(null);

  // Sync external value → local (e.g. on URL param change)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  /**
   * Handles input change with debounce.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function handleChange(e) {
    const next = e.target.value;
    setLocalValue(next);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(next);
    }, DEBOUNCE_MS);
  }

  /**
   * Handles form submit — fires immediately without waiting for debounce.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function handleSubmit(e) {
    e.preventDefault();
    clearTimeout(timerRef.current);
    onChange(localValue);
  }

  /**
   * Clears the search input.
   */
  function handleClear() {
    setLocalValue("");
    clearTimeout(timerRef.current);
    onChange("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search players by last name"
    >
      <div className="search-bar">
        {/* Search icon */}
        <SearchIcon
          className="search-bar__icon"
        />

        <input
          className="search-bar__input"
          type="search"
          id="player-search"
          name="search"
          placeholder="Search by last name…"
          value={localValue}
          onChange={handleChange}
          autoComplete="off"
          aria-label="Search players by last name"
        />

        {/* Clear button */}
        {localValue && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <XIcon />
          </button>
        )}
      </div>
    </form>
  );
}
