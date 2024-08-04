import { Currency, CurrencyCode } from "@/types";

export interface CurrencyService {
  getCurrencies(): Promise<Currency[]>;
  convert(data: {
    from: CurrencyCode;
    to: CurrencyCode;
    amount: number;
  }): Promise<{ value: number }>;
}
