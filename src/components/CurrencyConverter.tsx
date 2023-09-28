import Card from "@mui/material/Card";
import InputValue from "./InputValue";
import CountrySelector from "./CountrySelector";
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

  return (
    <Card sx={{ width: 500 }}>
      <CardHeader title="Currency Converter" />
      <CardContent>
        <InputValue
          onInputValueChange={setInputValue}
          onDisabledChange={setDisabled}
        />
        <CountrySelector onCountryChange={setConvertFrom} />
        <CountrySelector onCountryChange={setConvertTo} />
      </CardContent>
      <CardActions>
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
