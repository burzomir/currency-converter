import { Currency, CurrencyCode, currencyCodeFromString } from "@/types";
import { CurrencyService } from ".";

export class DevelopmentCurrencyService implements CurrencyService {
  async getCurrencies(): Promise<Currency[]> {
    return [
      { code: currencyCodeFromString("EUR"), name: "Euro" },
      { code: currencyCodeFromString("USD"), name: "US Dollar" },
      { code: currencyCodeFromString("PLN"), name: "Zloty" },
    ];
  }
  async convert(data: {
    from: CurrencyCode;
    to: CurrencyCode;
    amount: number;
  }): Promise<{ value: number }> {
    return { value: data.amount * rates[data.from][data.to] };
  }
}

const rates: { [key: string]: { [key: string]: number } } = {
  EUR: { EUR: 1, USD: 1.1, PLN: 4.3 },
  USD: { EUR: 1 / 1.1, USD: 1, PLN: 3.7 },
  PLN: { EUR: 1 / 4.3, USD: 1 / 3.7, PLN: 1 },
};
