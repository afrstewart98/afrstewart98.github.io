import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as ratesService from "../services/ratesService";
import ConvertActions from "./ConvertActions";

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
    describe("when disabled is true", () => {
      it("should have a disabled conversion button", () => {
        disabled = true;
        renderConvertActions();
        expect(getConvertButton()).toBeDisabled();
      });
    });

    describe("when disabled is false", () => {
      it("should have an enabled conversion button", () => {
        renderConvertActions();
        expect(getConvertButton()).toBeEnabled();
      });
    });

    it("should not have a conversion result displayed", () => {
      expect(screen.queryByTestId("conversion-result")).not.toBeInTheDocument();
    });

    it("should not have a timer displayed", () => {
      expect(screen.queryByTestId("countdown-timer")).not.toBeInTheDocument();
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

    it("should have a conversion result", () => {
      expect(getConversionResult()).toBeInTheDocument();
    });

    it("should have a the correct conversion text", async () => {
      expect(getConversionResult()).toHaveTextContent(
        "1000 GBP is equivalent to 1200 EUR"
      );
    });

    it("should have a timer displayed", () => {
      expect(getCountdownTimer()).toBeInTheDocument();
    });

    it("should start the timer at 10 minutes", () => {
      expect(getCountdownTimer()).toHaveTextContent("Expires in 10:00");
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

  function getConversionResult() {
    return screen.getByTestId("conversion-result");
  }

  function getCountdownTimer() {
    return screen.getByTestId("countdown-timer");
  }
});
