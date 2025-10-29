

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { commonPujaPackage } = models;

// FIND ONE (GET /api/commonPujaPackage/:id)

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const pack = await commonPujaPackage.findByPk(id);
    if (!pack) {
      return NextResponse.json(
        { status: "error", message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200, data: pack });
  } catch (error) {
    console.error("Error fetching package:", error);
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

    const pack = await commonPujaPackage.findByPk(id);
    if (!pack) {
      return NextResponse.json(
        { status: "error", message: "pack not found" },
        { status: 404 }
      );
    }

    await pack.destroy();

    return NextResponse.json({
      status: 200,
      message: "pack deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting pack:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}