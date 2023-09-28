export interface Countries {
  [key: string]: string;
}

export function getCountries() {
  return fetch("https://openexchangerates.org/api/currencies.json")
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}