import { Currency } from "@/types";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { useCallback, useId } from "react";

export type CurrencySelectProps = {
  currencies: Currency[];
  value: Currency;
  onChange: (value: Currency) => void;
};

export default function CurrencySelect({
  currencies,
  value,
  onChange,
}: CurrencySelectProps) {
  const id = useId();
  const onChange_ = useCallback(
    (_: unknown, value: Currency) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <Autocomplete
      options={currencies}
      value={value}
      onChange={onChange_}
      getOptionLabel={getOptionLabel}
      getOptionKey={getOptionKey}
      renderInput={renderInput}
      id={id}
      disableClearable
      disablePortal
      size="small"
    />
  );
}

function getOptionLabel({ code, name }: Currency) {
  return `${code} - ${name}`;
}

function getOptionKey({ code }: Currency) {
  return code;
}

function renderInput(params: AutocompleteRenderInputParams) {
  return <TextField {...params} label="Currency" />;
}
