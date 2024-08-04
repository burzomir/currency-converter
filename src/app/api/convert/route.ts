import assert from "assert";

export async function POST(request: Request) {
  const { from = "", to = "", amount = 0 } = await request.json();
  const url = new URL("https://api.currencybeacon.com/v1/convert");
  assert(
    process.env.CURRENCY_BEACON_API_KEY,
    "CURRENCY_BEACON_API_KEY is not set"
  );
  url.searchParams.append("api_key", process.env.CURRENCY_BEACON_API_KEY);
  url.searchParams.append("from", from);
  url.searchParams.append("to", to);
  url.searchParams.append("amount", amount);
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  return Response.json({ value: json.response.value });
}
