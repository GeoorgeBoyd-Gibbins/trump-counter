"use client";

import { useEffect, useState } from "react";
import { diffToParts, type RemainingParts } from "@/lib/time";
import { FlipUnit } from "./FlipUnit";

interface CountdownProps {
  initial: RemainingParts;
  targetMs: number;
}

export function Countdown({ initial, targetMs }: CountdownProps) {
  const [parts, setParts] = useState<RemainingParts>(initial);

  useEffect(() => {
    // Replace SSR snapshot with the visitor's actual current time on mount,
    // then tick once per second.
    setParts(diffToParts(targetMs, Date.now()));
    const id = window.setInterval(() => {
      setParts(diffToParts(targetMs, Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  if (parts.done) {
    return (
      <p className="text-2xl sm:text-3xl text-zinc-200 font-semibold tracking-wide">
        The presidency has ended.
      </p>
    );
  }

  return (
    <div
      className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
      suppressHydrationWarning
    >
      <FlipUnit value={parts.years} label="Years" pad={1} />
      <FlipUnit value={parts.days} label="Days" pad={3} />
      <FlipUnit value={parts.hours} label="Hours" />
      <FlipUnit value={parts.minutes} label="Minutes" />
      <FlipUnit value={parts.seconds} label="Seconds" />
    </div>
  );
}
