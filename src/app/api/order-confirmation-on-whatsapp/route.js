import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, name, orderId, amount } = body;

    console.log("confirmation on whatsapp", body)

    if (!phone || !name || !orderId || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Replace with your actual AIsensy API Key and Campaign ID
    const apiKey = process.env.AISENSY_API_KEY;
    const campaignName = "Order_Confirmation_message";

    // AIsensy API endpoint
    const url = `${process.env.AISENSY_API_BASE_URL}`;

    // WhatsApp message payload
    const payload = {
      apiKey,
      campaignName,
      destination: phone,
      userName: name,
      templateParams: [name, orderId, amount],
    };

    const response = await axios.post(url, payload);

    if (response.data.status === "success") {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Order confirmation sent successfully",
        data: response.data,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to send order confirmation",
        data: response.data,
      });
    }
  } catch (error) {
    console.error("AIsensy Error:", error.response?.data || error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
