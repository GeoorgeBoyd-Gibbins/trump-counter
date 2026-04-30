export interface RemainingParts {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const ZERO: RemainingParts = {
  years: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  done: true,
};

/**
 * Decompose the gap between `nowMs` and `targetMs` into calendar-aware
 * years + days + hours + minutes + seconds. Years are counted by walking
 * the calendar from `now`, so leap years are handled correctly.
 */
export function diffToParts(targetMs: number, nowMs: number): RemainingParts {
  if (nowMs >= targetMs) return { ...ZERO };

  // Walk whole years forward from `now` until one more year would overshoot.
  const now = new Date(nowMs);
  const probe = new Date(nowMs);
  let years = 0;
  while (true) {
    probe.setUTCFullYear(now.getUTCFullYear() + years + 1);
    if (probe.getTime() > targetMs) break;
    years += 1;
  }

  // Anchor: now + `years` whole calendar years.
  const anchor = new Date(nowMs);
  anchor.setUTCFullYear(now.getUTCFullYear() + years);
  let remainingMs = targetMs - anchor.getTime();

  const MS_PER_DAY = 86_400_000;
  const MS_PER_HOUR = 3_600_000;
  const MS_PER_MIN = 60_000;

  const days = Math.floor(remainingMs / MS_PER_DAY);
  remainingMs -= days * MS_PER_DAY;
  const hours = Math.floor(remainingMs / MS_PER_HOUR);
  remainingMs -= hours * MS_PER_HOUR;
  const minutes = Math.floor(remainingMs / MS_PER_MIN);
  remainingMs -= minutes * MS_PER_MIN;
  const seconds = Math.floor(remainingMs / 1000);

  return { years, days, hours, minutes, seconds, done: false };
}
