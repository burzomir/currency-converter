import Converter from "@/components/converter";
import { Currency, currencyCodeFromString } from "@/types";
import { Stack } from "@mui/material";
import assert from "assert";

export default async function Home() {
  const currencies = await fetchCurrencies();
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Converter currencies={currencies} />
    </Stack>
  );
}

async function fetchCurrencies() {
  const url = new URL("https://api.currencybeacon.com/v1/currencies");
  assert(
    process.env.CURRENCY_BEACON_API_KEY,
    "CURRENCY_BEACON_API_KEY is not set"
  );
  url.searchParams.append("api_key", process.env.CURRENCY_BEACON_API_KEY);
  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
  const json = await response.json();
  const currencies: Currency[] = json.response.map((data: any) => ({
    code: currencyCodeFromString(data.short_code),
    name: data.name,
  }));
  return currencies;
}
