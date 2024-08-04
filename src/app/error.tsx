"use client";

import { Alert, Stack } from "@mui/material";

export default function GlobalError() {
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Alert severity="error">Service unavailable</Alert>
    </Stack>
  );
}
