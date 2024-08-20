"use client";

import {
  ColorMode,
  useColorModeDetector,
} from "@burzomir/color-mode-detector-react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";

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
  const systemTheme = useColorModeDetector();
  const theme = (() => {
    switch (systemTheme) {
      case ColorMode.Dark:
        return darkTheme;
      case ColorMode.Light:
        return lightTheme;
    }
  })();
  return <MUIThemeProvider theme={theme}>{props.children}</MUIThemeProvider>;
}
