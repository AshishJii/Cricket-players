/**
 * @file PlayerSkeleton.jsx
 * @description Loading skeleton placeholder for player cards.
 */

import '../styles/components/PlayerSkeleton.css';

/**
 * Renders a single skeleton card with shimmer animation.
 *
 * @returns {JSX.Element}
 */
function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__image skeleton-shimmer" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__name skeleton-shimmer" />
        <div className="skeleton-card__meta">
          <div className="skeleton-card__line skeleton-shimmer" />
          <div className="skeleton-card__line skeleton-card__line--short skeleton-shimmer" />
        </div>
        <div className="skeleton-card__tags">
          <div className="skeleton-card__tag skeleton-shimmer" />
          <div className="skeleton-card__tag skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a grid of skeleton cards.
 *
 * @param {Object} props
 * @param {number} [props.count=12] - Number of skeleton cards to render.
 * @returns {JSX.Element}
 */
export function PlayerSkeleton({ count = 12 }) {
  return (
    <section aria-label="Loading players" aria-busy="true">
      <div className="players-grid">
        {Array.from({ length: count }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
}
