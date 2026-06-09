/** Server-side USDT TRC20 payment configuration — never hardcode production address in source. */
export function getUsdtTrc20Address(): string {
  const address = process.env.USDT_TRC20_ADDRESS?.trim();
  if (!address) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[payment] USDT_TRC20_ADDRESS is not set — orders cannot receive a payment address");
    }
    return "";
  }
  return address;
}
