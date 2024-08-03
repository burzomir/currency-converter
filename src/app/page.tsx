"use client";
import { Stack } from "@mui/material";
import { CurrencyExchange } from "@mui/icons-material";
import { useState } from "react";
import CurrencySelect from "@/components/currency-select";
import AmountInput from "@/components/amount-input";

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
  const [currency, setCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState(0);
  return (
    <Stack gap={3}>
      <CurrencySelect
        currencies={currencies}
        value={currency}
        onChange={setCurrency}
      />
      <AmountInput value={amount} onChange={setAmount} />
    </Stack>
  );
}

const currencies = [
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
];
