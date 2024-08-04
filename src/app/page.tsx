import Converter from "@/components/converter";
import { Stack } from "@mui/material";
import { currencyService } from "./services";

export default async function Home() {
  const currencies = await currencyService.getCurrencies();
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Converter currencies={currencies} />
    </Stack>
  );
}
