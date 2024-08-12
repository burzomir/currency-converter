"use client";

import { Autocomplete, TextField } from "@mui/material";
import iso, { LanguageCode } from "iso-639-1";

export type LanguageSelectProps = {
  label: string;
  language: Language | null;
  onChange: (language: Language | null) => void;
  size?: "small" | "medium";
};

export type Language = {
  code: LanguageCode;
  name: string;
  nativeName: string;
};

export default function LanguageSelect(props: LanguageSelectProps) {
  const onChange = (_: unknown, value: Language | null) => {
    props.onChange(value);
  };
  return (
    <>
      <Autocomplete
        value={props.language}
        options={languages}
        getOptionKey={(language) => language.code}
        getOptionLabel={(language) =>
          language.code + " - " + language.name + " - " + language.nativeName
        }
        size={props.size}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label={props.label} />}
      />
    </>
  );
}

const languages: Language[] = iso.getLanguages(iso.getAllCodes());

const [defaultCode] = navigator.language.split("-");
export const defaultLanguage: Language = {
  code: defaultCode as LanguageCode,
  name: iso.getName(defaultCode),
  nativeName: iso.getNativeName(defaultCode),
};
