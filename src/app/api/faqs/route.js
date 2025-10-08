import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { Faqs } = models;


export async function GET() {
  try {
    const allFaqs = await Faqs.findAll();

    return NextResponse.json({data: allFaqs,  status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();

    const newFaqs = await Faqs.create({
        Faqs: body.faqs.map(f => ({
            type: f.type,
            question: f.title,
            answer: f.description,
        })),
      },
    );

    return NextResponse.json({ status: 200, data: newFaqs });
  } catch (error) {
    console.error("Error creating Faqs:", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}