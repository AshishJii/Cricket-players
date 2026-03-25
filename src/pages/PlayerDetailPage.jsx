/**
 * @file PlayerDetailPage.jsx
 * @description Shows detailed information about a single cricket player.
 * Fetches player with career stats from IndexedDB cache or API.
 */

import { Link, useParams } from "react-router-dom";
import { usePlayerDetail } from "../hooks/usePlayerDetail.js";
import { useCountries } from "../hooks/useCountries.js";
import { CareerTable } from "../components/CareerTable.jsx";
import { ErrorState } from "../components/ErrorState.jsx";
import { formatDate, calculateAge } from "../utils/formatDate.js";
import "../styles/PlayerDetailPage.css";
import "../styles/components/PlayerSkeleton.css";

/**
 * Renders a loading skeleton for the detail hero section.
 *
 * @returns {JSX.Element}
 */
function DetailSkeleton() {
  return (
    <div className="detail-skeleton__hero">
      <div
        className="detail-skeleton__image skeleton-shimmer"
        aria-hidden="true"
      />
      <div className="detail-skeleton__info">
        <div
          className="detail-skeleton__name skeleton-shimmer"
          aria-hidden="true"
        />
        <div
          className="detail-skeleton__badge skeleton-shimmer"
          aria-hidden="true"
        />
        <div className="detail-skeleton__meta">
          <div
            className="detail-skeleton__meta-item skeleton-shimmer"
            aria-hidden="true"
          />
          <div
            className="detail-skeleton__meta-item skeleton-shimmer"
            aria-hidden="true"
          />
          <div
            className="detail-skeleton__meta-item skeleton-shimmer"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a label + value metadata item.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string|number|null|undefined} props.value
 * @returns {JSX.Element}
 */
function MetaItem({ label, value }) {
  return (
    <div className="detail-hero__meta-item">
      <span className="detail-hero__meta-label">{label}</span>
      <span className="detail-hero__meta-value">{value || "—"}</span>
    </div>
  );
}

/**
 * @returns {JSX.Element}
 */
export function PlayerDetailPage() {
  const { id } = useParams();
  const { player, loading, error } = usePlayerDetail(id);
  const { countryMap } = useCountries();

  const country = player ? countryMap[player.country_id] : null;
  const age = player ? calculateAge(player.dateofbirth) : null;

  return (
    <div className="detail-page">
      <div className="container">
        <Link
          to="/"
          className="detail-page__back"
          aria-label="Back to players list"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Players
        </Link>
      </div>

      {error ? (
        <div className="container">
          <ErrorState
            message={`Failed to load player: ${error}`}
            onRetry={() => window.location.reload()}
          />
        </div>
      ) : (
        <>
          {/* ─── Hero ─── */}
          <section className="detail-hero" aria-label="Player profile">
            <div className="container">
              {loading ? (
                <DetailSkeleton />
              ) : player ? (
                <div className="detail-hero__inner">
                  {/* Photo */}
                  <div className="detail-hero__image-wrap">
                    {player.image_path ? (
                      <img
                        src={player.image_path}
                        alt={`${player.fullname || "Player"} profile`}
                        className="detail-hero__image"
                        width="192"
                        height="192"
                        loading="eager"
                      />
                    ) : (
                      <div
                        className="detail-hero__image-fallback"
                        aria-hidden="true"
                      >
                        🏏
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="detail-hero__info">
                    <h1 className="detail-hero__name">
                      {player.fullname ||
                        `${player.firstname || ""} ${player.lastname || ""}`.trim() ||
                        "Unknown Player"}
                    </h1>

                    {player.position?.name && (
                      <span className="detail-hero__position">
                        {player.position.name}
                      </span>
                    )}

                    <div className="detail-hero__meta">
                      <MetaItem
                        label="Country"
                        value={
                          country ? (
                            <>
                              {country.image_path && (
                                <img
                                  src={country.image_path}
                                  alt={`${country.name} flag`}
                                  className="detail-hero__flag"
                                  width="24"
                                  height="16"
                                />
                              )}
                              {country.name}
                            </>
                          ) : (
                            "—"
                          )
                        }
                      />
                      <MetaItem
                        label="Date of Birth"
                        value={formatDate(player.dateofbirth)}
                      />
                      <MetaItem
                        label="Age"
                        value={null !== age ? `${age} years` : "—"}
                      />
                      <MetaItem
                        label="Gender"
                        value={"m" === player.gender ? "Male" : "Female"}
                      />
                      <MetaItem
                        label="Batting Style"
                        value={player.battingstyle}
                      />
                      <MetaItem
                        label="Bowling Style"
                        value={player.bowlingstyle}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {/* ─── Career Stats ─── */}
          {!loading && player && (
            <section className="detail-career">
              <div className="container">
                <h2 className="detail-career__heading">Career Statistics</h2>
                <CareerTable career={player.career || []} />
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
