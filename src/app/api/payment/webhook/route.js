import { NextResponse } from "next/server";
import crypto from "crypto";
import models from "@/models";
const { cart } = models;

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const hash = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;

    await cart.update(
      {
        paymentStatus: "PAID",
        razorpayPaymentId: payment.id,
        paidAt: new Date(),
      },
      { where: { razorpayOrderId: payment.order_id } }
    );
  }

  return new NextResponse("OK", { status: 200 });
}
