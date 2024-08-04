import { Currency, CurrencyCode, currencyCodeFromString } from "@/types";
import { CurrencyService } from ".";

const delay = (() => {
  try {
    const v = process.env.DEVELOPMENT_CURRENCY_SERVICE_DELAY!;
    return parseInt(v, 10);
  } catch (_) {
    return 0;
  }
})();

const fail = (() => {
  try {
    const v = process.env.DEVELOPMENT_CURRENCY_SERVICE_FAIL!;
    return v.split(",");
  } catch (_) {
    return [];
  }
})();

export class DevelopmentCurrencyService implements CurrencyService {
  async getCurrencies(): Promise<Currency[]> {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
    if (fail.includes("currencies")) {
      throw new Error("");
    }
    return [
      { code: currencyCodeFromString("EUR"), name: "Euro", precision: 2 },
      { code: currencyCodeFromString("USD"), name: "US Dollar", precision: 2 },
      { code: currencyCodeFromString("PLN"), name: "Zloty", precision: 2 },
    ];
  }
  async convert(data: {
    from: CurrencyCode;
    to: CurrencyCode;
    amount: number;
  }): Promise<{ value: number }> {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
    if (fail.includes("convert")) {
      throw new Error("");
    }
    return { value: data.amount * rates[data.from][data.to] };
  }
}

const rates: { [key: string]: { [key: string]: number } } = {
  EUR: { EUR: 1, USD: 1.1, PLN: 4.3 },
  USD: { EUR: 1 / 1.1, USD: 1, PLN: 3.7 },
  PLN: { EUR: 1 / 4.3, USD: 1 / 3.7, PLN: 1 },
};
