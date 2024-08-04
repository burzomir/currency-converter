export type Currency = {
  code: CurrencyCode;
  name: string;
  precision: number;
};

export type CurrencyCode = string & { brand: "CurrencyCode" };

export function currencyCodeFromString(code: string) {
  return code as CurrencyCode;
}
