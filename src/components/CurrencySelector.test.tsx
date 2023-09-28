import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencySelector from "./CurrencySelector";
import * as currenciesService from "../services/currenciesService";

describe("CurrencySelector", () => {
  let onCurrencyChange: (value: string) => void;
  let currency: string;

  beforeEach(() => {
    onCurrencyChange = jest.fn();
    currency = "";

    jest.spyOn(currenciesService, "getCurrencies").mockReturnValue(
      Promise.resolve({
        GBP: "British Pound Sterling",
        EUR: "Euro",
      })
    );

    renderCurrencySelector();
  });

  describe("Initial appearance", () => {
    it("should be present", () => {
      expect(getCurrencySelector()).toBeInTheDocument();
    });

    it("should have populated the currency options", async () => {
      expect(screen.getAllByRole("option").length).toBe(2);
    });
  });

  describe("Selection", () => {
    it("should allow the user to select a currency", () => {
      selectCurrency("GBP");
      expect(screen.getByText("GBP")).toBeInTheDocument();
    });

    it("should notify of a currency change", () => {
      selectCurrency("GBP");
      expect(onCurrencyChange).toHaveBeenCalled();
    });
  });

  function renderCurrencySelector() {
    render(
      <CurrencySelector
        onCurrencyChange={onCurrencyChange}
        currency={currency}
      />
    );
  }

  function getCurrencySelector() {
    return screen.getByRole("button");
  }

  function getCurrencyOption(currencyLabel: string) {
    return screen.getByRole("option", { name: currencyLabel });
  }

  function selectCurrency(currencyToSelect = "GBP") {
    return userEvent.selectOptions(
      getCurrencySelector(),
      getCurrencyOption(currencyToSelect)
    );
  }
});
