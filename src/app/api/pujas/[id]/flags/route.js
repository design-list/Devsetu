// src/app/api/pujas/[id]/toggle/route.js


import { NextResponse } from "next/server";

import models from "@/models/index.js";

const { pujas } = models;

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id } = await params;

    const { field, value } = body;

    console.log("allowed flags ", field, value)

    // ✅ allowed flags 

    const allowedFlags = [
      "isActive",
      "isActiveOnHome",
      "commonPack",
      "commonOffer",
      "commonFaqs",
    ];

    if (!allowedFlags.includes(field)) {
      return NextResponse.json(
        { error: "Invalid flag field" },
        { status: 400 }
      );
    }

    const puja = await pujas.findByPk(id);
    if (!puja) {
      return NextResponse.json(
        { error: "Puja not found" },
        { status: 404 }
      );
    }

    // ✅ only flag update
    puja[field] = value;
    await puja.save();

    return NextResponse.json({
      status: 200,
      message: `${field} updated successfully`,
      data: { [field]: puja[field] },
    });
  } catch (error) {
    console.error("Flag update error:", error);
    return NextResponse.json(
      { error: "Failed to update flag", details: error.message },
      { status: 500 }
    );
  }
}
