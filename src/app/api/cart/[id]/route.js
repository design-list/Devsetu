// src/app/api/cart/[id]/route.js


import { NextResponse } from "next/server";
import models from "@/models/index.js";

const { cart, cartAddOn, cartPackage } = models;

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const carts = await cart.findByPk(id, {
      include: [
        { model: cartPackage, as: "package" },
        { model: cartAddOn, as: "add_ons" },
      ],
    });
    if (!carts) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json({ data: carts, status: 200 });
  } catch (error) {
    console.error("GET /api/cart/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const carts = await cart.findByPk(id);
    if (!carts) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Update Cart fields
    await carts.update({
      storeId: body.store_id,
      tipAmount: body.tip_amount,
      otherCharges: body.other_charges,
      couponCode: body.coupon_code,
    });

    // Update or recreate CartPackage
    if (body.package) {
      const existingPkg = await cartPackage.findOne({ where: { cartId: id } });
      if (existingPkg) {
        await existingPkg.update({
          packageId: body.package.id,
          name: body.package.name,
          hsnCode: body.package.hsn_code,
          sId: body.package.s_id,
          basePrice: body.package.base_price,
          price: body.package.price,
          quantity: body.package.quantity,
          unitTaxRate: body.package.unit_tax_rate,
        });
      } else {
        await cartPackage.create({
          cartId: id,
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
    }

    // Update add-ons: simplest: delete existing and re-create
    await cartAddOn.destroy({ where: { cartId: id } });
    if (Array.isArray(body.add_ons)) {
      for (const addon of body.add_ons) {
        await cartAddOn.create({
          cartId: id,
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

    const updatedCart = await Cart.findByPk(id, {
      include: [
        { model: cartPackage, as: "package" },
        { model: cartAddOn, as: "add_ons" },
      ],
    });

    return NextResponse.json({ data: updatedCart, status: 200 });
  } catch (error) {
    console.error("PUT /api/cart/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await cart.destroy({ where: { id } });
    if (!deleted) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Cart deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/cart/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
