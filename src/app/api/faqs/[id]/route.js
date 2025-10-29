

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { Faqs } = models;

// FIND ONE (GET /api/faqs/:id)

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const faq = await Faqs.findByPk(id);
    if (!faq) {
      return NextResponse.json(
        { status: "error", message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200, data: faq });
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}


// DELETE (DELETE /api/faqs/:id)

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    const faq = await Faqs.findByPk(id);
    if (!faq) {
      return NextResponse.json(
        { status: "error", message: "FAQ not found" },
        { status: 404 }
      );
    }

    await faq.destroy();

    return NextResponse.json({
      status: 200,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}