"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  getConsent,
  getServerConsent,
  subscribeConsent,
} from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getServerConsent,
  );

  if (!GA_ID || consent !== "accepted") return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
