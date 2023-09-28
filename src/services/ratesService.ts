export interface Rates {
  [key:string]: number
}

export function getRates(convertFrom: string) {
    return fetch(`https://api.exchangerate-api.com/v4/latest/${convertFrom}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }