// src/app/api/aartis/[id]/route.js
import { NextResponse } from "next/server";
import models from "@/models";

const { Aartis, Chalisas, Festivals, Horoscopes, Wishes } = models;

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

// ✅ Delete Aarti by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const deleted = await Aartis.destroy({ where: { id } });

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Aarti not found", status: 404 });
    }

    return NextResponse.json({ success: true, status: 200, message: "Aarti deleted successfully!" });
  } catch (error) {
    console.error("Error deleting Aarti:", error);
    return NextResponse.json({ success: false, message: error.message, status: 500 });
  }
}



// ✅ Update Aarti by ID (PUT)
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const { icon, title, slug, aboutArticle, Aartis: aartiText } = body;

    const existingAarti = await Aartis.findByPk(id);
    if (!existingAarti) {
      return NextResponse.json({ success: false, message: "Aarti not found" }, { status: 404 });
    }

    await existingAarti.update({
      icon,
      title,
      slug,
      aboutArticle,
      Aartis: aartiText,
    });

    return NextResponse.json({ success: true, status: 200, message: "Aarti updated successfully!", data: existingAarti });
  } catch (error) {
    console.error("Error updating Aarti:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}