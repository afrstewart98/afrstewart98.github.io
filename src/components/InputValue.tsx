import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useState } from "react";

interface InputValueProps {
  onInputValueChange: (value: number) => void;
  onDisabledChange: (value: boolean) => void;
}

export default function InputValue({
  onInputValueChange,
  onDisabledChange,
}: InputValueProps) {
  const [error, setError] = useState<string>("");

  const handleTextChange = (newText: string) => {
    const validatedInput = validateInput(newText);
    setError(validateInput(newText));
    onDisabledChange(validatedInput ? true : false);
    onInputValueChange(parseFloat(newText));
  };

  const handleSwitchConversion = ()=>{
    
  }

  return (
    <TextField
      required
      id="Value Input"
      label="Amount"
      onChange={(e) => handleTextChange(e.target.value)}
      helperText={error}
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="switch currency conversion"
              onClick={handleSwitchConversion}
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
