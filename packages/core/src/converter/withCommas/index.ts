export function withCommas(amount: number | string): string {
  const amountStr = typeof amount === "number" ? amount.toString() : amount;
  const [integerPart, decimalPart] = amountStr.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
