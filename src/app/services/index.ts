import { CurrencyService } from "./currency";
import { CurrencyBeaconCurrencyService } from "./currency/currency-beacon";
import { DevelopmentCurrencyService } from "./currency/development";

export const currencyService: CurrencyService = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return new DevelopmentCurrencyService();
    case "production":
      return new CurrencyBeaconCurrencyService();
    default:
      throw new Error("CurrencyService not configured");
  }
})();
