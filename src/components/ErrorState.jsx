/**
 * @file ErrorState.jsx
 * @description Displays an error message with a retry button.
 */

import "../styles/components/ErrorState.css";

/**
 * @param {Object} props
 * @param {string} [props.message] - Error message to display.
 * @param {Function} [props.onRetry] - Called when the user clicks retry.
 */
export function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="error-state" role="alert" aria-live="assertive">
      <div className="error-state__icon" aria-hidden="true">
        ⚠️
      </div>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <button className="error-state__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
