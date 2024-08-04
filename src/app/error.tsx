"use client";

import { Alert, Stack } from "@mui/material";

export default function GlobalError() {
  return (
    <Stack alignItems="center">
      <Alert severity="error">Service unavailable</Alert>
    </Stack>
  );
}
