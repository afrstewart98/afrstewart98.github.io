import Card from "@mui/material/Card";
import InputValue from "./InputValue";
import CurrencySelector from "./CurrencySelector";
import ConvertActions from "./ConvertActions";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useState } from "react";
import CardHeader from "@mui/material/CardHeader";

export default function CurrencyConverter() {
  const [convertTo, setConvertTo] = useState<string>("EUR");
  const [convertFrom, setConvertFrom] = useState<string>("GBP");
  const [inputValue, setInputValue] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleCurrencySwitch = () => {
    setConvertFrom(convertTo);
    setConvertTo(convertFrom);
  };

  return (
    <Card sx={{ minWidth: 500 }}>
      <CardHeader title="Currency Converter" />
      <CardContent>
        <InputValue
          onInputValueChange={setInputValue}
          onDisabledChange={setDisabled}
          handleCurrencySwitch={handleCurrencySwitch}
        />
        <CurrencySelector
          onCurrencyChange={setConvertFrom}
          currency={convertFrom}
        />
        <CurrencySelector onCurrencyChange={setConvertTo} currency={convertTo} />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <ConvertActions
          inputValue={inputValue}
          convertTo={convertTo}
          convertFrom={convertFrom}
          disabled={disabled}
        />
      </CardActions>
    </Card>
  );
}
