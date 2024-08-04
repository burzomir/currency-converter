import { useSyncExternalStore } from "react";

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
