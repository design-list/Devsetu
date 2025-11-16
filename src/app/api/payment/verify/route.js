// src/app/api/payment/verify




import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import models from "@/models/index.js";
const { cart } = models;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart_id } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: "Bad payload" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    const dbCart = await cart.findOne({ where: { id: cart_id } });

    if (!dbCart) return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 });

    // 🛡 IDempotent safety
    if (dbCart.paymentStatus === "PAID") {
      return NextResponse.json({ success: true, message: "Already verified" }, { status: 200 });
    }

    await cart.update(
      {
        paymentStatus: "PAID",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentMethod: payment.method,
        paymentContact: payment.contact,
        paymentEmail: payment.email,
        paidAt: new Date(),
      },
      { where: { id: cart_id } }
    );

    return NextResponse.json({ success: true, status:200, message: "Payment Verified" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}




// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import Razorpay from "razorpay";
// import models from "@/models/index.js";

// const { cart } = models;

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart_id } = body;

//     // Step 1️⃣: Verify signature
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return NextResponse.json(
//         { success: false, message: "Invalid signature" },
//         { status: 400 }
//       );
//     }

//     // Step 2️⃣: Fetch payment details
//     const payment = await razorpay.payments.fetch(razorpay_payment_id);

//     // Step 3️⃣: Get cart data
//     const dbCart = await cart.findOne({ where: { id: cart_id } });
//     if (!dbCart) {
//       return NextResponse.json(
//         { success: false, message: "Cart not found" },
//         { status: 404 }
//       );
//     }

//     // Step 4️⃣: Verify amount internally (no message shown)
//     const expectedAmount = Number(dbCart?.grand_total || 0) * 100;
//     const receivedAmount = Number(payment.amount);
//     const amountMatches = Math.abs(expectedAmount - receivedAmount) <= 1;

//     // Step 5️⃣: Always mark PAID if verified
//     await cart.update(
//       {
//         paymentStatus: "PAID",
//         razorpayOrderId: razorpay_order_id,
//         razorpayPaymentId: razorpay_payment_id,
//         ...(cart.rawAttributes?.razorpaySignature
//           ? { razorpaySignature: razorpay_signature }
//           : {}),
//         paymentMethod: payment.method,
//         paymentEmail: payment.email || null,
//         paymentContact: payment.contact || null,
//         upiId: payment.vpa || null,
//         paymentAmount: payment.amount / 100,
//         paymentStatusRazorpay: payment.status,
//         paidAt: new Date(),
//       },
//       { where: { id: cart_id } }
//     );

//     // Step 6️⃣: Send clean response
//     return NextResponse.json({
//       success: true,
//       message: "✅ Payment verified successfully",
//       data: {
//         razorpay_order_id,
//         razorpay_payment_id,
//         status: payment.status,
//         method: payment.method,
//       },
//     });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


