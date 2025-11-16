export const config = {
  api: { bodyParser: false }
};

import { NextResponse } from "next/server";
import crypto from "crypto";
import models from "@/models";
const { cart } = models;

export async function POST(req) {
  try {
    // MUST read raw body, not JSON
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expected !== signature) {
      console.log("❌ Webhook signature mismatch");
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(rawBody);

    console.log("📩 Webhook Received:", event.event);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      await cart.update(
        {
          paymentStatus: "PAID",
          razorpayPaymentId: payment.id,
          paidAt: new Date(),
        },
        {
          where: { razorpayOrderId: payment.order_id }
        }
      );

      console.log(`✅ Payment Verified for Order: ${payment.order_id}`);
    }

    // Razorpay requires exactly 200 OK, else retries
    return new NextResponse("OK", { status: 200 });

  } catch (err) {
    console.log("🔥 Webhook Error:", err);
    return new NextResponse("Server Error", { status: 500 });
  }
}
