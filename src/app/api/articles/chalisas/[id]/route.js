// src/app/api/chalisas/[id]/route.js



import { NextResponse } from "next/server";
import models from "@/models";

const { Chalisas } = models;

// ✅ Get Aarti by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const aarti = await Chalisas.findByPk(id);

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
    const {id, icon, title, slug, aboutArticle, chaupai, openingDoha, closeDoha } = body;

    // 🧩 Validation
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Aarti ID is required" },
        { status: 400 }
      );
    }

    // ✅ Find existing Aarti
    const existingcChalisa = await Chalisas.findByPk(id);
    if (!existingcChalisa) {
      return NextResponse.json(
        { success: false, message: "Aarti not found" , status: 404 }
      );
    }

    // ✅ Update record
    await existingcChalisa.update({
      icon,
      title,
      slug,
      aboutArticle,
      chaupai,
      openingDoha,
      closeDoha
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "chalisa updated successfully!",
      data: existingcChalisa,
    });
  } catch (error) {
    console.error("Error updating chalisa:", error);
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
    const chalisa = await Chalisas.findByPk(id);
    if (!chalisa) {
      return NextResponse.json({ success: false, message: "chalisa not found", status: 404 });
    }

    await chalisa.destroy();
    return NextResponse.json({ success: true, status:200, message: "chalisa deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message, status: 500 });
  }
}