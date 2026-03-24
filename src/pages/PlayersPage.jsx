/**
 * @file PlayersPage.jsx
 * @description Main players listing page with search, filters, sort, pagination.
 * All state is synced to URL search params for shareable links.
 */

import { useMemo } from 'react';
import { usePlayersData } from '../hooks/usePlayersData.js';
import { useCountries } from '../hooks/useCountries.js';
import { useFilters } from '../hooks/useFilters.js';
import { PlayerCard } from '../components/PlayerCard.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Filters } from '../components/Filters.jsx';
import { SortControls } from '../components/SortControls.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { PlayerSkeleton } from '../components/PlayerSkeleton.jsx';
import { ErrorState } from '../components/ErrorState.jsx';
import {
  filterPlayers,
  sortPlayers,
  paginatePlayers,
  getTotalPages,
  derivePositionOptions,
} from '../utils/filterPlayers.js';
import '../styles/PlayersPage.css';

/**
 * @returns {JSX.Element}
 */
export function PlayersPage() {
  const { players, loading: playersLoading, error: playersError } = usePlayersData();
  const { countries, countryMap, loading: countriesLoading } = useCountries();
  const { filters, setFilter, resetFilters } = useFilters();

  const { search, country, position, sort, order, page } = filters;

  // Derive unique positions from full player list
  const positionOptions = useMemo(() => derivePositionOptions(players), [players]);

  // Countries available in cricketers (have at least one player)
  const playerCountryIds = useMemo(
    () => new Set(players.map((p) => String(p.country_id))),
    [players]
  );

  const filteredCountries = useMemo(
    () => {
      const activeCountries = countries.filter((c) => playerCountryIds.has(String(c.id)));
      return activeCountries.sort((a, b) => a.name.localeCompare(b.name));
    },
    [countries, playerCountryIds]
  );

  // Apply filter → sort → paginate
  const filtered = useMemo(
    () => filterPlayers(players, { search, country, position }),
    [players, search, country, position]
  );

  const sorted = useMemo(() => sortPlayers(filtered, sort, order), [filtered, sort, order]);

  const totalPages = getTotalPages(sorted.length);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paginated = useMemo(() => paginatePlayers(sorted, safePage), [sorted, safePage]);

  /** @param {number} newPage */
  function handlePageChange(newPage) {
    setFilter({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="players-page">
      {/* ─── Header ─── */}
      <header className="players-header">
        <div className="container">
          <div className="players-header__inner">
            <div>
              <h1 className="players-header__title">Cricket Players</h1>
              <p className="players-header__subtitle">
                Powered by SportMonks · {0 < players.length ? `${players.length} players` : ''}
              </p>
            </div>

            <div className="players-header__controls">
              {/* Search row */}
              <div className="players-header__row">
                <SearchBar value={search} onChange={(val) => setFilter({ search: val })} />
              </div>

              {/* Filters row */}
              <div className="players-header__row">
                <Filters
                  countries={filteredCountries}
                  positions={positionOptions}
                  selectedCountry={country}
                  selectedPosition={position}
                  onCountryChange={(val) => setFilter({ country: val })}
                  onPositionChange={(val) => setFilter({ position: val })}
                  onReset={resetFilters}
                />
              </div>

              {/* Sort row */}
              <div className="players-header__row players-header__row--space-between">
                <SortControls
                  sortField={sort}
                  sortOrder={order}
                  onSortChange={(field, ord) => setFilter({ sort: field, order: ord })}
                />
              </div>
            </div>

            {/* Loading banner while fetching */}
            {playersLoading && (
              <div className="players-page__loading-banner" role="status" aria-live="polite">
                <div className="spinner" aria-hidden="true" />
                <span>
                  {countriesLoading ? 'Fetching players and countries…' : 'Fetching players…'} This
                  may take a moment on first load.
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── Main content ─── */}
      <main className="players-main">
        <div className="container">
          {playersError ? (
            <ErrorState
              message={`Failed to load players: ${playersError}`}
              onRetry={() => window.location.reload()}
            />
          ) : playersLoading ? (
            <PlayerSkeleton count={12} />
          ) : 0 === paginated.length ? (
            <div className="players-empty">
              <p className="players-empty__icon" aria-hidden="true">
                🔍
              </p>
              <p className="players-empty__text">No players match your current filters.</p>
            </div>
          ) : (
            <section aria-label={`Players list, page ${safePage} of ${totalPages}`}>
              <div className="players-grid">
                {paginated.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    country={countryMap[player.country_id]}
                  />
                ))}
              </div>
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={sorted.length}
                onPageChange={handlePageChange}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
