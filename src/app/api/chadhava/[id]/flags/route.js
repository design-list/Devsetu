// src/app/api/chadhavas/[id]/toggle/route.js


import { NextResponse } from "next/server";

import models from "@/models/index.js";

const { chadhava } = models;

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id } = await params;

    const { field, value } = body;

    // console.log("allowed flags ", field, value)

    // ✅ allowed flags 

    const allowedFlags = [
      "isActive",
      "isActiveOnHome",
      "isRecommended",
      "commonFaqs",
    ];

    if (!allowedFlags.includes(field)) {
      return NextResponse.json(
        { error: "Invalid flag field" },
        { status: 400 }
      );
    }

    const chadhavas = await chadhava.findByPk(id);
    if (!chadhavas) {
      return NextResponse.json(
        { error: "Puja not found" },
        { status: 404 }
      );
    }

    // ✅ only flag update
    chadhavas[field] = value;
    await chadhavas.save();

    return NextResponse.json({
      status: 200,
      message: `${field} updated successfully`,
      data: { [field]: chadhavas[field] },
    });
  } catch (error) {
    console.error("Flag update error:", error);
    return NextResponse.json(
      { error: "Failed to update flag", details: error.message },
      { status: 500 }
    );
  }
}
