import { useSeparators } from "@/hooks";
import { TextField } from "@mui/material";
import { useCallback, useId } from "react";
import {
  NumberFormatValues,
  NumericFormat,
  SourceInfo,
} from "react-number-format";

export type AmountInputProps = {
  value: number;
  // eslint-disable-next-line
  onChange: (value: number) => void;
};

export default function AmountInput({ onChange, value }: AmountInputProps) {
  const id = useId();
  const { thousandSeparator, decimalSeparator } = useSeparators();
  const onChange_ = useCallback(
    ({ floatValue }: NumberFormatValues, sourceInfo: SourceInfo) => {
      if (sourceInfo.source === "prop") {
        return;
      }
      onChange(floatValue || 0);
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
      decimalScale={4}
    />
  );
}
