// src/app/api/payment/order/route.js


import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import models from "@/models";
const { cart } = models;

export async function POST(request) {
  try {
    const { amount, currency = "INR", receipt, cart_id } = await request.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt,
    });

    // 🔥 Update DB with Razorpay Order ID
    await cart.update(
      { razorpayOrderId: order.id },
      { where: { id: cart_id } }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
















// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(request) {
//   try {
//     const { amount, currency = "INR", receipt, cart_id } = await request.json();

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // amount in paisa
//       currency,
//       receipt: receipt || `receipt_${cart_id}`,
//     });

//     return NextResponse.json({
//       status: 200,
//       success: true,
//       order, // 👈 direct return

//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }
