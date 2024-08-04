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
  const fromOnChange = async (from: FormField) => {
    clearTimeout(requestRef.current);
    setFormState((formState) =>
      produce(formState, (draft) => {
        draft.from = from;
      })
    );
    const data = {
      from: from.currencyCode,
      to: formState.to.currencyCode,
      amount: from.amount,
    };
    const response = await fetch("/api/convert", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const { value } = await response.json();
    setFormState((formState) =>
      produce(formState, (draft) => {
        draft.to.amount = value;
      })
    );
  };
  const toOnChange = async (to: FormField) => {
    setFormState((formState) =>
      produce(formState, (draft) => {
        draft.to = to;
      })
    );
    const data = {
      from: to.currencyCode,
      to: formState.from.currencyCode,
      amount: to.amount,
    };
    const response = await fetch("/api/convert", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const { value } = await response.json();
    setFormState((formState) =>
      produce(formState, (draft) => {
        draft.from.amount = value;
      })
    );
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
