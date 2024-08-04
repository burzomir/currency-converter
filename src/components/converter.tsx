"use client";

import { Currency, CurrencyCode } from "@/types";
import ConverterForm, { FormField, initFormState } from "./converter-form";
import { useState } from "react";
import { produce } from "immer";

export type ConverterProps = {
  currencies: Currency[];
};

export default function Converter(props: ConverterProps) {
  const initialFormState = initFormState(props.currencies[0].code);
  const [formState, setFormState] = useState(initialFormState);
  const fromChange = async (from: FormField) => {
    const newState = produce(formState, (draft) => {
      draft.from = from;
    });
    setFormState(newState);
    const value = await convert({
      from: newState.from.currencyCode,
      to: newState.to.currencyCode,
      amount: newState.from.amount,
    });
    setFormState(
      produce(newState, (draft) => {
        draft.to.amount = value;
      })
    );
  };
  const toCurrencyChange = async (currencyCode: CurrencyCode) => {
    const newState = produce(formState, (draft) => {
      draft.to.currencyCode = currencyCode;
    });
    setFormState(newState);
    const value = await convert({
      from: newState.from.currencyCode,
      to: newState.to.currencyCode,
      amount: newState.from.amount,
    });
    setFormState(
      produce(newState, (draft) => {
        draft.to.amount = value;
      })
    );
  };
  const toAmountChange = async (amount: number) => {
    const newState = produce(formState, (draft) => {
      draft.to.amount = amount;
    });
    setFormState(newState);
    const data = {
      from: newState.to.currencyCode,
      to: newState.from.currencyCode,
      amount: newState.to.amount,
    };
    const value = await convert(data);
    setFormState(
      produce(newState, (draft) => {
        draft.from.amount = value;
      })
    );
  };
  return (
    <ConverterForm
      currencies={props.currencies}
      state={formState}
      fromChange={fromChange}
      toCurrencyChange={toCurrencyChange}
      toAmountChange={toAmountChange}
    />
  );
}

async function convert(data: {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: number;
}): Promise<number> {
  const response = await fetch("/api/convert", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const { value } = await response.json();
  return value;
}
