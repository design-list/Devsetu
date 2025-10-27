

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { cart, UserDetails, cartPackage, cartAddOn } = models;

export async function GET() {
  try {
    // Pujas fetch
    const allCarts = await cart.findAll({
      where: { isActive: true, isActiveOnHome: true },
      attributes: ["id", "title", "slug"],
      include: [
        { model: UserDetails, as: "user_details" },
        { model: cartPackage, as: "package" },
        { model: cartAddOn, as: "add_ons" },
      ],
    });

    return NextResponse.json({
      status: 200,
      message: "All carts fetched successfully",
      data: allCarts
    });

  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
