/**
 * Converts a stable string seed into a pseudo-random number in the range [0, 1).
 * This keeps the dashboard mock data deterministic across refreshes and builds.
 */
export function seededRatio(seed: string): number {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return ((hash >>> 0) % 10000) / 10000;
}

/**
 * Maps a stable seed into an integer range.
 */
export function seededInt(seed: string, min: number, max: number): number {
  return Math.round(min + seededRatio(seed) * (max - min));
}
