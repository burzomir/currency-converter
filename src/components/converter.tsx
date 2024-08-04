"use client";

import { Currency } from "@/types";
import { CurrencyExchange } from "@mui/icons-material";
import { Stack } from "@mui/material";
import {
  bindActionCreators,
  createSlice as createReduxSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useMemo, useReducer } from "react";
import CurrencySelect from "./currency-select";
import AmountInput from "./amount-input";

export type ConverterProps = {
  currencies: Currency[];
};

export default function Converter({ currencies }: ConverterProps) {
  const [state, actions] = useState(currencies[0]);
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={3}
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Stack gap={3}>
        <CurrencySelect
          currencies={currencies}
          value={state.from.currency}
          onChange={actions.setCurrencyFrom}
        />
        <AmountInput
          value={state.from.amount}
          onChange={actions.setAmountFrom}
        />
      </Stack>
      <CurrencyExchange fontSize="large" color="info" />
      <Stack gap={3}>
        <CurrencySelect
          currencies={currencies}
          value={state.to.currency}
          onChange={actions.setCurrencyTo}
        />
        <AmountInput value={state.to.amount} onChange={actions.setAmountTo} />
      </Stack>
    </Stack>
  );
}

type State = {
  from: { currency: Currency; amount: number };
  to: { currency: Currency; amount: number };
};

function useState(currency: Currency) {
  const { actions, reducer, getInitialState } = useMemo(
    () => createSlice(currency),
    // Currency is a default value required for slice creation
    // eslint-disable-next-line
    []
  );
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const actions_ = useMemo(
    () => bindActionCreators(actions, dispatch as any),
    [actions, dispatch]
  );
  return [state, actions_] as const;
}

function createSlice(currency: Currency) {
  const initialState = createInitialState(currency);
  return createReduxSlice({ name: "converter", initialState, reducers });
}

function createInitialState(currency: Currency): State {
  return {
    from: { currency, amount: 0 },
    to: { currency, amount: 0 },
  };
}

const reducers = {
  setCurrencyFrom: (state: State, action: PayloadAction<Currency>) => {
    state.from.currency = action.payload;
  },
  setAmountFrom: (state: State, action: PayloadAction<number>) => {
    state.from.amount = action.payload;
  },
  setCurrencyTo: (state: State, action: PayloadAction<Currency>) => {
    state.to.currency = action.payload;
  },
  setAmountTo: (state: State, action: PayloadAction<number>) => {
    state.to.amount = action.payload;
  },
};
