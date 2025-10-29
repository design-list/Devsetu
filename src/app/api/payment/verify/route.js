// src/app/api/payment/verify


import { NextResponse } from "next/server";
import crypto from "crypto";
import models from "@/models/index.js";

const { cart } = models;

export async function POST(request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart_id } = body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await cart.update(
        {
          paymentStatus: "PAID",
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          paidAt: new Date(),
        },
        { where: { id: cart_id } }
      );

      return NextResponse.json({ success: true, message: "Payment verified & cart updated" });
    }

    return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
