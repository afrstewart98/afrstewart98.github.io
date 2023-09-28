import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Currencies, getCurrencies } from "../services/currenciesService";

export const CURRENCY_LABEL: string = "Currency";

interface CurrencySelectorProps {
  onCurrencyChange: (value: string) => void;
  currency: string;
}

export default function CurrencySelector({
  onCurrencyChange,
  currency,
}: CurrencySelectorProps) {
  const [currencies, setCurrencies] = useState<Currencies>({});

  const handleChange = (event: SelectChangeEvent) => {
    onCurrencyChange(event.target.value as string);
  };

  useEffect(() => {
    getCurrencies().then((res) => {
      setCurrencies(res);
    });
  }, [currency]);

  return (
    <Box marginTop={4}>
      <FormControl fullWidth>
        <InputLabel id="currency-selector-label">Currency</InputLabel>
        <Select
          labelId="currency-selector-label"
          id="currency-selector"
          value={currency}
          onChange={handleChange}
          fullWidth={true}
        >
          {Object.keys(currencies).map((key) => {
            const flagCode = key.slice(0, -1).toLowerCase();
            return (
              <MenuItem key={key} value={key}>
                <img
                  src={`https://flagcdn.com/16x12/${flagCode}.png`}
                  width="16"
                  height="12"
                  alt={`${flagCode} flag`}
                />
                {key}/{currencies[key]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
