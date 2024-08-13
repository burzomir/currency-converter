"use client";

import { Currency, CurrencyCode } from "@/types";
import { SwapHoriz } from "@mui/icons-material";
import { FormGroup, FormHelperText, IconButton, Stack } from "@mui/material";
import * as React from "react";
import CurrencySelect from "./currency-select";
import AmountInput from "./amount-input";
import { detectSeparators, Separators } from "@/hooks";
import LanguageSelect, { defaultLanguage, Language } from "./language-select";

export type ConverterFormProps = {
  currencies: Currency[];
  state: FormState;
  fromChange: (field: FormField) => void;
  toCurrencyChange: (currencyCode: CurrencyCode) => void;
  toAmountChange: (amount: number | undefined) => void;
  onSwap: (formState: FormState) => void;
};

export default function ConverterForm({
  currencies,
  state,
  fromChange,
  toCurrencyChange,
  toAmountChange,
  onSwap,
}: ConverterFormProps) {
  const [separators, setSeparators] = React.useState<Separators>(
    detectSeparators(defaultLanguage.code)
  );

  const [language, setLanguage] = React.useState<Language | null>(
    defaultLanguage
  );

  const changeLanguage = (language: Language | null) => {
    setLanguage(language);
    setSeparators(detectSeparators((language || defaultLanguage).code));
  };

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
    <Stack alignItems="center" spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        width="70%"
        alignItems="center"
        justifyContent="stretch"
      >
        <Stack gap={3} flex={1} width={{ xs: "100%" }}>
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
            separators={separators}
          />
        </Stack>
        <IconButton
          aria-label="Swap"
          onClick={() => onSwap({ from: state.to, to: state.from })}
        >
          <SwapHoriz fontSize="large" />
        </IconButton>
        <Stack gap={3} flex={1} width={{ xs: "100%" }}>
          <CurrencySelect
            currencies={currencies}
            value={toCurrency}
            onChange={(currency) => toCurrencyChange(currency.code)}
          />
          <AmountInput
            value={state.to.amount}
            onChange={toAmountChange}
            precision={toCurrency.precision}
            separators={separators}
          />
        </Stack>
      </Stack>
      <Stack width="70%">
        <FormGroup>
          <LanguageSelect
            label="Number formatting"
            size="small"
            language={language}
            onChange={changeLanguage}
          />
          <FormHelperText>
            Try to change number formatting if you are not able to type in the
            decimal separator using your keyboard
          </FormHelperText>
        </FormGroup>
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
  amount: number | undefined;
};

export function initFormState(currencyCode: CurrencyCode): FormState {
  return {
    from: { currencyCode, amount: 1 },
    to: { currencyCode, amount: 1 },
  };
}
