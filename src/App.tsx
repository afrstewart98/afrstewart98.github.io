import Box from "@mui/material/Box";
import CurrencyConverter from "./components/CurrencyConverter";

export default function App() {
  return (
    <Box className="App" display="flex" justifyContent="center" padding={5}>
      <CurrencyConverter/>
      <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
    </Box>
  );
}
