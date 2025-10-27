import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { cart, UserDetails, CartPackage, CartAddOn } = models;

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const cartById = await cart.findOne({
      where: { id },
      include: [
        { model: CartPackage, as: "package" },
        { model: CartAddOn, as: "add_ons" },
        { model: UserDetails, as: "user_details" }
      ],
      order: [["id", "DESC"]],
    });

    if (cartById?.user_details?.members && typeof cartById.user_details.members === "string") {
        cartById.user_details.members = JSON.parse(cartById.user_details.members);
    }

    if (!cartById) {
      return NextResponse.json({ error: "cart not found", status: 404 });
    }

    return NextResponse.json({ data: cartById, status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}