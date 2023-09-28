import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface ConvertButtonProps {
  inputValue: number;
  conversionValue: number;
  convertTo: string;
  convertFrom: string;
}

export default function ConversionResult({
  inputValue,
  conversionValue,
  convertTo,
  convertFrom,
}: ConvertButtonProps) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <>
          <h1>
            {" "}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
          <Typography>
          {`${inputValue} ${convertFrom} is equivalent to ${conversionValue} ${convertTo}`}
        </Typography>
        </>
      )}
    </div>
  );
}
