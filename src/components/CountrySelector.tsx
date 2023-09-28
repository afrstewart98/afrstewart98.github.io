import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Countries, getCountries } from "../services/countriesService";

interface CountrySelectorProps {
  onCountryChange: (value: string) => void;
}

export default function CountrySelector({
  onCountryChange,
}: CountrySelectorProps) {
  const [countries, setCountries] = useState<Countries>({});
  const [country, setCountry] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
    onCountryChange(event.target.value as string);
  };

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  return (
    <Box marginTop={4}>
      <FormControl fullWidth>
        <InputLabel id="currency-selector-label">Country</InputLabel>
        <Select
          labelId="currency-selector-label"
          id="currency-selector"
          value={country}
          label="Country"
          onChange={handleChange}
          fullWidth={true}
        >
          {Object.keys(countries).map((key) => {
            const flagCode = key.slice(0, -1).toLowerCase();
            return (
              <MenuItem key={key} value={key}>
                <img
                  src={`https://flagcdn.com/16x12/${flagCode}.png`}
                  width="16"
                  height="12"
                  alt={`${flagCode} flag`}
                />
                {key}/{countries[key]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
