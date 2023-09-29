import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InputValue, { INPUT_LABEL } from "./InputValue";
 
describe("InputValue", () => {
  let onInputValueChange: (value: number) => void;
  let onDisabledChange: (value: boolean) => void;
  let handleCurrencySwitch: () => void;

  beforeEach(() => {
    onInputValueChange = jest.fn();
    onDisabledChange = jest.fn();
    handleCurrencySwitch = jest.fn();

    renderInputValue();
  });

  describe("Initial appearance", () => {
    it("should be present", () => {
      expect(getInputTextField()).toBeInTheDocument();
    });

    it("should have a title", () => {
      expect(screen.getByText(INPUT_LABEL)).toBeInTheDocument();
    });

    it("should be empty", () => {
      expect(getInputTextField()).toHaveValue("");
    });

    it("should have an icon button to switch currencies", () => {
      expect(getSwitchCurrenciesButton()).toBeInTheDocument();
    });
  });

  describe("Data entry", () => {
    it("should allow the user to enter text", () => {
      enterInputText("301");
      expect(getInputTextField()).toHaveValue("301");
    });

    it("should update the current input value with new text correctly parsed to an integer", () => {
      enterInputText("8");
      expect(onInputValueChange).toHaveBeenCalledWith(8);
    });

    it("should update the current input value with new text attempted to be parsed to an integer", () => {
      enterInputText("R");
      expect(onInputValueChange).toHaveBeenCalledWith(NaN);
    });

    it("should notify the disabled status if the input fails validation", () => {
      enterInputText("U");
      expect(onDisabledChange).toHaveBeenCalledWith(true);
    });

    it("should notify the disabled status if the input passes validation", () => {
      enterInputText("1");
      expect(onDisabledChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Currency switch button", () => {
    it("should call handleCurrencySwitch when clicked", () => {
        userEvent.click(getSwitchCurrenciesButton())
      expect(handleCurrencySwitch).toBeCalled();
    });
  });

  describe("Validation", () => {
    it("to not show validation criteria when input is correct", () => {
      enterInputText("120.20");
      expect(
        screen.queryByText("120.20 is not a valid number")
      ).not.toBeInTheDocument();
    });

    it("to show validation criteria when input is incorrect", () => {
      enterInputText("Not a number");
      expect(
        screen.getByText("Not a number is not a valid number")
      ).toBeInTheDocument();
    });
  });

  function renderInputValue() {
    render(
      <InputValue
        onInputValueChange={onInputValueChange}
        onDisabledChange={onDisabledChange}
        handleCurrencySwitch={handleCurrencySwitch}
      />
    );
  }

  function getInputTextField() {
    return screen.getByRole("textbox");
  }

  function enterInputText(text = "400.44") {
    return userEvent.type(getInputTextField(), text);
  }

  function getSwitchCurrenciesButton() {
    return screen.getByRole("button", {
      name: /switch-currency-conversion/i,
    });
  }
});
