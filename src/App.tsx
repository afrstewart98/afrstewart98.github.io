import Box from "@mui/material/Box";

import CurrencyConverter from "./components/CurrencyConverter";

export default function App() {
  return (
    <Box className="App" display="flex" alignItems="center" padding={5} gap={2} flexDirection="column">
      <CurrencyConverter/>
      <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
    </Box>
  );
}
