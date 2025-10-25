// src/app/api/aartis/route.js


import { NextResponse } from "next/server";
import models from "@/models";

const { Aartis } = models;

// ✅ Get all Aartis
export async function GET() {
  try {
    const aartis = await Aartis.findAll({
      order: [["id", "DESC"]],
    });
    return NextResponse.json({ success: true, status: 200, data: aartis });
  } catch (error) {
    console.error("Error fetching Aartis:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ✅ Create new Aarti
export async function POST(req) {
  try {
    const body = await req.json();
    const { icon, title, slug, aboutArticle, aartis: aartiText } = body;

    const newAarti = await Aartis.create({
      icon,
      title,
      slug,
      aboutArticle,
      aartis: aartiText,
    });

    return NextResponse.json({ success: true, status: 200, data: newAarti, message: "Aarti added successfully!" });
  } catch (error) {
    console.error("Error creating Aarti:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
