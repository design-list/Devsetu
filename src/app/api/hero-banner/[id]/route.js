import { NextResponse } from "next/server";
import models from "@/models/index.js";

const { HeroBanner } = models;

// 🟢 Get Hero Banner by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const banner = await HeroBanner.findByPk(id);

    if (!banner) {
      return NextResponse.json({ error: "Hero Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ data: banner , status: 200 });
  } catch (error) {
    console.error("❌ GET by ID Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🟢 Update Hero Banner by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const banner = await HeroBanner.findByPk(id);
    if (!banner) {
      return NextResponse.json({ error: "Hero Banner not found" }, { status: 404 });
    }

    await banner.update(body);

    return NextResponse.json(
      { message: "Hero Banner updated successfully", data: banner , status: 200 }
    );
  } catch (error) {
    console.error("❌ PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🟢 Delete Hero Banner by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const banner = await HeroBanner.findByPk(id);

    if (!banner) {
      return NextResponse.json({ error: "Hero Banner not found" }, { status: 404 });
    }

    await banner.destroy();

    return NextResponse.json(
      { message: "Hero Banner deleted successfully" , status: 200 }
    );
  } catch (error) {
    console.error("❌ DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
