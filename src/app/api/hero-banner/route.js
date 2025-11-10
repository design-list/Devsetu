import { NextResponse } from "next/server";
import models from "@/models/index.js";

const { HeroBanner } = models;

// 🟢 Create new Hero Banner
export async function POST(request) {
  try {
    const body = await request.json();
    const newBanner = await HeroBanner.create(body);

    return NextResponse.json(
      { message: "Hero Banner created successfully", data: newBanner , status: 200 }
    );
  } catch (error) {
    console.error("❌ POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🟢 Get all Hero Banners
export async function GET() {
  try {
    const banners = await HeroBanner.findAll({
      order: [["id", "DESC"]],
    });

    return NextResponse.json({ data: banners }, { status: 200 });
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
