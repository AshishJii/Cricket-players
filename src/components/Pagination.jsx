/**
 * @file Pagination.jsx
 * @description Page navigation component with numbered buttons and prev/next controls.
 * Shows up to 7 page buttons with ellipsis for large page counts.
 */

import { ChevronLeftIcon } from "./icons/ChevronLeftIcon.jsx";
import { ChevronRightIcon } from "./icons/ChevronRightIcon.jsx";
import "../styles/components/Pagination.css";

/**
 * Generates the page numbers to display, inserting nulls for ellipsis positions.
 *
 * @param {number} currentPage - 1-based current page.
 * @param {number} totalPages - Total number of pages.
 * @returns {Array<number|null>} Array of page numbers; null represents ellipsis.
 */
function buildPageRange(currentPage, totalPages) {
  if (7 >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  pages.push(1);
  if (2 < left) pages.push(null); // ellipsis

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) pages.push(null); // ellipsis
  pages.push(totalPages);

  return pages;
}

/**
 * @param {Object} props
 * @param {number} props.currentPage - 1-based current page.
 * @param {number} props.totalPages - Total number of pages.
 * @param {number} props.totalItems - Total filtered items count.
 * @param {Function} props.onPageChange - Called with the new page number.
 */
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}) {
  if (1 >= totalPages) return null;

  const pageRange = buildPageRange(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <span className="pagination__info">
        {totalItems} player{1 !== totalItems ? "s" : ""} found
      </span>

      {/* Previous */}
      <button
        className="pagination__btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={1 === currentPage}
        aria-label="Previous page"
      >
        <ChevronLeftIcon width="16" height="16" />
      </button>

      {/* Page numbers */}
      {pageRange.map((page, index) =>
        null === page ? (
          <span
            key={`ellipsis-${index}`}
            className="pagination__ellipsis"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            className={`pagination__btn${page === currentPage ? " pagination__btn--active" : ""}`}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        className="pagination__btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRightIcon width="16" height="16" />
      </button>
    </nav>
  );
}
