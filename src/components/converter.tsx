"use client";

import { Currency } from "@/types";
import ConverterForm, { initFormState } from "./converter-form";
import { useState } from "react";

export type ConverterProps = {
  currencies: Currency[];
};

export default function Converter(props: ConverterProps) {
  const initialFormState = initFormState(props.currencies[0].code);
  const [formState, setFormState] = useState(initialFormState);
  return (
    <ConverterForm
      currencies={props.currencies}
      state={formState}
      fromOnChange={(from) => {
        setFormState((formState) => ({ ...formState, from }));
      }}
      toOnChange={(to) => {
        setFormState((formState) => ({ ...formState, to }));
      }}
    />
  );
}
