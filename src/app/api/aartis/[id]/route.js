// src/app/api/aartis/[id]/route.js



import { NextResponse } from "next/server";
import models from "@/models";

const { Aartis } = models;

// ✅ Get Aarti by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const aarti = await Aartis.findByPk(id);

    if (!aarti) {
      return NextResponse.json({ success: false, message: "Aarti not found", status: 404 });
    }

    return NextResponse.json({ success: true, status: 200, data: aarti });
  } catch (error) {
    console.error("Error fetching Aarti by ID:", error);
    return NextResponse.json({ success: false, message: error.message, status: 500 });
  }
}

// ✅ Update Aarti by ID
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, icon, title, slug, aboutArticle, aartis } = body;

    // 🧩 Validation
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Aarti ID is required" },
        { status: 400 }
      );
    }

    // ✅ Find existing Aarti
    const existingAarti = await Aartis.findByPk(id);
    if (!existingAarti) {
      return NextResponse.json(
        { success: false, message: "Aarti not found" },
        { status: 404 }
      );
    }

    // ✅ Update record
    await existingAarti.update({
      icon,
      title,
      slug,
      aboutArticle,
      aartis,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Aarti updated successfully!",
      data: existingAarti,
    });
  } catch (error) {
    console.error("Error updating Aarti:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ✅ Delete Aarti
export async function DELETE(req, context) {
  const { id } = await context.params;
  try {
    const aarti = await Aartis.findByPk(id);
    if (!aarti) {
      return NextResponse.json({ success: false, message: "Aarti not found", status: 404 });
    }

    await aarti.destroy();
    return NextResponse.json({ success: true, status:200, message: "Aarti deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, status: 500 });
  }
}