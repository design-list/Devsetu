// src/app/api/cart/route.js

import { NextResponse } from "next/server";
import { Cart, CartPackage, CartAddOn } from "@/models"; // adjust import path

export async function GET(request) {
  try {
    const carts = await Cart.findAll({
      include: [
        { model: CartPackage, as: "package" },
        { model: CartAddOn, as: "add_ons" },
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

    // Create the Cart
    const newCart = await Cart.create({
      storeId: body.store_id,
      tipAmount: body.tip_amount,
      otherCharges: body.other_charges,
      couponCode: body.coupon_code,
    });

    // Create CartPackage
    if (body.package) {
      await CartPackage.create({
        cartId: newCart.id,
        packageId: body.package.id,
        name: body.package.name,
        hsnCode: body.package.hsn_code,
        sId: body.package.s_id,
        basePrice: body.package.base_price,
        price: body.package.price,
        quantity: body.package.quantity,
        unitTaxRate: body.package.unit_tax_rate,
      });
    }

    // Create CartAddOns
    if (Array.isArray(body.add_ons)) {
      for (const addon of body.add_ons) {
        await CartAddOn.create({
          cartId: newCart.id,
          addOnId: addon.id,
          name: addon.name,
          hsnCode: addon.hsn_code,
          sId: addon.s_id,
          basePrice: addon.base_price,
          price: addon.price,
          quantity: addon.quantity,
          unitTaxRate: addon.unit_tax_rate,
        });
      }
    }

    // Fetch with associations to return
    const cartWithRelations = await Cart.findByPk(newCart.id, {
      include: [
        { model: CartPackage, as: "package" },
        { model: CartAddOn, as: "add_ons" },
      ],
    });

    return NextResponse.json({ data: cartWithRelations }, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
