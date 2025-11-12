import { NextResponse } from "next/server";
import axios from "axios";
import { Op } from "sequelize";
import models from "@/models/index.js";

const { WhatsAppOtp } = models;

// OTP Generator
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send OTP with AiSensy
async function sendOtpWithAiSensy(phoneNumber, otp) {
  const response = await axios.post(`${process.env.AISENSY_API_BASE_URL}`, {
    apiKey: process.env.AISENSY_API_KEY,
    campaignName: process.env.AISENSY_TEMPLATE_NAME,
    destination: phoneNumber,
    userName: "Deva Setu",
    templateParams: [`${otp}`],
    buttons: [
      {
        type: "button",
        sub_type: "url",
        index: 0,
        parameters: [
          {
            type: "text",
            text: `${otp}`,
          },
        ],
      },
    ],
    source: "API",
  });

  return response.data;
}

// Main API route
export async function POST(request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Phone number required" },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // ✅ 1. Delete expired OTPs
    await WhatsAppOtp.destroy({
      where: { expiresAt: { [Op.lt]: new Date() } },
    });

    // ✅ 2. Delete any existing OTP for same number
    await WhatsAppOtp.destroy({ where: { phoneNumber } });

    // ✅ 3. Create new OTP
    await WhatsAppOtp.create({ phoneNumber, otp, expiresAt });

    // ✅ 4. Send OTP
    const aiResponse = await sendOtpWithAiSensy(phoneNumber, otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      status: 200,
      expiresAt,
      aiResponse, // optional debug info
    });
  } catch (error) {
    console.error("Send OTP error:", error?.response?.data || error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
