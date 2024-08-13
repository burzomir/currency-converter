import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, CssBaseline, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { CurrencyExchange } from "@mui/icons-material";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Currency converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CssBaseline />
          <Container>
            <Stack gap={5} justifyContent="center">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={3}
              >
                <Typography variant="h4" component="h1">
                  Currency converter
                </Typography>
                <CurrencyExchange fontSize="large" />
              </Stack>
              {children}
            </Stack>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
