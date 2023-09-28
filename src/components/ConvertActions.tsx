import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Rates, getRates } from "../services/ratesService";
import { Box, Typography } from "@mui/material";

interface ConvertButtonProps {
  inputValue: number;
  convertTo: string;
  convertFrom: string;
  disabled: boolean;
}

const CONVERT_BUTTON_TEXT: string = "Convert";

export default function ConvertActions({
  inputValue,
  convertTo,
  convertFrom,
  disabled,
}: ConvertButtonProps) {
  const [rates, setRates] = useState<Rates>({});
  const [initialInputValue, setInitialInputValue] =
    useState<number>(inputValue);
  const [conversionValue, setConversionValue] = useState<number>(0);

  useEffect(() => {
    getRates(convertFrom).then((res) => {
      setRates(res.rates);
    });
  }, [convertFrom]);

  const handleConversion = () => {
    const roundedConversion = (inputValue * rates[convertTo]).toFixed(2);
    setInitialInputValue(inputValue);
    setConversionValue(Number(roundedConversion));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {conversionValue ? (
        <>
        <Box>
        <Typography>
          {`Expires in`}
        </Typography>
        </Box>
        <Typography>
          {`${initialInputValue} ${convertFrom} is equivalent to ${conversionValue} ${convertTo}`}
        </Typography>
        </>
      ) : undefined}
      <Button onClick={handleConversion} disabled={disabled}>
        {CONVERT_BUTTON_TEXT}
      </Button>
    </Box>
  );
}
