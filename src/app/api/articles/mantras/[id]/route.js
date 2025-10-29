import { NextResponse } from "next/server";
import models from "@/models";
const { Mantras } = models;

// ✅ Get single mantra by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const mantra = await Mantras.findByPk(id);
    if (!mantra) {
      return NextResponse.json({ error: "Mantra not found" , status: 404 });
    }

    return NextResponse.json({ data: mantra, status: 200 });
  } catch (error) {
    console.error("GET /api/mantras/[id] Error:", error);
    return NextResponse.json({ error: error.message , status: 500 });
  }
}

// ✅ Update mantra by ID
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const mantra = await Mantras.findByPk(id);
    if (!mantra) {
      return NextResponse.json({ error: "Mantra not found" , status: 404 });
    }

    await mantra.update({
      lordName: body.lordName ?? mantra.lordName,
      title: body.title ?? mantra.title,
      slug: body.slug ?? mantra.slug,
      introduction: body.introduction ?? mantra.introduction,
      mantrasList: body.mantrasList ?? mantra.mantrasList,
      significance: body.significance ?? mantra.significance,
      icon: body.icon ?? mantra.icon,
    });

    return NextResponse.json(
      { message: "Mantra updated successfully", data: mantra , status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/mantras/[id] Error:", error);
    return NextResponse.json({ error: error.message , status: 500 });
  }
}

// ✅ Delete mantra by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const mantra = await Mantras.findByPk(id);
    if (!mantra) {
      return NextResponse.json({ error: "Mantra not found" , status: 404 });
    }

    await mantra.destroy();
    return NextResponse.json(
      { message: "Mantra deleted successfully" , status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/mantras/[id] Error:", error);
    return NextResponse.json({ error: error.message , status: 500 });
  }
}
