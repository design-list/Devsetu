import { NextResponse } from "next/server";
import { Op } from "sequelize";
import models from "@/models/index.js";
import jwt from "jsonwebtoken";

const { WhatsAppOtp } = models;
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("VERIFY BODY:", body);

    const phoneNumber = body.phone;
    const otp = body.otp;

    if (!phoneNumber || !otp) {
      return NextResponse.json({ success: false, message: "Missing phone number or OTP" }, { status: 400 });
    }

    // Cleanup expired OTPs
    await WhatsAppOtp.destroy({
      where: { expiresAt: { [Op.lt]: new Date() } },
    });

    // Find latest OTP for this phone
    const record = await WhatsAppOtp.findOne({
      where: { phoneNumber },
      order: [["createdAt", "DESC"]],
    });

    if (!record) {
      return NextResponse.json({ success: false, message: "OTP not found" }, { status: 404 });
    }

    if (record.verified) {
      return NextResponse.json({ success: false, message: "OTP already used" }, { status: 400 });
    }

    const now = new Date();
    if (now > record.expiresAt) {
      return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 });
    }

    if (record.otp !== otp) {
      return NextResponse.json({ success: false, message: "Incorrect OTP" }, { status: 400 });
    }

    record.verified = true;
    await record.save();

    // Delete old OTPs for this number
    await WhatsAppOtp.destroy({ where: { phoneNumber } });

    const token = jwt.sign({ phoneNumber }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "OTP verified successfully",
      token,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
