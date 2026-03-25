/**
 * @file PlayerCard.jsx
 * @description Displays a cricket player's summary card. Clicking navigates to detail page.
 */

import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate.js";
import { GlobeIcon } from "./icons/GlobeIcon.jsx";
import { CalendarIcon } from "./icons/CalendarIcon.jsx";
import "../../src/styles/components/PlayerCard.css";

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

  const displayName =
    fullname ||
    `${firstname || ""} ${lastname || ""}`.trim() ||
    "Unknown Player";
  const countryName = country?.name || "Unknown Country";
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
        {positionName && (
          <span className="player-card__badge">{positionName}</span>
        )}
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
              <GlobeIcon className="player-card__meta-icon" />
            )}
            <span>{countryName}</span>
          </div>

          {/* Date of birth */}
          {dateofbirth && (
            <div className="player-card__meta-row">
              <CalendarIcon className="player-card__meta-icon" />
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
