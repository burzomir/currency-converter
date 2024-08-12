import { Currency, CurrencyCode, currencyCodeFromString } from "@/types";
import assert from "assert";
import { CurrencyService } from ".";
import { z } from "zod";

export class CurrencyBeaconCurrencyService implements CurrencyService {
  private apiKey: string;
  constructor() {
    assert(
      process.env.CURRENCY_BEACON_API_KEY,
      "CURRENCY_BEACON_API_KEY is not set"
    );
    this.apiKey = process.env.CURRENCY_BEACON_API_KEY;
  }

  async getCurrencies(): Promise<Currency[]> {
    const url = new URL("https://api.currencybeacon.com/v1/currencies");
    url.searchParams.append("api_key", this.apiKey);
    const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    const json = await response.json();
    const data = currenciesResponseSchema.parse(json);
    const currencies: Currency[] = data.response.map((data) => ({
      code: currencyCodeFromString(data.short_code),
      name: data.name,
      precision: data.precision,
    }));
    return currencies;
  }
  async convert(data: {
    from: CurrencyCode;
    to: CurrencyCode;
    amount: number;
  }): Promise<{ value: number }> {
    const url = new URL("https://api.currencybeacon.com/v1/convert");
    url.searchParams.append("api_key", this.apiKey);
    url.searchParams.append("from", data.from);
    url.searchParams.append("to", data.to);
    url.searchParams.append("amount", data.amount.toString(10));
    const response = await fetch(url);
    const json = await response.json();
    const responseData = convertResponseSchema.parse(json);
    return { value: responseData.response.value };
  }
}

const currenciesResponseSchema = z.object({
  response: z.array(
    z.object({
      short_code: z.string(),
      name: z.string(),
      precision: z.number(),
    })
  ),
});

const convertResponseSchema = z.object({
  response: z.object({
    value: z.number(),
  }),
});
