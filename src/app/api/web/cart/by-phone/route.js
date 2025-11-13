import { NextResponse } from "next/server";
import models from "@/models/index.js";

const { cart, CartAddOn, CartPackage, UserDetails } = models;

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { status: 400, message: "Phone number is required" },
        { status: 400 }
      );
    }

    // normalize phone number
    const normalizedPhone = phone.replace("+91", "").trim();

    const carts = await cart.findAll({
      include: [
        { model: CartPackage, as: "package" },
        { model: CartAddOn, as: "add_ons" },
        {
          model: UserDetails,
          as: "user_details",
          where: {
            whatsapp: normalizedPhone,
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!carts.length) {
      return NextResponse.json(
        { status: 404, message: "No carts found for this number" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Carts fetched successfully",
      data: carts,
    });
  } catch (error) {
    console.error("🔥 Error fetching carts by phone:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch cart data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
