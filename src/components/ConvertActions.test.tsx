import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConvertActions, { CONVERT_BUTTON_TEXT } from "./ConvertActions";
import * as ratesService from "../services/ratesService";
 
describe("ConvertActions", () => {
  const inputValue = 1000;
  const convertTo = "EUR";
  const convertFrom = "GBP";

  let disabled: boolean;

  beforeEach(() => {
    disabled = false;
    jest.spyOn(ratesService, "getRates").mockReturnValue(
      Promise.resolve({
        rates: {
          GBP: "1",
          EUR: "1.2",
        },
      })
    );
  });

  describe("Initial appearance", () => {
    it("should have an enabled conversion button", () => {
      renderConvertActions();
      expect(getConvertButton()).toBeEnabled();
    });
  });

  describe("Initial appearance when disabled is true", () => {
    it("should have a disabled conversion button", () => {
      disabled = true;
      renderConvertActions();
      expect(getConvertButton()).toBeDisabled();
    });
  });

  describe("Appearance after conversion", () => {
    beforeEach(() => {
      renderConvertActions();
      clickConvertButton();
    });

    it("should have a conversion button", () => {
      expect(getConvertButton()).toBeInTheDocument();
    });

    it("should have a the correct conversion text", async () => {
      await waitFor(() => {
        expect(
          screen.getByText("1000 GBP is equivalent to 1200 EUR")
        ).toBeInTheDocument();
      });
    });

    it("should have a timer displayed", () => {
      expect(getCountdownTimer()).toBeInTheDocument();
    });
  });

  function renderConvertActions() {
    render(
      <ConvertActions
        inputValue={inputValue}
        convertTo={convertTo}
        convertFrom={convertFrom}
        disabled={disabled}
      />
    );
  }

  function getConvertButton() {
    return screen.getByTestId("convert-button");
  }

  function clickConvertButton() {
    return userEvent.click(getConvertButton());
  }

  function getCountdownTimer() {
    return screen.getByTestId("countdown-timer");
  }
});
