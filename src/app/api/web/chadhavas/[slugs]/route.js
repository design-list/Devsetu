import { NextResponse } from "next/server";
import models from "@/models";

const { chadhava, chadhavaBanner, chadhavaFaqs, chadhavaPackages, pujaPerformed, recommendedChadawa,templeHistory } = models;


export async function GET(req, { params }) {
    const { slugs } = params;
  try {

    const chadhavas = await chadhava.findOne({
        where: { slug: slugs }, 
        include: [chadhavaBanner, chadhavaFaqs, chadhavaPackages, pujaPerformed, recommendedChadawa, templeHistory ], order: [["id", "DESC"]],
    });
    if (!chadhavas) {
      return NextResponse.json({ error: "chadhavas not found" }, { status: 404 });
    }
    return NextResponse.json({ data: chadhavas, status: 200 });
  } catch (error) {
    console.error("GET by ID Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}