import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

import { getRates,Rates } from "../services/ratesService";

interface ConvertActionsProps {
  inputValue: number;
  convertTo: string;
  convertFrom: string;
  disabled: boolean;
}

export const CONVERT_BUTTON_TEXT: string = "Convert";

export default function ConvertActions({
  inputValue,
  convertTo,
  convertFrom,
  disabled,
}: ConvertActionsProps) {
  const [rates, setRates] = useState<Rates>({});
  const [conversionString, setConversionString] = useState<string>("");
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
  });

  useEffect(() => {
    getRates(convertFrom).then((res) => {
      setRates(res.rates);
    });
  }, [convertFrom]);

  const handleConversion = () => {
    const roundedConversion = (inputValue * rates[convertTo]).toFixed(2);
    setConversionString(
      `${inputValue} ${convertFrom} is equivalent to ${roundedConversion} ${convertTo}`
    );
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);
    restart(time);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      {(minutes === 0 && seconds === 0) || !conversionString ? null : (
        <>
          <Typography variant="h6" data-testid="countdown-timer">{conversionString}</Typography>
          <Typography>
            {"Expires in "}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Typography>
        </>
      )}
      <Button
        variant="contained"
        onClick={handleConversion}
        disabled={disabled}
        data-testid="convert-button"
      >
        {CONVERT_BUTTON_TEXT}
      </Button>
    </Box>
  );
}
