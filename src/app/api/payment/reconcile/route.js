import { Op } from "sequelize";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import models from "@/models";
const { cart } = models;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Filter last 15 days
const startDate = new Date();
startDate.setDate(startDate.getDate() - 15);
startDate.setHours(0, 0, 0, 0);

const endDate = new Date();
endDate.setHours(23, 59, 59, 999);

export async function GET() {
  try {

    // Fetch pending payments in last 15 days
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
        markedPaid: 0,
        markedFailed: 0,
      });
    }

    let paidCount = 0;
    let failedCount = 0;

    for (const order of pendingOrders) {
      if (!order.razorpayOrderId) {
        // No RZP order, mark as failed
        await cart.update(
          { paymentStatus: "FAILED" },
          { where: { id: order.id } }
        );
        failedCount++;
        continue;
      }

      // Fetch payment details from Razorpay
      const payments = await razorpay.orders.fetchPayments(order.razorpayOrderId);
      const payment = payments.items?.[0];

      // Case: No payment found → Failed
      if (!payment) {
        await cart.update(
          { paymentStatus: "FAILED" },
          { where: { id: order.id } }
        );
        failedCount++;
        continue;
      }

      // Case: Payment Captured → Mark Paid
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
            paymentAmount: payment.amount / 100,
            paymentStatusRazorpay: payment.status,
            paidAt: new Date(),
          },
          { where: { id: order.id } }
        );
        paidCount++;
      } 
      else if (payment.status === "failed") {
        // Case: Payment Failed
        await cart.update(
          {
            paymentStatus: "FAILED",
            paymentStatusRazorpay: payment.status
          },
          { where: { id: order.id } }
        );
        failedCount++;
      }
    }

    // Response
    return NextResponse.json({
      message: "Reconciliation complete",
      totalChecked: pendingOrders.length,
      updatedPaid: paidCount,
      updatedFailed: failedCount,
      status: 200,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
