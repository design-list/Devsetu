

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