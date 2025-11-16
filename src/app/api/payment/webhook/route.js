export const config = {
  api: { bodyParser: false }
};

import { NextResponse } from "next/server";
import crypto from "crypto";
import models from "@/models";
const { cart } = models;

export async function POST(req) {
  try {
    // Read raw body for signature validation
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    // Validate webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.log("❌ Invalid Webhook Signature");
      return new NextResponse("Invalid Signature", { status: 400 });
    }

    const event = JSON.parse(rawBody);
    console.log("📩 Webhook Event:", event.event);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      // Update full payment info in DB
      await cart.update(
        {
          paymentStatus: "PAID",
          razorpayOrderId: payment.order_id,
          razorpayPaymentId: payment.id,
          razorpaySignature: signature,
          paymentMethod: payment.method || null,
          paymentEmail: payment.email || null,
          paymentContact: payment.contact || null,
          upiId: payment.vpa || null,
          paymentAmount: payment.amount / 100, // converting paise to rupees
          paymentStatusRazorpay: payment.status,
          paidAt: new Date(),
        },
        { where: { razorpayOrderId: payment.order_id } }
      );

      console.log(`✅ Razorpay Payment Captured & Updated: ${payment.order_id}`);
    }

    // Razorpay expects exactly 200 response
    return new NextResponse("OK", { status: 200 });

  } catch (err) {
    console.error("🔥 Webhook Processing Error:", err);
    return new NextResponse("Server Error", { status: 500 });
  }
}
