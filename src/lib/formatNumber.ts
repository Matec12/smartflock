import { replace } from "lodash";
import numeral from "numeral";

export const fCurrency = (number: number | string) => {
  // return numeral(number).format(Number.isInteger(number) ? '#0,0' : '#0,0.00');
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(Number(number || 0));
};

export const fPercent = (number: number) => {
  return numeral(number / 100).format("0.0%");
};

export const fNumber = (number: number) => {
  return numeral(number).format();
};

export const fShortenNumber = (number: number) => {
  return replace(numeral(number).format("0.00a"), ".00", "");
};

export const fData = (number: number) => {
  return numeral(number).format("0.0 b");
};

export const convertUnix = (unix: number) => {
  if (unix) {
    const now = new Date(unix * 1000);
    return now.toDateString();
  }
  return "N/A";
};
