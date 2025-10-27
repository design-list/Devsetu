import { NextResponse } from "next/server";
import models from "@/models";
const { Mantras } = models;

// ✅ Create new mantra
export async function POST(req) {
  try {
    const body = await req.json();

    const newMantra = await Mantras.create({
      lordName: body.lordName,
      title: body.title,
      slug: body.slug,
      introduction: body.introduction,
      mantrasList: body.mantrasList,
      significance: body.significance,
      icon: body.icon,
    });

    return NextResponse.json(
      { message: "Mantra created successfully", data: newMantra , status: 200 }
    );
  } catch (error) {
    console.error("POST /api/mantras Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Get all mantras
export async function GET() {
  try {
    const allMantras = await Mantras.findAll({
      order: [["id", "DESC"]],
    });

    return NextResponse.json({ data: allMantras, status: 200 });
  } catch (error) {
    console.error("GET /api/mantras Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
