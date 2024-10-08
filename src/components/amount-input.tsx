import { Separators } from "@/hooks";
import { TextField } from "@mui/material";
import { useCallback, useId } from "react";
import {
  NumberFormatValues,
  NumericFormat,
  SourceInfo,
} from "react-number-format";

export type AmountInputProps = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  precision: number;
  separators: Separators;
};

export default function AmountInput({
  onChange,
  value,
  precision,
  separators,
}: AmountInputProps) {
  const id = useId();
  const { thousandSeparator, decimalSeparator } = separators;
  const onChange_ = useCallback(
    ({ floatValue }: NumberFormatValues, sourceInfo: SourceInfo) => {
      if (sourceInfo.source === "prop") {
        return;
      }
      onChange(floatValue);
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
      decimalScale={precision}
      inputProps={{ inputMode: "decimal" }}
      fullWidth
    />
  );
}
