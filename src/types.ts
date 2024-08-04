export type Currency = {
  code: CurrencyCode;
  name: string;
};

export type CurrencyCode = string & { brand: "CurrencyCode" };

export function currencyCodeFromString(code: string) {
  return code as CurrencyCode;
}
