import db from "@/models";
import { NextResponse } from "next/server";

const Horoscope = db.Horoscope;

// ✅ Get Single Horoscope
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const data = await Horoscope.findByPk(id);

    if (!data)
      return NextResponse.json({ status: 404, message: "Not found" });

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}

// ✅ Update Horoscope
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const item = await Horoscope.findByPk(id);
    if (!item)
      return NextResponse.json({ status: 404, message: "Not found" });

    await item.update(body);

    return NextResponse.json({
      status: 200,
      message: "Horoscope updated successfully",
      data: item,
    });
  } catch (error) {
    console.error("Error updating horoscope:", error);
    return NextResponse.json({ status: 500, error: "Update failed" });
  }
}

// ✅ Delete Horoscope
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const item = await Horoscope.findByPk(id);
    if (!item)
      return NextResponse.json({ status: 404, message: "Not found" });

    await item.destroy();

    return NextResponse.json({
      status: 200,
      message: "Horoscope deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting horoscope:", error);
    return NextResponse.json({ status: 500, error: "Delete failed" });
  }
}
