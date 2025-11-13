import { NextResponse } from "next/server";
import { Op } from "sequelize";
import models from "@/models/index.js";

const { UserDetails } = models;

export async function POST(request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ status: 400, message: "Phone number is required" }, { status: 400 });
    }

    // ✅ Normalize phone
    const cleanPhone = phone.replace("+91", "").trim();

    // ✅ Match both with and without +91
    const user = await UserDetails.findOne({
      where: {
        [Op.or]: [
          { whatsapp: cleanPhone },
          { whatsapp: `+91${cleanPhone}` },
        ],
      },
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch user details", error: error.message },
      { status: 500 }
    );
  }
}
