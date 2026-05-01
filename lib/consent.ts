const STORAGE_KEY = "cookie-consent";
const EVENT_NAME = "consent-change";

export type ConsentValue = "accepted" | "rejected" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

export function setConsent(value: Exclude<ConsentValue, null>) {
  localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getServerConsent(): ConsentValue {
  return null;
}
