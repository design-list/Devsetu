

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { commonPujaPackage } = models;

// FIND ONE (GET /api/commonPujaPackage/:id)

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const pack = await commonPujaPackage.findByPk(id);
    if (!pack) {
      return NextResponse.json(
        { status: "error", message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200, data: pack });
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}


// DELETE (DELETE /api/faqs/:id)

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    const pack = await commonPujaPackage.findByPk(id);
    if (!pack) {
      return NextResponse.json(
        { status: "error", message: "pack not found" },
        { status: 404 }
      );
    }

    await pack.destroy();

    return NextResponse.json({
      status: 200,
      message: "pack deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting pack:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, packImg, packageType, packageDescription, packagePrice, noOfPeople } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Package ID is required" }, { status: 400 });
    }

    // ✅ Find existing package
    const existingPackage = await packageModel.findByPk(id);
    if (!existingPackage) {
      return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 });
    }

    // ✅ Update fields
    existingPackage.packImg = packImg || existingPackage.packImg;
    existingPackage.packageType = packageType || existingPackage.packageType;
    existingPackage.packageDescription = packageDescription || existingPackage.packageDescription;
    existingPackage.packagePrice = packagePrice || existingPackage.packagePrice;
    existingPackage.noOfPeople = noOfPeople || existingPackage.noOfPeople;

    // ✅ Save to database
    await existingPackage.save();

    return NextResponse.json({
      success: true,
      message: "Package updated successfully",
      data: existingPackage,
    });
  } catch (error) {
    console.error("Update package error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}