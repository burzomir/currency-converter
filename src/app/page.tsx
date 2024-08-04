import Converter from "@/components/converter";
import { currencyService } from "./services";

export default async function Home() {
  const currencies = await currencyService.getCurrencies();
  return <Converter currencies={currencies} />;
}
