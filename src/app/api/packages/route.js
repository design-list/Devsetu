

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { commonPujaPackage } = models;


export async function GET() {
  try {
    const allCommonPujaPackage = await commonPujaPackage.findAll();
    return NextResponse.json({data: allCommonPujaPackage,  status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();

    const newPujaPackage = await commonPujaPackage.bulkCreate(
        body.packages?.map(pkg => ({
            packImg: pkg.packImg,
            packageType: pkg.packageType,
            packageDescription: pkg.packageDescription,
            noOfPeople: parseFloat(pkg.noOfPeople),
            packagePrice: parseFloat(pkg.packagePrice),
        }))
    );

    return NextResponse.json({ status: 200, data: newPujaPackage });
  } catch (error) {
    console.error("Error creating package:", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    const body = await req.json();

    if (!body?.id) {
      return NextResponse.json(
        { status: "error", message: "Package ID is required" },
        { status: 400 }
      );
    }

    // Find existing record
    const existingPackage = await commonPujaPackage.findByPk(body.id);

    if (!existingPackage) {
      return NextResponse.json(
        { status: "error", message: "Package not found" },
        { status: 404 }
      );
    }

    // Update record
    await existingPackage.update({
      packImg: body.packImg,
      packageType: body.packageType,
      packageDescription: body.packageDescription,
      noOfPeople: parseFloat(body.noOfPeople),
      packagePrice: parseFloat(body.packagePrice),
    });

    return NextResponse.json({
      status: 200,
      message: "Package updated successfully",
      data: existingPackage,
    });

  } catch (error) {
    console.error("Update Error:", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}