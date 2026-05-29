/**
 * Fake "global vote" stats system.
 *
 * Stores per-topic vote counts in localStorage.
 * On first load, seeds realistic-looking baseline data so the numbers
 * feel like thousands of people have already voted.
 *
 * Every real user vote is added on top of the baseline.
 */

const STORAGE_KEY = "goat-debate-global-votes";
const SEED_VERSION = 1;

// ── Types ──────────────────────────────────────────────────────────────

export interface TopicVotes {
  playerA: number;
  playerB: number;
}

interface StoredData {
  version: number;
  topics: Record<string, TopicVotes>;
}

export interface TopicStats {
  playerACount: number;
  playerBCount: number;
  total: number;
  playerAPercent: number;
  playerBPercent: number;
}

export interface GlobalStats {
  totalPlayerA: number;
  totalPlayerB: number;
  total: number;
  playerAPercent: number;
  playerBPercent: number;
}

// ── Baseline seed data ─────────────────────────────────────────────────
// Each topic has a plausible split (2 000 – 5 000 total votes).
// Some lean playerA (playerA slot), some lean playerB (playerB slot) — keeps it spicy.
// Slot names "playerA"/"playerB" are legacy identifiers; in this fork they map to
// playerA (e.g. Messi) and playerB (e.g. Ronaldo).

const BASELINE: Record<string, TopicVotes> = {
  rings:     { playerA: 1680, playerB: 2120 },  // 44 vs 56 — playerB edge (trophy argument)
  clutch:    { playerA: 2728, playerB: 1672 },  // 62 vs 38 — playerA dominant
  skill:     { playerA: 2340, playerB: 1860 },  // 56 vs 44 — playerA edge
  mvp:       { playerA: 1044, playerB: 2556 },  // 29 vs 71 — playerB dominant
  mentality: { playerA: 3185, playerB: 1215 },  // 72 vs 28 — mentality crushes
  defense:   { playerA: 1920, playerB: 1680 },  // 53 vs 47 — close, slight playerA
  finals:    { playerA: 1260, playerB: 2340 },  // 35 vs 65 — playerB data advantage
  teammates: { playerA: 2640, playerB: 1760 },  // 60 vs 40 — loyalty narrative
  era:       { playerA: 2860, playerB: 1540 },  // 65 vs 35 — playerA cultural icon
  iconic:    { playerA: 2475, playerB: 2025 },  // 55 vs 45 — close
  goat:      { playerA: 1890, playerB: 2310 },  // 45 vs 55 — playerB edge
  loyalty:   { playerA: 2912, playerB: 1288 },  // 69 vs 31 — one-club loyalty resonates
};

// ── Internal helpers ───────────────────────────────────────────────────

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function load(): StoredData {
  if (!isBrowser()) return { version: SEED_VERSION, topics: { ...BASELINE } };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: StoredData = JSON.parse(raw);
      // If the seed version changed we re-seed but keep real votes
      if (parsed.version === SEED_VERSION) return parsed;
    }
  } catch {
    // corrupted data — fall through to seed
  }

  // First visit or version bump → seed
  const fresh: StoredData = { version: SEED_VERSION, topics: { ...BASELINE } };
  // Deep clone each topic to avoid shared references
  for (const key of Object.keys(fresh.topics)) {
    fresh.topics[key] = { ...BASELINE[key]! };
  }
  save(fresh);
  return fresh;
}

function save(data: StoredData): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or blocked — silently ignore
  }
}

// ── Public API ─────────────────────────────────────────────────────────

/**
 * Record a vote for a topic.  Increments the count for the chosen side.
 */
export function recordVote(topicId: string, winner: "playerA" | "playerB"): void {
  const data = load();
  if (!data.topics[topicId]) {
    data.topics[topicId] = { playerA: 0, playerB: 0 };
  }
  data.topics[topicId][winner] += 1;
  save(data);
}

/**
 * Get the vote breakdown for a single topic.
 */
export function getTopicStats(topicId: string): TopicStats {
  const data = load();
  const topic = data.topics[topicId] ?? { playerA: 0, playerB: 0 };
  const total = topic.playerA + topic.playerB;
  return {
    playerACount: topic.playerA,
    playerBCount: topic.playerB,
    total,
    playerAPercent: total > 0 ? Math.round((topic.playerA / total) * 100) : 50,
    playerBPercent: total > 0 ? Math.round((topic.playerB / total) * 100) : 50,
  };
}

/**
 * Get the aggregate vote breakdown across ALL seeded topics.
 * (Bonus / unknown topics are excluded so the global war stays clean.)
 */
export function getGlobalStats(): GlobalStats {
  const data = load();
  let totalPlayerA = 0;
  let totalPlayerB = 0;

  // Only aggregate the 12 main topics for the "war" banner
  const mainTopicIds = Object.keys(BASELINE);
  for (const id of mainTopicIds) {
    const t = data.topics[id];
    if (t) {
      totalPlayerA += t.playerA;
      totalPlayerB += t.playerB;
    }
  }

  const total = totalPlayerA + totalPlayerB;
  return {
    totalPlayerA,
    totalPlayerB,
    total,
    playerAPercent: total > 0 ? Math.round((totalPlayerA / total) * 100) : 50,
    playerBPercent: total > 0 ? Math.round((totalPlayerB / total) * 100) : 50,
  };
}
