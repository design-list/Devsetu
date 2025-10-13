import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { amount, currency = "INR", receipt, cart_id } = await request.json();

    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });

    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paisa
      currency,
      receipt: receipt || `receipt_${cart_id}`,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
