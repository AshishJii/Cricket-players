/**
 * @file SortControls.jsx
 * @description Sort field buttons with ascending/descending toggle.
 */

import { ChevronUpIcon } from "./icons/ChevronUpIcon.jsx";
import "../styles/components/SortControls.css";

/** @type {Array<{field: string, label: string}>} */
const SORT_OPTIONS = [
  { field: "firstname", label: "First Name" },
  { field: "id", label: "ID" },
  { field: "updated_at", label: "Recently Updated" },
];

/**
 * @param {Object} props
 * @param {string} props.sortField - Currently active sort field.
 * @param {'asc'|'desc'} props.sortOrder - Current sort direction.
 * @param {Function} props.onSortChange - Called with (field, order).
 */
export function SortControls({ sortField, sortOrder, onSortChange }) {
  /**
   * Handles clicking a sort button. Toggles order if already active, else sets asc.
   *
   * @param {string} field - The sort field to activate.
   */
  function handleClick(field) {
    if (field === sortField) {
      onSortChange(field, "asc" === sortOrder ? "desc" : "asc");
    } else {
      onSortChange(field, "asc");
    }
  }

  return (
    <div className="sort-controls" role="group" aria-label="Sort players">
      <span className="sort-controls__label">Sort by:</span>

      <div className="sort-controls__buttons">
        {SORT_OPTIONS.map(({ field, label }) => {
          const isActive = field === sortField;
          return (
            <button
              key={field}
              className={`sort-btn${isActive ? " sort-btn--active" : ""}`}
              onClick={() => handleClick(field)}
              aria-pressed={isActive}
              aria-label={`Sort by ${label} ${isActive ? ("asc" === sortOrder ? "ascending" : "descending") : ""}`}
            >
              {label}
              {isActive && (
                <ChevronUpIcon
                  style={{
                    transform:
                      "asc" === sortOrder ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
