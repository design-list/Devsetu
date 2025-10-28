import { NextResponse } from "next/server";

import models from "@/models";

const { Horoscopes } = models;

// ✅ Get Single Horoscopes
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const data = await Horoscopes.findByPk(id);

    if (!data)
      return NextResponse.json({ status: 404, message: "Not found" });

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.error("Error fetching Horoscopes:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}

// ✅ Update Horoscopes
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const item = await Horoscopes.findByPk(id);
    if (!item)
      return NextResponse.json({ status: 404, message: "Not found" });

    await item.update(body);

    return NextResponse.json({
      status: 200,
      message: "Horoscopes updated successfully",
      data: item,
    });
  } catch (error) {
    console.error("Error updating Horoscopes:", error);
    return NextResponse.json({ status: 500, error: "Update failed" });
  }
}

// ✅ Delete Horoscopes
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const item = await Horoscopes.findByPk(id);
    if (!item)
      return NextResponse.json({ status: 404, message: "Not found" });

    await item.destroy();

    return NextResponse.json({
      status: 200,
      message: "Horoscopes deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Horoscopes:", error);
    return NextResponse.json({ status: 500, error: "Delete failed" });
  }
}
