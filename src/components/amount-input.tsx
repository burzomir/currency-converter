import { useSeparators } from "@/hooks";
import { TextField } from "@mui/material";
import { useCallback, useId } from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";

export type AmountInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function AmountInput({ onChange, value }: AmountInputProps) {
  const id = useId();
  const { thousandSeparator, decimalSeparator } = useSeparators();
  const onChange_ = useCallback(
    (value: NumberFormatValues) => {
      onChange(value.floatValue || 0);
    },
    [onChange]
  );
  return (
    <NumericFormat
      customInput={TextField}
      id={id}
      label="Amount"
      allowNegative={false}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      value={value}
      onValueChange={onChange_}
    />
  );
}