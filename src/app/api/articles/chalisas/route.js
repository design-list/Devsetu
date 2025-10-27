// src/app/api/chalisa/route.js


import { NextResponse } from "next/server";
import models from "@/models";

const { Chalisas } = models;

// ✅ Get all Chalisa
export async function GET() {
  try {
    const AllChalisas = await Chalisas.findAll({
      order: [["id", "DESC"]],
    });
    return NextResponse.json({ success: true, status: 200, data: AllChalisas });
  } catch (error) {
    console.error("Error fetching Chalisas:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ✅ Create new Chalisa
export async function POST(req) {
  try {
    const body = await req.json();
    const { icon, title, slug, aboutArticle, chaupai, openingDoha, closeDoha } = body;

    const newChalisa = await Chalisas.create({
      icon,
      title,
      slug,
      aboutArticle,
      chaupai,
      openingDoha,
      closeDoha
    });

    return NextResponse.json({ success: true, status: 200, data: newChalisa, message: "Chalisas added successfully!" });
  } catch (error) {
    console.error("Error creating Chalisas:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
