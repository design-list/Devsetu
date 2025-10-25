// src/app/api/cart/route.js


import { NextResponse } from "next/server";
import models from "@/models/index.js";

const { cart, cartAddOn, cartPackage, UserDetails } = models;

// =========================
// GET ALL CARTS
// =========================
export async function GET() {
  try {
    const carts = await cart.findAll({
      include: [
        { model: cartPackage, as: "package" },
        { model: cartAddOn, as: "add_ons" },
        { model: UserDetails, as: "user_details" },
      ],
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json({ data: carts }, { status: 200 });
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



export async function POST(request) {
  try {
    const body = await request.json();

    // 1️⃣ Create main cart
    const newCart = await cart.create({
      storeId: body.store_id,
      tipAmount: body.tip_amount || 0,
      otherCharges: body.other_charges || {},
      couponCode: body.coupon_code || null,
      paymentStatus: "PENDING",
    });

    // 2️⃣ Insert package
    if (body.package) {
      await cartPackage.create({
        cartId: newCart.id,
        packageId: body.package.id,
        name: body.package.packageType,
        basePrice: body.package.packagePrice,
        price: body.package.packagePrice,
        quantity: body.package.quantity,
      });
    }

    // 3️⃣ Insert add-ons
    if (Array.isArray(body.add_ons)) {
      for (const addon of body.add_ons) {
        await cartAddOn.create({
          cartId: newCart.id,
          addOnId: addon.id,
          name: addon.title,
          basePrice: addon.price,
          price: addon.price,
          quantity: addon.quantity || 1,
        });
      }
    }

    // 4️⃣ Insert user details
    if (body.userDetails) {
      const user = body.userDetails;
      await UserDetails.create({
        cartId: newCart.id,
        whatsapp: user.whatsapp,
        name: user.name,
        address: user.address,
        postalCode: user.postalCode,
        city: user.city,
        state: user.state,
        members: user.members || [],
      });
    }

    return NextResponse.json({
        data : {
          success: true,
          cart_id: newCart.id,
          grand_total: body.grand_total,
        },
        status: 200 
      },
    );
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
