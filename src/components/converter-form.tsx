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
  fromOnChange: (field: FormField) => void;
  // eslint-disable-next-line
  toOnChange: (field: FormField) => void;
};

export default function ConverterForm({
  currencies,
  state,
  fromOnChange,
  toOnChange,
}: ConverterFormProps) {
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
          value={
            currencies.find(
              (currency) => currency.code === state.from.currencyCode
            )!
          }
          onChange={(currency) =>
            fromOnChange({ ...state.from, currencyCode: currency.code })
          }
        />
        <AmountInput
          value={state.from.amount}
          onChange={(amount) => fromOnChange({ ...state.from, amount: amount })}
        />
      </Stack>
      <CurrencyExchange fontSize="large" color="info" />
      <Stack gap={3}>
        <CurrencySelect
          currencies={currencies}
          value={
            currencies.find(
              (currency) => currency.code === state.to.currencyCode
            )!
          }
          onChange={(currency) =>
            toOnChange({ ...state.to, currencyCode: currency.code })
          }
        />
        <AmountInput
          value={state.to.amount}
          onChange={(amount) => toOnChange({ ...state.to, amount: amount })}
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
    from: { currencyCode, amount: 0 },
    to: { currencyCode, amount: 0 },
  };
}
