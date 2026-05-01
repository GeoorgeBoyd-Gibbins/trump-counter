"use client";

import { useSyncExternalStore } from "react";
import {
  getConsent,
  getServerConsent,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function ConsentBanner() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getServerConsent,
  );

  if (!GA_ID || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        animation: "consent-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        maxWidth: "min(24rem, calc(100vw - 2rem))",
      }}
      className="
        fixed z-50
        bottom-4 right-4
        rounded-2xl bg-zinc-900/95 backdrop-blur-md
        ring-1 ring-white/10 shadow-2xl shadow-black/60
        p-5
      "
    >
      <h2 className="text-sm font-semibold text-white mb-1.5 tracking-tight">
        Cookies
      </h2>
      <p className="text-[13px] sm:text-sm text-zinc-300 leading-relaxed">
        We use anonymous analytics cookies to understand how the site is used. No
        tracking, no ads.
      </p>
      <div className="mt-4 flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => setConsent("rejected")}
          className="
            px-4 py-2 text-sm font-medium rounded-lg
            bg-zinc-800 text-zinc-200
            hover:bg-zinc-700 active:bg-zinc-700
            transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
          "
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => setConsent("accepted")}
          className="
            px-4 py-2 text-sm font-semibold rounded-lg
            bg-white text-black
            hover:bg-zinc-200 active:bg-zinc-300
            transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
          "
        >
          Accept
        </button>
      </div>
    </div>
  );
}
