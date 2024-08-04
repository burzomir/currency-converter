export type Currency = {
  code: CurrencyCode;
  name: string;
  precision: number;
};

/**
 * Helps to prevent accidental misuse of the code property
 */
export type CurrencyCode = string & { brand: "CurrencyCode" };

export function currencyCodeFromString(code: string) {
  return code as CurrencyCode;
}
