"use client";

import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { PropsWithChildren, useSyncExternalStore } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function ThemeProvider(props: PropsWithChildren<void>) {
  const systemTheme = useSystemTheme();
  const theme = (() => {
    switch (systemTheme) {
      case "dark":
        return darkTheme;
      case "light":
        return lightTheme;
    }
  })();
  return <MUIThemeProvider theme={theme}>{props.children}</MUIThemeProvider>;
}

function useSystemTheme() {
  return useSyncExternalStore<"dark" | "light">(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

const query = "(prefers-color-scheme: dark)";

function getSnapshot() {
  return window.matchMedia(query).matches ? "dark" : "light";
}

function subscribe(callback: () => void) {
  window.matchMedia(query).addEventListener("change", callback);
  return () => {
    window.matchMedia(query).removeEventListener("change", callback);
  };
}

function getServerSnapshot() {
  return "dark" as const;
}
