import { PAYMENT } from "./constants";

export function generateOrderNumber() {
  return `CY${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function orderExpiryDate() {
  return new Date(Date.now() + PAYMENT.expiryMinutes * 60 * 1000);
}

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
        "TRON_API_KEY not configured. Payment verification pending manual or future API integration.",
    };
  }
  return {
    verified: false,
    message: "Automated verification not yet implemented for this API key.",
  };
}
