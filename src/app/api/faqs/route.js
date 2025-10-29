

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

    const newFaqs = await Faqs.bulkCreate(
          body.faqs.map(f => ({
          type: f.type,
          question: f.title,
          answer: f.description,
      })),
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

// PUT methode for update the FAQs

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, type, question, answer } = body;

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "FAQ ID is required" },
        { status: 400 }
      );
    }

    const faq = await Faqs.findByPk(id);
    if (!faq) {
      return NextResponse.json(
        { status: "error", message: "FAQ not found" },
        { status: 404 }
      );
    }

    await faq.update({ type, question, answer });

    return NextResponse.json({ status: 200, data: faq });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}