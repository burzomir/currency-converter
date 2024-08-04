import { Currency, CurrencyCode } from "@/types";

export interface CurrencyService {
  getCurrencies(): Promise<Currency[]>;
  // eslint-disable-next-line
  convert(data: {
    from: CurrencyCode;
    to: CurrencyCode;
    amount: number;
  }): Promise<{ value: number }>;
}
