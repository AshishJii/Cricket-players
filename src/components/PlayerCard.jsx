/**
 * @file PlayerCard.jsx
 * @description Displays a cricket player's summary card. Clicking navigates to detail page.
 */

import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate.js';
import '../../src/styles/components/PlayerCard.css';

/**
 * @param {Object} props
 * @param {Object} props.player - Player data object from SportMonks API.
 * @param {Object} [props.country] - Country object matching player.country_id.
 */
export function PlayerCard({ player, country }) {
  const {
    id,
    fullname,
    firstname,
    lastname,
    image_path,
    dateofbirth,
    battingstyle,
    bowlingstyle,
    position,
  } = player;

  const displayName = fullname || `${firstname || ''} ${lastname || ''}`.trim() || 'Unknown Player';
  const countryName = country?.name || 'Unknown Country';
  const positionName = position?.name || null;

  return (
    <Link
      to={`/player/${id}`}
      className="player-card"
      aria-label={`View profile of ${displayName}`}
    >
      {/* Player image */}
      <div className="player-card__image-wrap">
        {image_path ? (
          <img
            src={image_path}
            alt={`${displayName} cricket player`}
            className="player-card__image"
            width="320"
            height="213"
            loading="lazy"
          />
        ) : (
          <div className="player-card__image-fallback" aria-hidden="true">
            🏏
          </div>
        )}
        {positionName && <span className="player-card__badge">{positionName}</span>}
      </div>

      {/* Card body */}
      <div className="player-card__body">
        <h2 className="player-card__name" title={displayName}>
          {displayName}
        </h2>

        <div className="player-card__meta">
          {/* Country */}
          <div className="player-card__meta-row">
            {country?.image_path ? (
              <img
                src={country.image_path}
                alt={`${countryName} flag`}
                className="player-card__country-flag"
                width="20"
                height="14"
                loading="lazy"
              />
            ) : (
              <svg
                className="player-card__meta-icon"
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
            )}
            <span>{countryName}</span>
          </div>

          {/* Date of birth */}
          {dateofbirth && (
            <div className="player-card__meta-row">
              <svg
                className="player-card__meta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{formatDate(dateofbirth)}</span>
            </div>
          )}
        </div>

        {/* Playing styles */}
        {(battingstyle || bowlingstyle) && (
          <div className="player-card__styles">
            {battingstyle && (
              <span className="player-card__style-tag" title="Batting style">
                🏏 {battingstyle}
              </span>
            )}
            {bowlingstyle && (
              <span className="player-card__style-tag" title="Bowling style">
                🎯 {bowlingstyle}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
