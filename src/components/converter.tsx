"use client";

import { Currency } from "@/types";
import ConverterForm, { FormField, initFormState } from "./converter-form";
import { useRef, useState } from "react";
import { produce } from "immer";

export type ConverterProps = {
  currencies: Currency[];
};

export default function Converter(props: ConverterProps) {
  const initialFormState = initFormState(props.currencies[0].code);
  const [formState, setFormState] = useState(initialFormState);
  const requestRef = useRef<ReturnType<typeof setTimeout>>();
  const fromOnChange = (from: FormField) => {
    clearTimeout(requestRef.current);
    setFormState((formState) =>
      produce(formState, (draft) => {
        draft.from = from;
      })
    );
    requestRef.current = setTimeout(() => {
      setFormState((formState) =>
        produce(formState, (draft) => {
          draft.to.amount = formState.from.amount * 2;
        })
      );
    }, 1000);
  };
  const toOnChange = (to: FormField) => {
    clearTimeout(requestRef.current);
    setFormState((formState) =>
      produce(formState, (draft) => {
        draft.to = to;
      })
    );
    requestRef.current = setTimeout(() => {
      setFormState((formState) =>
        produce(formState, (draft) => {
          draft.from.amount = formState.to.amount * 2;
        })
      );
    }, 1000);
  };
  return (
    <ConverterForm
      currencies={props.currencies}
      state={formState}
      fromOnChange={fromOnChange}
      toOnChange={toOnChange}
    />
  );
}
