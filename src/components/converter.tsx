"use client";

import { Currency, CurrencyCode } from "@/types";
import ConverterForm, {
  FormField,
  FormState,
  initFormState,
} from "./converter-form";
import { useRef, useState } from "react";
import { produce } from "immer";

export type ConverterProps = {
  currencies: Currency[];
};

export default function Converter(props: ConverterProps) {
  const initialFormState = initFormState(props.currencies[0].code);
  const [formState, setFormState] = useState(initialFormState);
  const requestIdRef = useRef<string>();

  const convert = async (
    data: Data,
    // eslint-disable-next-line
    apply: (value: number) => FormState
  ) => {
    let requestId = crypto.randomUUID();
    requestIdRef.current = requestId;
    const value = await requestConversion(data);
    if (requestIdRef.current !== requestId) {
      return;
    }
    const newState = apply(value);
    setFormState(newState);
  };

  const fromChange = async (from: FormField) => {
    const newState = produce(formState, (draft) => {
      draft.from = from;
    });
    setFormState(newState);
    const data = {
      from: newState.from.currencyCode,
      to: newState.to.currencyCode,
      amount: newState.from.amount,
    };
    const finalize = (value: number) =>
      produce(newState, (draft) => {
        draft.to.amount = value;
      });
    convert(data, finalize);
  };

  const toCurrencyChange = async (currencyCode: CurrencyCode) => {
    const newState = produce(formState, (draft) => {
      draft.to.currencyCode = currencyCode;
    });
    setFormState(newState);
    const data = {
      from: newState.from.currencyCode,
      to: newState.to.currencyCode,
      amount: newState.from.amount,
    };
    const finalize = (value: number) =>
      produce(newState, (draft) => {
        draft.to.amount = value;
      });
    convert(data, finalize);
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
    const finalize = (value: number) =>
      produce(newState, (draft) => {
        draft.from.amount = value;
      });
    convert(data, finalize);
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

type Data = {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: number;
};

async function requestConversion(data: Data): Promise<number> {
  const response = await fetch("/api/convert", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const { value } = await response.json();
  return value;
}
