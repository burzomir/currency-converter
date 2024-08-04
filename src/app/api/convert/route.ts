import { currencyService } from "@/app/services";

export async function POST(request: Request) {
  const { from = "", to = "", amount = 0 } = await request.json();
  const { value } = await currencyService.convert({ from, to, amount });
  return Response.json({ value });
}
