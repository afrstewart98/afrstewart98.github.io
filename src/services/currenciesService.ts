export interface Currencies {
  [key: string]: string;
}

export function getCurrencies() {
  return fetch("https://openexchangerates.org/api/currencies.json")
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}