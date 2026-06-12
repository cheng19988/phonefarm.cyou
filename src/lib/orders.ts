import { PAYMENT } from "./constants";
import { computeUsdtChargeAmount } from "./payment-status";

export function generateOrderNumber() {
  return `CY${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function orderExpiryDate() {
  return new Date(Date.now() + PAYMENT.expiryMinutes * 60 * 1000);
}

export { computeUsdtChargeAmount };

export type TronVerifyResult = {
  verified: boolean;
  receivedAmount?: number;
  txHash?: string;
  message: string;
};

/** Placeholder for TronGrid / Tronscan — never auto-mark paid without API confirmation */
export async function verifyTronUsdtPayment(params: {
  address: string;
  expectedAmount: number;
  since: Date;
  txHash?: string | null;
}): Promise<TronVerifyResult> {
  void params;
  const apiKey = process.env.TRON_API_KEY;
  if (!apiKey) {
    return {
      verified: false,
      message:
        "Automated on-chain verification is not enabled. Payment requires manual confirmation after tx hash submission.",
    };
  }
  return {
    verified: false,
    message: "Automated verification not yet implemented for this API key.",
  };
}
