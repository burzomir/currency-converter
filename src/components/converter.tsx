"use client";

import { Currency, CurrencyCode } from "@/types";
import ConverterForm, {
  FormField,
  FormState,
  initFormState,
} from "./converter-form";
import { useEffect, useRef, useState } from "react";
import { produce } from "immer";
import { Alert, Snackbar, SnackbarOrigin } from "@mui/material";

export type ConverterProps = {
  currencies: Currency[];
};

enum Debounce {
  Debounce,  
  NoDebounce,
}

export default function Converter(props: ConverterProps) {
  const [serviceUnreachable, setServiceUnreachable] = useState(false);
  const initialFormState = initFormState(props.currencies[0].code);
  const [formState, setFormState] = useState(initialFormState);
  const requestIdRef = useRef<string>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const cleanup = () => {
    requestIdRef.current = undefined;
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    return cleanup;
  }, []);

  const convert = (
    data: Data,
    
    apply: (value: number) => FormState,
    
    debounce: Debounce
  ) => {
    clearTimeout(timeoutRef.current);
    setServiceUnreachable(false);
    timeoutRef.current = setTimeout(
      async () => {
        const requestId = crypto.randomUUID();
        requestIdRef.current = requestId;
        try {
          const value = await requestConversion(data);
          if (requestIdRef.current !== requestId) {
            return;
          }
          const newState = apply(value);
          setFormState(newState);
        } catch (_) {
          setServiceUnreachable(true);
        }
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

  const onSwap = (state: FormState) => {
    cleanup();
    setFormState(state);
  };

  return (
    <>
      <ConverterForm
        currencies={props.currencies}
        state={formState}
        fromChange={fromChange}
        toCurrencyChange={toCurrencyChange}
        toAmountChange={toAmountChange}
        onSwap={onSwap}
      />
      <Snackbar open={serviceUnreachable} anchorOrigin={snackbackOrigin}>
        <Alert severity="error">Service unreachable</Alert>
      </Snackbar>
    </>
  );
}

const snackbackOrigin: SnackbarOrigin = {
  vertical: "top",
  horizontal: "center",
};

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
