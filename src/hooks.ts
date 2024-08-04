import { useSyncExternalStore } from "react";

/**
 * Hook that tries to identify localized separators for number formatting
 * Based on the current browser language
 * Thousand separator is used to improve readability of big numbers by grouping them
 * Decimal separator separates integral and fractional parts of a number.
 */
export function useSeparators() {
  const language = useLanguage();
  const formatter = Intl.NumberFormat(language);
  const decimalSeparator = formatter
    .formatToParts(0.1)
    .find((part) => part.type === "decimal")?.value;
  const thousandSeparator = formatter
    .formatToParts(1000)
    .find((part) => part.type === "group")?.value;
  return { decimalSeparator, thousandSeparator };
}

/**
 * Hook that provides access to navigator.language
 * It tells what language is currently used by a user
 */
function useLanguage() {
  return useSyncExternalStore(
    subscribeLanguage,
    getLanguage,
    getServerSnapshot
  );
}

function subscribeLanguage(callback: () => void) {
  window.addEventListener("languagechange", callback);
  return () => window.removeEventListener("languagechange", callback);
}

function getLanguage() {
  return navigator.language;
}

function getServerSnapshot() {
  return "en";
}
