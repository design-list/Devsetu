

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { offerings } = models;


export async function GET() {
  try {
    const allOfferings = await offerings.findAll({
      attributes: ["id", "offerimg", "title", "type", "description", "price"],
    });

    return NextResponse.json({data: allOfferings,  status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();

    const newOfferings = await offerings.bulkCreate(
        body.offerings.map(o => ({
          type: o.type,
          title: o.title,
          description: o.description,
          offerimg: o.offerimg,
          price: o.price,
        }))
    );

    return NextResponse.json({ status: 200,message:"New Offering added.", data: newOfferings });
  } catch (error) {
    console.error("Error creating Offering:", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}


// PUT methode for update the Offerings

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, type, title, offerimg, price, description } = body;

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "Offring ID is required" },
        { status: 400 }
      );
    }

    const updetingoffer = await offerings.findByPk(id);
    if (!updetingoffer) {
      return NextResponse.json(
        { status: "error", message: "Offering not found" },
        { status: 404 }
      );
    }

    await updetingoffer.update({ type, title, offerimg, price, description });

    return NextResponse.json({ status: 200,message: "Offer updated", data: updetingoffer });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}