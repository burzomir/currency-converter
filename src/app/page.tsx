"use client";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { CurrencyExchange } from "@mui/icons-material";
import { useId } from "react";
import { NumericFormat } from "react-number-format";
import { useSeparators } from "@/hooks";

export default function Home() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={3}
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CurrencyInput />
      <CurrencyExchange fontSize="large" color="info" />
      <CurrencyInput />
    </Stack>
  );
}

function CurrencyInput() {
  const currencyId = useId();
  const amountId = useId();
  const { thousandSeparator, decimalSeparator } = useSeparators();
  return (
    <Stack gap={3}>
      <Autocomplete
        options={currencies}
        getOptionLabel={(option) => `${option.code} - ${option.name}`}
        getOptionKey={(option) => option.code}
        renderInput={(params) => <TextField {...params} label="Currency" />}
        id={currencyId}
        disableClearable
        disablePortal
        defaultValue={currencies[0]}
        size="small"
      />
      <NumericFormat
        customInput={TextField}
        id={amountId}
        label="Amount"
        allowNegative={false}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
      />
    </Stack>
  );
}

const currencies = [
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
];
