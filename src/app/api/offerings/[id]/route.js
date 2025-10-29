

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { offerings } = models;

// FIND ONE (GET /api/offerings/:id)

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const findOffer = await offerings.findByPk(id);
    if (!findOffer) {
      return NextResponse.json(
        { status: "error", message: "Offering not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200,message: "Updated Offring", data: findOffer });
  } catch (error) {
    console.error("Error fetching Offring:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}


// DELETE (DELETE /api/offerings/:id)

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const findOffer = await offerings.findByPk(id);
    if (!findOffer) {
      return NextResponse.json(
        { status: "error", message: "Offer not found" },
        { status: 404 }
      );
    }

    await findOffer.destroy();

    return NextResponse.json({
      status: 200,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}