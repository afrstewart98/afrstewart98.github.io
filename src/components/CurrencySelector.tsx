import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useMemo, useState } from "react";
import { getCurrencies } from "../services/currenciesService";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export const CURRENCY_LABEL: string = "Currency";

interface CurrencySelectorProps {
  onCurrencyChange: (value: string) => void;
  currency: string;
}

interface Currency {
  code: string;
  label: string;
  flagCode: string;
}

const containsText = (text: string, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export default function CurrencySelector({
  onCurrencyChange,
  currency,
}: CurrencySelectorProps) {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [searchText, setSearchText] = useState("");

  const displayedOptions = useMemo(
    () => currencies.filter((option) => containsText(option.label, searchText)),
    [searchText]
  );

  const handleChange = (event: SelectChangeEvent) => {
    onCurrencyChange(event.target.value as string);
  };

  useEffect(() => {
    getCurrencies().then((res) => {
      const currenciesArray = Object.keys(res).map((key) => {
        return {
          code: key,
          label: res[key],
          flagCode: key.slice(0, -1).toLowerCase(),
        };
      });
      setCurrencies(currenciesArray);
    });
  }, [currency]);

  return (
    <Box marginTop={4}>
      <FormControl fullWidth>
        <InputLabel id="currency-selector-label">Currency</InputLabel>
        <Select
          MenuProps={{ autoFocus: false }}
          labelId="currency-selector-label"
          label="Currency"
          id="currency-selector"
          value={currency}
          onChange={handleChange}
          onClose={() => setSearchText("")}
          fullWidth={true}
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions.length !== 0 ? (
            displayedOptions.map((option, i) => (
              <MenuItem key={i} value={option.code}>
                <img
                  src={`https://flagcdn.com/16x12/${option.flagCode}.png`}
                  width="16"
                  height="12"
                  alt={`${option.flagCode} flag`}
                />
                {option.code}/{option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem key={0} value="No currencies found" disabled>
              No currencies found
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
