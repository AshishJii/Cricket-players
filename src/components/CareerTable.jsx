/**
 * @file CareerTable.jsx
 * @description Displays a player's career statistics grouped by match type.
 */

import "../styles/components/CareerTable.css";

/**
 * Formats a numeric stat value, returning '—' for null/undefined.
 *
 * @param {number|null|undefined} value - Stat value.
 * @param {number} [decimals=2] - Number of decimal places.
 * @returns {string} Formatted value.
 */
function formatStat(value, decimals = 2) {
  if (null === value || undefined === value) return "—";
  return "number" === typeof value ? value.toFixed(decimals) : String(value);
}

/**
 * Renders a batting stats section.
 *
 * @param {Object} props
 * @param {Object} props.batting - Batting stats object.
 * @returns {JSX.Element|null}
 */
function BattingStats({ batting }) {
  if (!batting) return null;
  return (
    <div className="career-table__section">
      <h4 className="career-table__section-title">🏏 Batting</h4>
      <div className="career-table__stats-grid">
        <div className="career-table__stat">
          <span className="career-table__stat-label">Matches</span>
          <span className="career-table__stat-value">
            {batting.matches ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Innings</span>
          <span className="career-table__stat-value">
            {batting.innings ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Runs</span>
          <span className="career-table__stat-value">
            {batting.runs_scored ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Highest</span>
          <span className="career-table__stat-value">
            {batting.highest_inning_score ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Average</span>
          <span className="career-table__stat-value">
            {formatStat(batting.average)}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Strike Rate</span>
          <span className="career-table__stat-value">
            {formatStat(batting.strike_rate)}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">100s</span>
          <span className="career-table__stat-value">
            {batting.hundreds ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">50s</span>
          <span className="career-table__stat-value">
            {batting.fifties ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">4s</span>
          <span className="career-table__stat-value">
            {batting.four_x ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">6s</span>
          <span className="career-table__stat-value">
            {batting.six_x ?? "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a bowling stats section.
 *
 * @param {Object} props
 * @param {Object} props.bowling - Bowling stats object.
 * @returns {JSX.Element|null}
 */
function BowlingStats({ bowling }) {
  if (!bowling) return null;
  return (
    <div className="career-table__section">
      <h4 className="career-table__section-title">🎯 Bowling</h4>
      <div className="career-table__stats-grid">
        <div className="career-table__stat">
          <span className="career-table__stat-label">Matches</span>
          <span className="career-table__stat-value">
            {bowling.matches ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Innings</span>
          <span className="career-table__stat-value">
            {bowling.innings ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Wickets</span>
          <span className="career-table__stat-value">
            {bowling.wickets ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Runs</span>
          <span className="career-table__stat-value">
            {bowling.runs ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Average</span>
          <span className="career-table__stat-value">
            {formatStat(bowling.average)}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Economy</span>
          <span className="career-table__stat-value">
            {formatStat(bowling.econ_rate)}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">Strike Rate</span>
          <span className="career-table__stat-value">
            {formatStat(bowling.strike_rate)}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">4W</span>
          <span className="career-table__stat-value">
            {bowling.four_wickets ?? "—"}
          </span>
        </div>
        <div className="career-table__stat">
          <span className="career-table__stat-label">5W</span>
          <span className="career-table__stat-value">
            {bowling.five_wickets ?? "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Groups career entries by their type (T20, ODI, etc.) and produces a map.
 *
 * @param {Array<Object>} career - Career array from API.
 * @returns {Map<string, Array<Object>>} Map of type → career entries.
 */
function groupByType(career) {
  const map = new Map();
  career.forEach((entry) => {
    const type = entry.type || "Other";
    if (!map.has(type)) {
      map.set(type, []);
    }
    map.get(type).push(entry);
  });
  return map;
}

/**
 * Merges multiple career entries of the same type into one aggregate.
 * (A player can have multiple seasons for the same type.)
 *
 * @param {Array<Object>} entries - Career entries of the same type.
 * @returns {Object} Merged entry with combined batting and bowling.
 */
function mergeEntries(entries) {
  const merged = { batting: null, bowling: null };

  entries.forEach((entry) => {
    if (entry.batting) {
      if (!merged.batting) {
        merged.batting = { ...entry.batting };
      } else {
        // Sum matches, innings, runs, etc.
        const b = merged.batting;
        const n = entry.batting;
        b.matches = (b.matches || 0) + (n.matches || 0);
        b.innings = (b.innings || 0) + (n.innings || 0);
        b.runs_scored = (b.runs_scored || 0) + (n.runs_scored || 0);
        b.four_x = (b.four_x || 0) + (n.four_x || 0);
        b.six_x = (b.six_x || 0) + (n.six_x || 0);
        b.hundreds = (b.hundreds || 0) + (n.hundreds || 0);
        b.fifties = (b.fifties || 0) + (n.fifties || 0);
        b.not_outs = (b.not_outs || 0) + (n.not_outs || 0);
        // Recalculate average
        const outs = b.innings - b.not_outs;
        b.average = 0 < outs ? b.runs_scored / outs : b.runs_scored;
        b.highest_inning_score = Math.max(
          b.highest_inning_score || 0,
          n.highest_inning_score || 0,
        );
      }
    }

    if (entry.bowling) {
      if (!merged.bowling) {
        merged.bowling = { ...entry.bowling };
      } else {
        const bw = merged.bowling;
        const nw = entry.bowling;
        bw.matches = (bw.matches || 0) + (nw.matches || 0);
        bw.innings = (bw.innings || 0) + (nw.innings || 0);
        bw.wickets = (bw.wickets || 0) + (nw.wickets || 0);
        bw.runs = (bw.runs || 0) + (nw.runs || 0);
      }
    }
  });

  return merged;
}

/** Preferred order for match type tabs. */
const TYPE_ORDER = [
  "Test",
  "ODI",
  "T20I",
  "T20",
  "First-class",
  "List A",
  "Other",
];

/**
 * @param {Object} props
 * @param {Array<Object>} props.career - Career data array from API.
 * @returns {JSX.Element|null}
 */
export function CareerTable({ career }) {
  if (!career || 0 === career.length) {
    return (
      <div className="career-table__empty">
        <p>No career statistics available.</p>
      </div>
    );
  }

  const grouped = groupByType(career);

  // Sort types by preferred order
  const sortedTypes = [...grouped.keys()].sort((a, b) => {
    const ai = TYPE_ORDER.indexOf(a);
    const bi = TYPE_ORDER.indexOf(b);
    if (-1 === ai && -1 === bi) return a.localeCompare(b);
    if (-1 === ai) return 1;
    if (-1 === bi) return -1;
    return ai - bi;
  });

  return (
    <div className="career-table">
      {sortedTypes.map((type) => {
        const entries = grouped.get(type);
        const merged = mergeEntries(entries);

        return (
          <article key={type} className="career-table__card">
            <h3 className="career-table__type-badge">{type}</h3>
            <BattingStats batting={merged.batting} />
            <BowlingStats bowling={merged.bowling} />
          </article>
        );
      })}
    </div>
  );
}
