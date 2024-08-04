"use client";

import { Currency, CurrencyCode } from "@/types";
import ConverterForm, {
  FormField,
  FormState,
  initFormState,
} from "./converter-form";
import { useEffect, useRef, useState } from "react";
import { produce } from "immer";

export type ConverterProps = {
  currencies: Currency[];
};

// eslint-disable-next-line
enum Debounce {
  Debounce,
  // eslint-disable-next-line
  NoDebounce,
}

export default function Converter(props: ConverterProps) {
  const initialFormState = initFormState(props.currencies[0].code);
  const [formState, setFormState] = useState(initialFormState);
  const requestIdRef = useRef<string>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const convert = (
    data: Data,
    // eslint-disable-next-line
    apply: (value: number) => FormState,
    // eslint-disable-next-line
    debounce: Debounce
  ) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      async () => {
        let requestId = crypto.randomUUID();
        requestIdRef.current = requestId;
        const value = await requestConversion(data);
        if (requestIdRef.current !== requestId) {
          return;
        }
        const newState = apply(value);
        setFormState(newState);
      },
      (() => {
        switch (debounce) {
          case Debounce.Debounce:
            return 300;
          case Debounce.NoDebounce:
            return 0;
        }
      })()
    );
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
    const currencyCodeChanged =
      formState.from.currencyCode !== newState.from.currencyCode;
    convert(
      data,
      finalize,
      currencyCodeChanged ? Debounce.NoDebounce : Debounce.Debounce
    );
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
    convert(data, finalize, Debounce.NoDebounce);
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
    convert(data, finalize, Debounce.Debounce);
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
