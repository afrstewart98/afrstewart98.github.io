import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useState } from "react";

export const INPUT_LABEL:string = "Amount"

interface InputValueProps {
  onInputValueChange: (value: number) => void;
  onDisabledChange: (value: boolean) => void;
  handleCurrencySwitch: () => void;
}

export default function InputValue({
  onInputValueChange,
  onDisabledChange,
  handleCurrencySwitch,
}: InputValueProps) {
  const [error, setError] = useState<string>("");

  const handleTextChange = (newText: string) => {
    const validatedInput = validateInput(newText);
    setError(validateInput(newText));
    onDisabledChange(validatedInput ? true : false);
    onInputValueChange(parseFloat(newText));
  };

  return (
    <TextField
      required
      id="Value Input"
      label={INPUT_LABEL}
      onChange={(e) => handleTextChange(e.target.value)}
      helperText={error}
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="switch-currency-conversion"
              onClick={handleCurrencySwitch}
              edge="end"
            >
              <CompareArrowsIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

function validateInput(input: string) {
  const regex = /^\d+(\.\d+)?$/;
  if (input) {
    return regex.test(input) ? "" : `${input} is not a valid number`;
  } else {
    return "";
  }
}
