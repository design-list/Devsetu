import { Op } from "sequelize";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import models from "@/models";
const { cart } = models;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const startDate = new Date();
startDate.setDate(startDate.getDate() - 9);
startDate.setHours(0, 0, 0, 0);

const endDate = new Date();
endDate.setHours(23, 59, 59, 999);

export async function GET() {
  try {
   
    const pendingOrders = await cart.findAll({
      where: {
        paymentStatus: "PENDING",
         createdAt: {
        [Op.between]: [startDate, endDate],
        },
      },
    });

    if (pendingOrders.length === 0) {
      return NextResponse.json({
        message: "No pending payments found",
        totalChecked: 0,
        updated: 0,
      });
    }

    let updated = 0;

    for (const order of pendingOrders) {
      if (!order.razorpayOrderId) continue;

      // 2️⃣ Fetch payments for this Order from Razorpay
      const payments = await razorpay.orders.fetchPayments(order.razorpayOrderId);

      const payment = payments.items?.[0];

      if (!payment) continue;

      // 3️⃣ If Razorpay says payment captured, update DB
      if (payment.status === "captured") {
        await cart.update(
          {
            paymentStatus: "PAID",
            razorpayOrderId: payment.order_id,
            razorpayPaymentId: payment.id,
            paymentMethod: payment.method || null,
            paymentEmail: payment.email || null,
            paymentContact: payment.contact || null,
            upiId: payment.vpa || null,
            paymentAmount: payment.amount / 100, // converting paise to rupees
            paymentStatusRazorpay: payment.status,
            paidAt: new Date(),
          },
          { where: { id: order.id } }
        );

        updated++;
      }
    }

    return NextResponse.json({
      message: "Reconciliation complete",
      totalChecked: pendingOrders.length,
      updated,
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
