"use client";

import { Currency, CurrencyCode } from "@/types";
import { CurrencyExchange } from "@mui/icons-material";
import { Stack } from "@mui/material";
import * as React from "react";
import CurrencySelect from "./currency-select";
import AmountInput from "./amount-input";

export type ConverterFormProps = {
  currencies: Currency[];
  state: FormState;
  // eslint-disable-next-line
  fromChange: (field: FormField) => void;
  // eslint-disable-next-line
  toCurrencyChange: (currencyCode: CurrencyCode) => void;
  // eslint-disable-next-line
  toAmountChange: (amount: number) => void;
};

export default function ConverterForm({
  currencies,
  state,
  fromChange,
  toCurrencyChange,
  toAmountChange,
}: ConverterFormProps) {
  const fromCurrency = React.useMemo(() => {
    return currencies.find(
      (currency) => currency.code === state.from.currencyCode
    )!;
  }, [currencies, state.from.currencyCode]);
  const toCurrency = React.useMemo(() => {
    return currencies.find(
      (currency) => currency.code === state.to.currencyCode
    )!;
  }, [currencies, state.to.currencyCode]);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={3}
      alignItems="center"
      justifyContent="center"
    >
      <Stack gap={3}>
        <CurrencySelect
          currencies={currencies}
          value={fromCurrency}
          onChange={(currency) =>
            fromChange({ ...state.from, currencyCode: currency.code })
          }
        />
        <AmountInput
          value={state.from.amount}
          onChange={(amount) => fromChange({ ...state.from, amount: amount })}
          precision={fromCurrency.precision}
        />
      </Stack>
      <CurrencyExchange fontSize="large" color="info" />
      <Stack gap={3}>
        <CurrencySelect
          currencies={currencies}
          value={toCurrency}
          onChange={(currency) => toCurrencyChange(currency.code)}
        />
        <AmountInput
          value={state.to.amount}
          onChange={toAmountChange}
          precision={toCurrency.precision}
        />
      </Stack>
    </Stack>
  );
}

export type FormState = {
  from: FormField;
  to: FormField;
};

export type FormField = {
  currencyCode: CurrencyCode;
  amount: number;
};

export function initFormState(currencyCode: CurrencyCode): FormState {
  return {
    from: { currencyCode, amount: 1 },
    to: { currencyCode, amount: 1 },
  };
}
